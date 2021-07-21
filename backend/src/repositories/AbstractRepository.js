class AbstractRepository {
    constructor(couchDB) {
        this.couchDB = couchDB;
    }

    find(where, options = {}) {
        return typeof where === 'object' ? this.findOne(where, options) : this.findById(where, options);
    }

    async findById(id) {
        const { data } = await this.couchDB.get(this.table, id);

        return data;
    }

    async findOne(where, options = {}) {
        const [item] = await this.findAll(where, options);

        return item;
    }

    async findAll(where, options = {}) {
        const { data } = await this.couchDB.mango(this.table, { selector: { ...where }, ...options });

        return data?.docs;
    }

    async create(data) {
        const result = await this.couchDB.insert(this.table, data);
        const row = await this.findById(result.data.id);

        return row;
    }

    async update(data) {
        const { data: updatedData } = await this.couchDB.update(this.table, data);

        return updatedData;
    }

    async delete(id, revision) {
        const { data } = await this.couchDB.del(this.table, id, revision);

        return data;
    }

    destroy(id, revision) {
        return this.delete(id, revision);
    }
}

module.exports = AbstractRepository;
