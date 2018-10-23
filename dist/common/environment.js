"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3001 },
    db: { url: process.env.DB_URL || 'mongodb://localhost/FV' },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'p4ss-w0rd-fv-secret',
        enableHTTPS: process.env.ENABLE_HTTPS || true,
        certificate: process.env.CERTI_FILE || './security/keys/cert.pem',
        key: process.env.KEY_FILE || './security/keys/key.pem'
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        name: 'fv-api-logger'
    }
};
