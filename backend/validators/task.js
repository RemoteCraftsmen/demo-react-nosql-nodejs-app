const { body, param } = require('express-validator');

const store = [body('name').trim().notEmpty().withMessage('Task name is required')];
const update = [
    ...store,
    ...destroy,
    body('completed').trim().notEmpty().withMessage('Task completed flag is required')
];
const destroy = [param('id').trim().notEmpty().withMessage('Task id is required')];

module.exports = { store, update, destroy };
