class CouchDBFactory {
    static create(NodeCouchDB, dbConfig) {
        const couchDB = new NodeCouchDB(dbConfig);

        const id = Math.random().toString(36).substring(2);
        console.info(`CouchDB instance created #ID ${id}`);

        return couchDB;
    }
}

module.exports = CouchDBFactory;
