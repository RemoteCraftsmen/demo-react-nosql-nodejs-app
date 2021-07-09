const { StatusCodes } = require('http-status-codes');

class RegisterController {
    constructor(userService) {
        this.userService = userService;
    }

    async invoke(req, res) {
        const { email, password, password_confirmation } = req.body;

        if ((!email, !password || !password_confirmation || password !== password_confirmation)) {
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        const user = await this.userService.register(email, password);

        delete user.password;

        req.session.user = user;

        return res.status(StatusCodes.OK).json(user);
    }
}

module.exports = RegisterController;
