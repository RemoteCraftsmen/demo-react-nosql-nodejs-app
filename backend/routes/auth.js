const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/auth/login', new AuthController().login);
router.post('/auth/register', new AuthController().register);
router.get('/auth/logout', new AuthController().logout);

module.exports = router;
