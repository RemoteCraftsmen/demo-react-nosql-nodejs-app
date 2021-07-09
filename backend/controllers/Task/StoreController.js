const { StatusCodes } = require('http-status-codes');

class StoreController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    async invoke(req, res) {
        const { name } = req.body;

        const task = await this.taskService.create({
            name,
            user_id: req.session.user.id,
            created_at: Date.now()
        });

        return res.status(StatusCodes.CREATED).json(task);
    }
}

module.exports = StoreController;
