import 'dotenv/config';
import fs from 'node:fs/promises';
import express from 'express';
import path from 'node:path';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

console.log(isProduction);

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined;

// Create http server
const app = express();

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
        console.log(e.stack);
        res.status(500).end(e.stack);
    }
});

// Start http server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
