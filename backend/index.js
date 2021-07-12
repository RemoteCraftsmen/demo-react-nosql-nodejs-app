const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const HTTP = require('http-status-codes');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const errorHandler = require('./plugins/errorHandler');
const di = require('./di');
const router = require('./routes')(di);

const config = require('./config');

const app = express();

app.set('di', di);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);

const redis = new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    pass: config.redis.pass,
    ttl: config.redis.ttl
});

redis.client.unref();

const originsWhitelist = ['http://localhost:8000', config.app.frontendUrl];
const corsOptions = {
    origin(origin, callback) {
        if (originsWhitelist.includes(origin) || origin.includes('//localhost:') || !origin) {
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

app.use(
    session({
        store: redis,
        secret: config.app.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false
        }
    })
);

app.use('/api', router);

module.exports = app;
