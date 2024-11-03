import 'dotenv/config';
import crypto from 'crypto';

let tokenStore = new Map();

export function generateToken(req) {
    const nonce = crypto.randomBytes(16).toString('hex');
    const clientInfo = `${req.ip}-${req.get('User-Agent')}`;
    const data = `${nonce}-${clientInfo}`;
    const token = crypto
        .createHmac('sha256', process.env.VITE_JWT_SECRET)
        .update(data)
        .digest('hex');

    // Store the token with an expiry
    tokenStore.set(token, { used: false, expiry: Date.now() + 5 * 60 * 1000, clientInfo });
    return { token };
}

export function verifyToken(req, res, next) {
    const token = req.headers['x-custom-token'];
    const clientInfo = `${req.ip}-${req.get('User-Agent')}`;
    const tokenData = tokenStore.get(token);

    if (
        !tokenData ||
        tokenData.used ||
        tokenData.expiry < Date.now() ||
        tokenData.clientInfo !== clientInfo
    ) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Mark the token as used to prevent reuse

    tokenData.used = true;
    tokenStore.delete(token);
    next();
}
