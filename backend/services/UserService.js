const bcrypt = require('bcryptjs');
const BaseModelService = require('./baseModelService');

class UserService extends BaseModelService {
    static get table() {
        return 'users';
    }

    static register(email, password) {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        return this.create({
            email,
            password: encryptedPassword,
            created_at: Date.now(),
        });
    }

    static async login(email, password) {
        const user = await this.findOne({
            email,
        });

        if (!user) {
            return null;
        }

        if(bcrypt.compareSync(password, user.password)){
            delete user.password;
            return user;
        }

        return null
    }
}

module.exports = UserService;
