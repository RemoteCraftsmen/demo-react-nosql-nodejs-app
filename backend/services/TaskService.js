const BaseModelService = require('./baseModelService');

class TaskService extends BaseModelService {
    static get table() {
        return 'tasks';
    }
}

module.exports = TaskService;
