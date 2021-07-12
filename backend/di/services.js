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
