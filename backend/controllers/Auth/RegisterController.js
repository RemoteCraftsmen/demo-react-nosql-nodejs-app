class RegisterController {
    constructor(userService, httpStatusCodes) {
        this.userService = userService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.userService.register(email, password);

        const registeredUser = await this.userService.findById(user.id);

        req.session.user = registeredUser;

        return res.send(registeredUser);
    }
}

module.exports = RegisterController;
