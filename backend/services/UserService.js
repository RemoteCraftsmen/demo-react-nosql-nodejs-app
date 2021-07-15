const BaseModelService = require('./BaseModelService');

class UserService extends BaseModelService {
    constructor(bcryptjs) {
        super();
        this.bcryptjs = bcryptjs;
    }

    get table() {
        return 'users';
    }

    register(email, password) {
        const salt = this.bcryptjs.genSaltSync(10);
        const encryptedPassword = this.bcryptjs.hashSync(password, salt);

        return this.create({
            email,
            password: encryptedPassword,
            createdAt: Date.now()
        });
    }

    async login(email, password) {
        const user = await this.findOne({ email });

        if (!user) {
            return null;
        }

        if (this.bcryptjs.compareSync(password, user.password)) {
            return this.getById(user.id);
        }

        return null;
    }

    async getById(id, excludePassword = true) {
        const result = await this.couch.get(this.table, id);

        if (excludePassword) {
            delete result?.data?.password;
        }

        return result.data;
    }
}

module.exports = UserService;
