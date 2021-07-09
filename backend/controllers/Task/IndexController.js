class IndexController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const tasks = await this.taskService.findAll({ user_id: request.session.user.id });

        return res.status(this.httpStatusCodes.OK).json({ tasks });
    }
}

module.exports = IndexController;
