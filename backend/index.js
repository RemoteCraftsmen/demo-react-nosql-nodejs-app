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

require('./plugins/cors')(app);

const redis = new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    pass: config.redis.pass,
    ttl: config.redis.ttl
});

redis.client.unref();

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
