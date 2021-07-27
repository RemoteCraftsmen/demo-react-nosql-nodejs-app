class IndexController {
    constructor(taskRepository, httpStatusCodes) {
        this.taskRepository = taskRepository;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const tasks = await this.taskRepository.findAll({ userId: req.session.user._id });

        return res.send(tasks);
    }
}

module.exports = IndexController;
