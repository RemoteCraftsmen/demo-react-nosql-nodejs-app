const HTTP = require('http-status-codes');

function MustBeLoggedIn(request, response, next) {
    if (request.session && request.session.user) {
        return next();
    }

    return response.status(HTTP.UNAUTHORIZED).json({});
}

module.exports = MustBeLoggedIn;
