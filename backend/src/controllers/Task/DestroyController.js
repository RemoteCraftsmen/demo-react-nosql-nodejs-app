class DestroyController {
    constructor(taskRepository, httpStatusCodes) {
        this.taskRepository = taskRepository;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { id } = req.params;

        const task = await this.taskRepository.findById(id);

        if (!task) {
            return res.sendStatus(this.httpStatusCodes.NO_CONTENT);
        }

        if (task.userId !== req.session.user._id) {
            return res.sendStatus(this.httpStatusCodes.FORBIDDEN);
        }

        await this.taskRepository.destroy(task._id, task._rev);

        return res.sendStatus(this.httpStatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
