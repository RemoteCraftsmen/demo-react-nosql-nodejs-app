const express = require('express');

const loginValidator = require('../validators/login');
const registerValidator = require('../validators/register');
const validate = require('../middleware/validate');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const registerController = di.get('controllers.auth.registerController');
    const logoutController = di.get('controllers.auth.logoutController');

    router.get('/token', (req, res) => res.sendStatus(204));
    router.post('/login', [loginValidator, validate], (...args) => loginController.invoke(...args));
    router.post('/register', [registerValidator, validate], (...args) => registerController.invoke(...args));
    router.post('/logout', (...args) => logoutController.invoke(...args));

    return router;
};
