module.exports = {
    services: {
        'controllers.task.indexController': {
            class: 'controllers/Task/IndexController',
            arguments: ['@taskService', '%http-status-codes']
        },
        'controllers.task.storeController': {
            class: 'controllers/Task/StoreController',
            arguments: ['@taskService', '%http-status-codes']
        },
        'controllers.task.updateController': {
            class: 'controllers/Task/UpdateController',
            arguments: ['@taskService', '%http-status-codes']
        },
        'controllers.task.destroyController': {
            class: 'controllers/Task/DestroyController',
            arguments: ['@taskService', '%http-status-codes']
        }
    }
};
