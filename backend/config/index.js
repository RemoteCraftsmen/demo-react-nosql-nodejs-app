require('dotenv').config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === 'true';

const config = {
    app: {
        env: env('NODE_ENV'),
        port: parseInt(env('PORT', 3000)),
        host: env('APP_HOST', '127.0.0.1'),
        secret: env('APP_SECRET'),
        frontendUrl: env('APP_FRONTEND_URL')
    },
    db: {
        host: env('COUCHDB_HOST'),
        protocol: env('COUCHDB_PROTOCOL'),
        port: env('COUCHDB_PORT'),
        auth: {
            user: env('COUCHDB_AUTH_USER'),
            pass: env('COUCHDB_AUTH_PASS')
        }
    },
    redis: {
        host: env('REDIS_HOST'),
        port: env('REDIS_PORT'),
        pass: env('REDIS_PASS'),
        ttl: env('REDIS_TTL')
    }
};

module.exports = config;
