const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const HTTP = require('http-status-codes');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('./config');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const redis = new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    pass: config.redis.pass,
    ttl: config.redis.ttl
});

redis.client.unref();

app.use(session({
    store: redis,
    secret: config.app.secret,
    resave: false,
    saveUninitialized: false
}));

const originsWhitelist = ['http://localhost:8000', config.app.frontendUrl];
const corsOptions = {
    origin(origin, callback) {
        if (originsWhitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
    if (err.message !== 'Not allowed by CORS') {
        return next();
    }

    return res.status(HTTP.OK).json({ code: 200, message: 'Request not allowed by CORS' });
});

require('./appRoutes')(app);

module.exports = app;
