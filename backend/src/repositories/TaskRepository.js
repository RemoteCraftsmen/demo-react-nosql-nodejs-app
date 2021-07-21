const AbstractRepository = require('./AbstractRepository');

class TaskRepository extends AbstractRepository {
    get table() {
        return 'tasks';
    }
}

module.exports = TaskRepository;
