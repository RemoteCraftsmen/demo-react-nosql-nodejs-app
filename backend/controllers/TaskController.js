const HTTP = require('http-status-codes');
const TaskService = require('../services/TaskService');

class TaskController {
    async index(request, response) {
        const tasks = await TaskService.findAll({ user_id: request.session.user.id });

        return response.status(HTTP.OK).json({ tasks });
    }

    async store(request, response) {
        const { name } = request.body;

        const task = await TaskService.create({
            name,
            user_id: request.session.user.id,
            created_at: Date.now()
        });

        return response.status(HTTP.CREATED).json(task);
    }

    async update(request, response) {
        const { name, completed } = request.body;
        const { id } = request.params;

        const task = await TaskService.findById(id);

        if (!task) {
            return response.sendStatus(404);
        }

        if (task.user_id !== request.session.user.id) {
            return response.sendStatus(HTTP.FORBIDDEN);
        }

        await TaskService.update({
            ...task,
            name,
            completed
        });

        return response.sendStatus(HTTP.OK);
    }

    async destroy(request, response) {
        const { id } = request.params;

        const task = await TaskService.findById(id);

        if (!task) {
            return response.sendStatus(404);
        }

        if (task.user_id !== request.session.user.id) {
            return response.sendStatus(HTTP.FORBIDDEN);
        }

        await TaskService.destroy(task._id, task._rev);

        return response.sendStatus(HTTP.OK);
    }
}

module.exports = TaskController;
