const HTTP = require('http-status-codes');

function mustBeLoggedIn(request, response, next) {
    if (request?.session?.user) {
        return next();
    }

    return response.sendStatus(HTTP.UNAUTHORIZED);
}

module.exports = mustBeLoggedIn;
