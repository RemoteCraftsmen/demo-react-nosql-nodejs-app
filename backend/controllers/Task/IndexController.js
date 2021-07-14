class IndexController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const tasks = await this.taskService.findAll({ userId: req.session.user._id });

        return res.send(tasks);
    }
}

module.exports = IndexController;
