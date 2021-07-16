const AbstractRepository = require('./AbstractRepository');

class UserRepository extends AbstractRepository {
    get table() {
        return 'users';
    }

    async getById(id, excludePassword = true) {
        const { data } = await this.couchDB.get(this.table, id);

        if (excludePassword) {
            delete data?.password;
        }

        return data;
    }

    findByEmail(email) {
        return this.findOne({ email });
    }
}

module.exports = UserRepository;
