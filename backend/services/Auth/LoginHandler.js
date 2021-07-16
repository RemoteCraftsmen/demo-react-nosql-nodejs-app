class LoginHandler {
    constructor(userService, bcryptjs) {
        this.userService = userService;
        this.bcryptjs = bcryptjs;
    }

    async handle(email, password) {
        const user = await this.userService.findOne({ email });

        if (!user) {
            return null;
        }

        if (this.bcryptjs.compareSync(password, user.password)) {
            return this.userService.getById(user._id);
        }

        return null;
    }
}

module.exports = LoginHandler;
