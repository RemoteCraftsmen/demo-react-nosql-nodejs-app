const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async invoke(req, res) {
        const { id } = req.params;

        const task = await this.taskService.findById(id);

        if (!task) {
            return res.sendStatus(404);
        }

        if (task.user_id !== req.session.user.id) {
            return res.sendStatus(StatusCodes.FORBIDDEN);
        }

        await this.taskService.destroy(task._id, task._rev);

        return res.sendStatus(StatusCodes.OK);
    }
}

module.exports = DestroyController;
