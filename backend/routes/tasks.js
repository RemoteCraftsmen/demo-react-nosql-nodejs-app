const express = require('express');

const taskValidator = require('../validators/task');
const validate = require('../middleware/validate');

const router = express.Router();

const MustBeLoggedIn = require('../middleware/MustBeLoggedIn');

module.exports = di => {
    const indexController = di.get('controllers.task.indexController');
    const storeController = di.get('controllers.task.storeController');
    const updateController = di.get('controllers.task.updateController');
    const destroyController = di.get('controllers.task.destroyController');

    router.get('/', [MustBeLoggedIn], (...args) => indexController.invoke(...args));
    router.post('/', [MustBeLoggedIn], [taskValidator.store, validate], (...args) => storeController.invoke(...args));
    router.delete('/', [MustBeLoggedIn], [taskValidator.update, validate], (...args) =>
        updateController.invoke(...args)
    );
    router.patch('/', [MustBeLoggedIn], [taskValidator.destroy, validate], (...args) =>
        destroyController.invoke(...args)
    );

    return router;
};
