const NodeCouchDb = require('node-couchdb');
const config = require('../config');

class BaseModelService {
    constructor() {
        this.couch = new NodeCouchDb({ ...config.db });
    }

    async find(where, options = {}) {
        return typeof where === 'object' ? this.findOne(where, options) : this.findById(where, options);
    }

    async findById(id) {
        const { data } = await this.couch.get(this.table, id);

        return data;
    }

    async findOne(where, options = {}) {
        const items = await this.findAll(where, options);

        return items[0];
    }

    async findAll(where, options = {}) {
        const { data } = await this.couch.mango(this.table, { selector: { ...where }, ...options });

        return data?.docs;
    }

    async create(data) {
        const result = await this.couch.insert(this.table, data);
        const row = await this.findById(result.data.id);

        return row;
    }

    async update(data) {
        const { data: updatedData } = await this.couch.update(this.table, data);

        return updatedData;
    }

    async delete(id, revision) {
        const { data } = await this.couch.del(this.table, id, revision);

        return data;
    }

    async destroy(id, revision) {
        return this.delete(id, revision);
    }
}

module.exports = BaseModelService;
