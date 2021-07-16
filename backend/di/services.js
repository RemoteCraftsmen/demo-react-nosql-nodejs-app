const config = require('../config');

module.exports = {
    parameters: {
        config,
        'config.redisSession': config.redisSession,
        'config.db': config.db
    },
    services: {
        loginHandler: {
            class: 'services/Auth/LoginHandler',
            arguments: ['@repositories.user', '%bcryptjs']
        },
        registerHandler: {
            class: 'services/Auth/RegisterHandler',
            arguments: ['@repositories.user', '%bcryptjs']
        },
        redisSessionClient: {
            arguments: ['%redis', '%config.redisSession%'],
            factory: {
                class: 'services/RedisClientFactory',
                method: 'create'
            }
        },
        redisSession: {
            arguments: ['@redisSessionClient'],
            factory: {
                class: 'services/RedisStoreFactory',
                method: 'create'
            }
        },
        couchDB: {
            arguments: ['%node-couchdb', '%config.db%'],
            factory: {
                class: 'services/CouchDBFactory',
                method: 'create'
            }
        }
    }
};
