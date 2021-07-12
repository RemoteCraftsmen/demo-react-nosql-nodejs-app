const config = require('../config');

module.exports = {
    parameters: {
        config
    },
    services: {
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
