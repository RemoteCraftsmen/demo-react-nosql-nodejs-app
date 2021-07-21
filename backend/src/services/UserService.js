const BaseModelService = require('./BaseModelService');

class UserService extends BaseModelService {
    get table() {
        return 'users';
    }

    async getById(id, excludePassword = true) {
        const { data } = await this.couch.get(this.table, id);

        if (excludePassword) {
            delete data?.password;
        }

        return result?.data;
    }
}

module.exports = UserService;
