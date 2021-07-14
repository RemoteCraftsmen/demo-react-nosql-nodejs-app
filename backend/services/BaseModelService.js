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
        const result = await this.couch.get(this.table, id);

        return result.data;
    }

    async findOne(where, options = {}) {
        const items = await this.findAll(where, options);

        return items[0];
    }

    async findAll(where, options = {}) {
        const result = await this.couch.mango(this.table, { selector: { ...where }, ...options });

        const items = result.data.docs.map(item => {
            item.id = item._id;

            delete item._id;

            return item;
        });

        return items;
    }

    async create(data) {
        const result = await this.couch.insert(this.table, data);
        const row = await this.findById(result.data.id);

        if (row.hasOwnProperty('_id')) {
            row.id = row._id;
        }

        return row;
    }

    async update(data) {
        const result = await this.couch.update(this.table, data);

        return result.data;
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
