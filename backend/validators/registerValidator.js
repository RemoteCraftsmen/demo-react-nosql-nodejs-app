const { body } = require('express-validator');
const params = {
    minPasswordLength: 6,
    maxPasswordLength: 32
};

module.exports = [
    body('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .bail()
        .custom(async (email, { req }) => {
            const di = req.app.get('di');

            const userService = di.get('userService');

            const user = await userService.findOne({ email });

            if (user) {
                throw new Error('Email taken');
            }

            return true;
        }),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: params.minPasswordLength, max: params.maxPasswordLength })
        .withMessage(`Password length must be between ${params.minPasswordLength} and ${params.maxPasswordLength}`),

    body('passwordConfirmation')
        .trim()
        .notEmpty()
        .withMessage('Password confirmation is required')
        .isLength({ min: params.minPasswordLength, max: params.maxPasswordLength })
        .withMessage(
            `Password confirmation length must be between ${params.minPasswordLength} and ${params.maxPasswordLength}`
        )
        .bail()
        .custom((passwordConfirmation, { req }) => {
            const { password } = req.body;

            if (password !== passwordConfirmation) {
                throw new Error('Passwords are not equal');
            }

            return true;
        })
];
