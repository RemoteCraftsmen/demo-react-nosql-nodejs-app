class LoginController {
    constructor(loginHandler, httpStatusCodes) {
        this.loginHandler = loginHandler;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.loginHandler.handle(email, password);

        delete user?.password;

        if (!user) {
            return res.sendStatus(this.httpStatusCodes.UNAUTHORIZED);
        }

        req.session.user = user;

        return res.send(user);
    }
}

module.exports = LoginController;
