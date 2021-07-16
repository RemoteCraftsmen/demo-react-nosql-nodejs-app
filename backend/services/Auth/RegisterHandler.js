class RegisterHandler {
    constructor(userRepository, bcryptjs) {
        this.userRepository = userRepository;
        this.bcryptjs = bcryptjs;
    }

    async handle(email, password) {
        const salt = this.bcryptjs.genSaltSync(10);
        const encryptedPassword = this.bcryptjs.hashSync(password, salt);

        return this.userRepository.create({
            email,
            password: encryptedPassword,
            createdAt: Date.now()
        });
    }
}

module.exports = RegisterHandler;
