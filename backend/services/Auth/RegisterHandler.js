class RegisterHandler {
    constructor(userService, bcryptjs) {
        this.userService = userService;
        this.bcryptjs = bcryptjs;
    }

    async handle(email, password) {
        const salt = this.bcryptjs.genSaltSync(10);
        const encryptedPassword = this.bcryptjs.hashSync(password, salt);

        return this.userService.create({
            email,
            password: encryptedPassword,
            createdAt: Date.now()
        });
    }
}

module.exports = RegisterHandler;
