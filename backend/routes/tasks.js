const express = require('express');

const taskValidator = require('../validators/task');
const validate = require('../middleware/validate');

const router = express.Router();

const mustBeLoggedIn = require('../middleware/mustBeLoggedIn');

module.exports = di => {
    const indexController = di.get('controllers.task.indexController');
    const storeController = di.get('controllers.task.storeController');
    const updateController = di.get('controllers.task.updateController');
    const destroyController = di.get('controllers.task.destroyController');

    router.get('/', [mustBeLoggedIn], (...args) => indexController.invoke(...args));
    router.post('/', [mustBeLoggedIn], [taskValidator.store, validate], (...args) => storeController.invoke(...args));
    router.put('/:id', [mustBeLoggedIn], [taskValidator.update, validate], (...args) =>
        updateController.invoke(...args)
    );
    router.delete('/:id', [mustBeLoggedIn], (...args) => destroyController.invoke(...args));

    return router;
};
