const NodeCouchDb = require('node-couchdb');
const config = require('../config');
const couch = new NodeCouchDb({ ...config.db });

class BaseModelService {
    async find(where, options = {}) {
        return typeof where === 'object' ? this.findOne(where, options) : this.findById(where, options);
    }

    async findById(id) {
        const result = await couch.get(this.table, id);

        return result.data;
    }

    async findOne(where, options = {}) {
        const items = await this.findAll(where, options);

        return items[0];
    }

    async findAll(where, options = {}) {
        const result = await couch.mango(this.table, { selector: { ...where }, ...options });

        const items = result.data.docs.map(item => {
            item.id = item._id;

            delete item._id;

            return item;
        });

        return items;
    }

    async create(data) {
        const result = await couch.insert(this.table, data);
        const row = await this.findById(result.data.id);

        if (row.hasOwnProperty('_id')) {
            row.id = row._id;
        }

        return row;
    }

    async update(data) {
        const result = await couch.update(this.table, data);

        return result.data;
    }

    async delete(id, revision) {
        const { data } = await couch.del(this.table, id, revision);

        return data;
    }

    async destroy(id, revision) {
        return this.delete(id, revision);
    }
}

module.exports = BaseModelService;
