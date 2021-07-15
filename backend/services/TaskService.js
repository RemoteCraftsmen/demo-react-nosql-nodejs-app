const BaseModelService = require('./BaseModelService');

class TaskService extends BaseModelService {
    get table() {
        return 'tasks';
    }
}

module.exports = TaskService;
