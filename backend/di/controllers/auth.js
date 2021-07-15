module.exports = {
    services: {
        'controllers.auth.loginController': {
            class: 'controllers/Auth/LoginController',
            arguments: ['@loginHandler', '%http-status-codes']
        },
        'controllers.auth.logoutController': {
            class: 'controllers/Auth/LogoutController',
            arguments: ['%http-status-codes']
        },
        'controllers.auth.registerController': {
            class: 'controllers/Auth/RegisterController',
            arguments: ['@registerHandler', '@userService', '%http-status-codes']
        }
    }
};
