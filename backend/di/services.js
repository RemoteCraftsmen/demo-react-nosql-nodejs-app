const config = require('../config');

module.exports = {
    parameters: {
        config,
        'config.redisSession': config.redisSession
    },
    services: {
        userService: {
            class: 'services/UserService',
            arguments: ['%bcryptjs']
        },
        taskService: {
            class: 'services/TaskService',
            arguments: ['%bcryptjs']
        },
        loginHandler: {
            class: 'services/Auth/LoginHandler',
            arguments: ['@userService', '%bcryptjs']
        },
        registerHandler: {
            class: 'services/Auth/RegisterHandler',
            arguments: ['@userService', '%bcryptjs']
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
        }
    }
};
