class LoginController {
    constructor(userService, httpStatusCodes) {
        this.userService = userService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.userService.login(email, password);

        if (!user) {
            return res.sendStatus(this.httpStatusCodes.UNAUTHORIZED);
        }

        delete user.password;

        req.session.user = user;

        return res.send(user);
    }
}

module.exports = LoginController;
