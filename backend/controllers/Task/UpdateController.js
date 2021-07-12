class UpdateController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { name, completed } = req.body;
        const { id } = req.params;

        const task = await this.taskService.findById(id);

        if (!task) {
            return res.sendStatus(this.httpStatusCodes.NOT_FOUND);
        }

        if (task.user_id !== req.session.user.id) {
            return res.sendStatus(this.httpStatusCodes.FORBIDDEN);
        }

        await this.taskService.update({
            ...task,
            name,
            completed
        });

        const updatedTask = await this.taskService.findById(task.id);

        return res.send(updatedTask);
    }
}

module.exports = UpdateController;
