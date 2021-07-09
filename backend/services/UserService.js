const BaseModelService = require('./baseModelService');

class UserService extends BaseModelService {
    constructor(bcryptjs) {
        super();
        this.bcryptjs = bcryptjs;
    }

    static get table() {
        return 'users';
    }

    static register(email, password) {
        const salt = this.bcryptjs.genSaltSync(10);
        const encryptedPassword = this.bcryptjs.hashSync(password, salt);

        return this.create({
            email,
            password: encryptedPassword,
            created_at: Date.now()
        });
    }

    static async login(email, password) {
        const user = await this.findOne(
            {
                email
            },
            { sort: [{ created_at: 'desc' }] }
        );

        if (!user) {
            return null;
        }

        if (this.bcryptjs.compareSync(password, user.password)) {
            delete user.password;

            return user;
        }

        return null;
    }
}

module.exports = UserService;
