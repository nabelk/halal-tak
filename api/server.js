import 'dotenv/config';
import fs from 'node:fs/promises';
import express from 'express';
import path from 'node:path';
import axios from 'axios';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { generateToken, verifyToken } from '../src/utils/token.js';
import { fileURLToPath } from 'url';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined;

// Create http server
const app = express();
const rateLimitConfig = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { keyGeneratorIpFallback: false },
    keyGenerator: (req) => {
        const cfIp = req.headers['cf-connecting-ip'];
        if (typeof cfIp === 'string') {
            console.log(`[Rate Limit] CF-IP: ${cfIp}`);
            return cfIp;
        }

        const xForwardedFor = req.headers['x-forwarded-for'];
        if (typeof xForwardedFor === 'string') {
            const ip = xForwardedFor.split(',')[0].trim();
            console.log(`[Rate Limit] X-Forwarded-For: ${ip}`);
            return ip;
        }
        if (Array.isArray(xForwardedFor) && xForwardedFor[0]) {
            const ip = xForwardedFor[0].split(',')[0].trim();
            console.log(`[Rate Limit] X-Forwarded-For (array): ${ip}`);
            return ip;
        }

        const fallbackIp = ipKeyGenerator(req.ip || 'unknown');
        console.log(`[Rate Limit] Fallback IP: ${fallbackIp}`);
        return fallbackIp;
    },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

const headersStaticConfig = {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    },
};

app.use('/assets', express.static(path.join(__dirname, '../dist/assets'), headersStaticConfig));
app.use('/dist', express.static(path.join(__dirname, '../dist'), headersStaticConfig));

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base,
    });
    app.use(vite.middlewares);
} else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
}

const isAuthorizedAccess = (req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigins = [process.env.CLIENT_URL];

    // Check for actual requests (not OPTIONS)
    if (req.method !== 'OPTIONS' && req.headers['sec-fetch-mode'] !== 'cors') {
        if (!origin || !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
            return res.status(403).json({ error: 'Unauthorized access. No direct call allowed' });
        }
    }

    next();
};

// Route to generate token for fetch api
app.get('/api/token', isAuthorizedAccess, rateLimitConfig, (req, res) => {
    const token = generateToken(req);
    res.json(token);
});

// Api route for getting data
app.get(
    '/api/data/:location',
    isAuthorizedAccess,
    verifyToken,
    rateLimitConfig,
    async (req, res) => {
        const { location } = req.params;

        const fetchData = async (url, delay = 1000, count = 1) => {
            try {
                const response = await axios(url);
                return response.data.values;
            } catch (err) {
                if (count === 5) throw err;
                console.log('Fetch failed, retrying...');
                await new Promise((res) => setTimeout(res, delay));
                return fetchData(url, delay, count + 1);
            }
        };

        try {
            const data = await fetchData(
                `${process.env.URL}${location}?key=${process.env.SECRET_KEY}`,
            );
            res.json(data);
        } catch {
            res.status(500).json({ error: 'Error fetching data' });
        }
    },
);

// Serve HTML
app.use('*', async (req, res) => {
    let template, render;
    try {
        if (req.originalUrl === '/favicon.ico') {
            return res.sendFile(path.resolve('./public/favicon.svg'));
        }

        if (!isProduction) {
            template = await fs.readFile('./index.html', 'utf-8');
            template = await vite.transformIndexHtml(req.originalUrl, template);
            render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
        } else {
            template = templateHtml;
            render = (await import('../dist/server/entry-server.js')).render;
        }
        const rendered = await render({ path: req.originalUrl }, ssrManifest);
        const html = template.replace(`<!--app-outlet-->`, rendered ?? '');

        res.status(200).setHeader('Content-Type', 'text/html').end(html);
    } catch (e) {
        vite?.ssrFixStacktrace(e);
        res.status(500).end(e.stack);
    }
});

// Start http server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at port ${port}`);
});
