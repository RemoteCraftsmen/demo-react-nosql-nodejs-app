class RegisterController {
    constructor(userService, httpStatusCodes) {
        this.userService = userService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password, password_confirmation } = req.body;

        if ((!email, !password || !password_confirmation || password !== password_confirmation)) {
            return res.sendStatus(this.httpStatusCodes.BAD_REQUEST);
        }

        const user = await this.userService.register(email, password);

        delete user.password;

        req.session.user = user;

        return res.status(this.httpStatusCodes.OK).json(user);
    }
}

module.exports = RegisterController;
