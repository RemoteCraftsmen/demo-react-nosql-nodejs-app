class LoginHandler {
    constructor(userRepository, bcryptjs) {
        this.userRepository = userRepository;
        this.bcryptjs = bcryptjs;
    }

    async handle(email, password) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        if (this.bcryptjs.compareSync(password, user.password)) {
            return this.userRepository.getById(user._id);
        }

        return null;
    }
}

module.exports = LoginHandler;
