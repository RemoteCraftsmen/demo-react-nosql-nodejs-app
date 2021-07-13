class IndexController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        console.log(req.session.user.id);

        const tasks = await this.taskService.findAll({ user_id: req.session.user.id });

        return res.send({ tasks });
    }
}

module.exports = IndexController;
