const {
    db: {
        protocol,
        host,
        port,
        auth: { user, pass }
    }
} = require('../config');

const url = `${protocol}://${user}:${pass}@${host}:${port}`;
const nano = require('nano')(url);

(async () => {
    const databases = {
        users: {
            indexes: [
                {
                    index: { fields: ['createdAt'] },
                    name: 'created-at-index'
                }
            ]
        },
        tasks: {
            indexes: [
                {
                    index: { fields: ['userId'] },
                    name: 'user-id-index'
                }
            ]
        }
    };

    for (const database of Object.keys(databases)) {
        const dbItem = databases[database];

        try {
            await nano.db.create(database);

            if (dbItem.hasOwnProperty('indexes')) {
                const db = nano.use(database);

                for (const index of dbItem.indexes) {
                    try {
                        await db.createIndex(index);

                        console.info(`Index: ${index.name} created for ${database}`);
                    } catch (error) {
                        console.error(`Could not created index: ${index.name} for ${database}`, error);
                    }
                }
            }

            console.info(`Database: ${database} has been created`);
        } catch (error) {
            console.error(`Could not create ${database} database`, error);
        }
    }
})();
