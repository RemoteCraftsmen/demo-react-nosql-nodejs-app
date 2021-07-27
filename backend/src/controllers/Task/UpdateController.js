class UpdateController {
    constructor(taskRepository, httpStatusCodes) {
        this.taskRepository = taskRepository;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { name, completed } = req.body;
        const { id } = req.params;

        const task = await this.taskRepository.findById(id);

        if (!task) {
            return res.sendStatus(this.httpStatusCodes.NOT_FOUND);
        }

        if (task.userId !== req.session.user._id) {
            return res.sendStatus(this.httpStatusCodes.FORBIDDEN);
        }

        await this.taskRepository.update({
            ...task,
            name,
            completed
        });

        const updatedTask = await this.taskRepository.findById(id);

        return res.send(updatedTask);
    }
}

module.exports = UpdateController;
