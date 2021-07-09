const config = require('../config');

module.exports = {
    parameters: {
        config
    },
    services: {
        sequelize: {
            arguments: ['%sequelize', '%config%'],
            factory: {
                class: 'services/SequelizeFactory',
                method: 'create'
            }
        },
        userService: {
            class: 'services/UserService',
            arguments: ['%bcryptjs']
        },
        taskService: {
            class: 'services/TaskService',
            arguments: ['%bcryptjs']
        }
    }
};
