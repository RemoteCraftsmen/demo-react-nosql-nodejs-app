module.exports = {
    services: {
        'controllers.auth.loginController': {
            class: 'controllers/Auth/LoginController',
            arguments: ['@userService', '%http-status-codes']
        },
        'controllers.auth.logoutController': {
            class: 'controllers/Auth/LogoutController',
            arguments: ['@userService', '%http-status-codes']
        },
        'controllers.auth.registerController': {
            class: 'controllers/Auth/RegisterController',
            arguments: ['@userService', '%http-status-codes']
        }
    }
};
