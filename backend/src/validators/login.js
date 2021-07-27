const { body } = require('express-validator');
const params = {
    minPasswordLength: 6,
    maxPasswordLength: 32
};

module.exports = [
    body('email').trim().not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: params.minPasswordLength, max: params.maxPasswordLength })
        .withMessage(`Password length must be between ${params.minPasswordLength} and ${params.maxPasswordLength}`)
];
