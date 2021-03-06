const express = require('express');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const registerController = di.get('controllers.auth.registerController');
    const logoutController = di.get('controllers.auth.logoutController');

    router.post('/login', (...args) => loginController.invoke(...args));
    router.post('/register', (...args) => registerController.invoke(...args));
    router.post('/logout', (...args) => logoutController.invoke(...args));

    return router;
};
