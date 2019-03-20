const Layer = require('express/lib/router/layer');
const HTTP = require('http-status-codes');

function wrapErrorMiddleware(fn) {
    return (err, req, res, next) => {
        const ret = fn.call(this, err, req, res, next);

        if (ret && ret.catch) {
            ret.catch((innerErr) => next(innerErr));
        }

        return ret;
    };
}

function wrap(fn) {
    return (req, res, next) => {
        const ret = fn.call(this, req, res, next);

        if (ret && ret.catch) {
            ret.catch((err) => {
                next(err);
            });
        }

        return ret;
    };
}

Object.defineProperty(Layer.prototype, 'handle', {
    enumerable: true,
    get() {
        return this.__handle;
    },
    set(fn) {
        // Bizarre, but Express checks for 4 args to detect error middleware: https://github.com/expressjs/express/blob/master/lib/router/layer.js
        if (fn.length === 4) {
            fn = wrapErrorMiddleware(fn);
        } else {
            fn = wrap(fn);
        }

        this.__handle = fn;
    },
});

/* eslint global-require: 0 */
const routes = {
    auth: require('./routes/auth'),
    task: require('./routes/task'),
};

module.exports = (app) => {
    app.use('/api', routes.auth);
    app.use('/api', routes.task);

    function errorHandler(error, request, response, next) {
        response.status(HTTP.INTERNAL_SERVER_ERROR).json({
            error: {
                message: error.message,
            },
        });

        return next(error);
    }

    app.use(errorHandler);
};
