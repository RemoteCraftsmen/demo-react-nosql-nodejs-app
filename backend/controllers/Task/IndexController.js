const { StatusCodes } = require('http-status-codes');

class IndexController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async invoke(req, res) {
        const tasks = await this.taskService.findAll({ user_id: request.session.user.id });

        return res.status(StatusCodes.OK).json({ tasks });
    }
}

module.exports = IndexController;
