const { StatusCodes } = require('http-status-codes');

class LoginController {
    constructor(userService) {
        this.userService = userService;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.userService.login(email, password);

        if (!user) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        req.session.user = user;

        return res.status(StatusCodes.OK).json(user);
    }
}

module.exports = LoginController;
