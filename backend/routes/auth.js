const express = require('express');

const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator');
const validate = require('../middleware/validate');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const registerController = di.get('controllers.auth.registerController');
    const logoutController = di.get('controllers.auth.logoutController');

    router.post('/login', [loginValidator, validate], (...args) => loginController.invoke(...args));
    router.post('/register', [registerValidator, validate], (...args) => registerController.invoke(...args));
    router.post('/logout', (...args) => logoutController.invoke(...args));

    return router;
};
