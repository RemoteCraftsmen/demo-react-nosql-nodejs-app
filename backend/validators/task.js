const { body } = require('express-validator');

const store = [body('name').trim().notEmpty().withMessage('Task name is required')];

const update = [...store, body('completed').notEmpty().withMessage('Task completed flag is required').isBoolean()];

module.exports = { store, update };
