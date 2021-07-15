class RegisterController {
    constructor(registerHandler, userService, httpStatusCodes) {
        this.registerHandler = registerHandler;
        this.userService = userService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.registerHandler.handle(email, password);

        const registeredUser = await this.userService.getById(user.id);

        req.session.user = registeredUser;

        return res.send(registeredUser);
    }
}

module.exports = RegisterController;
