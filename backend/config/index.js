require('dotenv').config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;

const config = {
    app: {
        env: env('NODE_ENV'),
        port: parseInt(env('PORT', 3000)),
        host: env('APP_HOST', '127.0.0.1'),
        secret: env('APP_SECRET'),
        frontendUrl: env('APP_FRONTEND_URL'),
        jsonRequestSizeLimit: env('APP_JSON_REQUEST_SIZE_LIMIT', '1mb'),
        corsSites: [{ url: env('APP_HOST') }]
    },
    db: {
        host: env('COUCHDB_HOST'),
        protocol: env('COUCHDB_PROTOCOL'),
        port: env('COUCHDB_PORT'),
        auth: {
            user: env('COUCHDB_USER'),
            pass: env('COUCHDB_PASSWORD')
        }
    },
    redisSession: {
        host: env('REDIS_HOST'),
        port: env('REDIS_PORT'),
        pass: env('REDIS_PASSWORD'),
        ttl: env('REDIS_TTL')
    }
};

module.exports = config;
