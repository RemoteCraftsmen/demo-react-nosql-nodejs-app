module.exports = {
    services: {
        'repositories.user': {
            class: 'repositories/UserRepository',
            arguments: ['@couchDB']
        },
        'repositories.task': {
            class: 'repositories/TaskRepository',
            arguments: ['@couchDB']
        }
    }
};
