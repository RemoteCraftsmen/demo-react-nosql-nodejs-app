const HTTP = require('http-status-codes');
const UserService = require('../services/UserService');

class AuthController {
    async register(request, response) {
        const { email, password, password_confirmation } = request.body;

        if ((!email, !password || !password_confirmation || password !== password_confirmation)) {
            return response.sendStatus(HTTP.BAD_REQUEST);
        }

        const user = await UserService.register(email, password);

        delete user.password;

        request.session.user = user;

        return response.status(HTTP.OK).json(user);
    }

    async login(request, response) {
        const { email, password } = request.body;

        const user = await UserService.login(email, password);

        if (!user) {
            return response.sendStatus(HTTP.UNAUTHORIZED);
        }

        request.session.user = {
            ...user,
            id: user._id,
        };

        return response.status(HTTP.OK).json(user);
    }

    async logout(request, response, next) {
        if (request.session) {
            request.session.destroy((err) => {
                if (err) {
                    next(err);
                }
            });
        }

        return response.sendStatus(HTTP.OK);
    }
}

module.exports = AuthController;
