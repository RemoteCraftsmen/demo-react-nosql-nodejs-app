class DestroyController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { id } = req.params;

        const task = await this.taskService.findById(id);

        if (!task) {
            return res.sendStatus(this.httpStatusCodes.NO_CONTENT);
        }

        if (task.user_id !== req.session.user.id) {
            return res.sendStatus(this.httpStatusCodes.FORBIDDEN);
        }

        await this.taskService.destroy(task._id, task._rev);

        return res.sendStatus(this.httpStatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
