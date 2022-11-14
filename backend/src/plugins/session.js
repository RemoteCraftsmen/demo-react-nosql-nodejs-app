const session = require('express-session');
const config = require('../config');

module.exports = app => {
    const di = app.get('di');

    const threeHoursInMs = 3600 * 1000 * 3;

    const sessionData = {
        name: 'SessionID',
        store: di.get('redisSession'),
        secret: config.app.secret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: threeHoursInMs
        }
    };

    if (config.app.env === 'production' && config.app.frontendUrl.startsWith('https')) {
        app.set('trust proxy', 1);
        sessionData.cookie.secure = true;
    }

    app.use(session(sessionData));
};
