const BaseModelService = require('./BaseModelService');

class UserService extends BaseModelService {
    get table() {
        return 'users';
    }

    async getById(id, excludePassword = true) {
        const result = await this.couch.get(this.table, id);

        if (excludePassword) {
            delete result?.data?.password;
        }

        return result?.data;
    }
}

module.exports = UserService;
