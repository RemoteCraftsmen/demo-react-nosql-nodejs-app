module.exports = {
    services: {
        'controllers.task.indexController': {
            class: 'controllers/Task/IndexController',
            arguments: ['@repositories.task', '%http-status-codes']
        },
        'controllers.task.storeController': {
            class: 'controllers/Task/StoreController',
            arguments: ['@repositories.task', '%http-status-codes']
        },
        'controllers.task.updateController': {
            class: 'controllers/Task/UpdateController',
            arguments: ['@repositories.task', '%http-status-codes']
        },
        'controllers.task.destroyController': {
            class: 'controllers/Task/DestroyController',
            arguments: ['@repositories.task', '%http-status-codes']
        }
    }
};
