class RegisterController {
    constructor(registerHandler, userRepository, httpStatusCodes) {
        this.registerHandler = registerHandler;
        this.userRepository = userRepository;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { email, password } = req.body;

        const user = await this.registerHandler.handle(email, password);

        const registeredUser = await this.userRepository.findById(user._id);

        delete registeredUser?.password;

        req.session.user = registeredUser;

        return res.send(registeredUser);
    }
}

module.exports = RegisterController;
