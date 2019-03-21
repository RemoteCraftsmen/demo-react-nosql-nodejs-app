const NodeCouchDb = require('node-couchdb');
const config = require('../config');
const couch = new NodeCouchDb({ ...config.db });

class BaseModelService {
    static async find(where, options = {}) {
        return typeof where === 'object' ? this.findOne(where, options) : this.findById(where, options);
    }

    static async findById(id) {
        const result = await couch.get(this.table, id);

        return result.data;
    }

    static async findOne(where, options = {}) {
        const items = await this.findAll(where, options);

        return items[0];
    }

    static async findAll(where, options = {}) {
        const result = await couch.mango(this.table, { selector: { ...where }, ...options});
        const items = result.data.docs.map((item) => {
            item.id = item._id;
            
            delete item._id;
            
            return item;
        });

        return items;
    }

    static async create(data) {
        const result = await couch.insert(this.table, data);
        const row = await this.findById(result.data.id);

        if (row.hasOwnProperty('_id')){
            row.id = row._id;
        }

        return row;
    }

    static async update(data) {
        const result = await couch.update(this.table, data);

        return result.data;
    }

    static async delete(id, revision) {
        const { data } = await couch.del(this.table, id, revision);

        return data;
    }

    static async destroy(id, revision) {
        return this.delete(id, revision);
    }
}

module.exports = BaseModelService;
