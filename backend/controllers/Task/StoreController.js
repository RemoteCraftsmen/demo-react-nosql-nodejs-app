class StoreController {
    constructor(taskService, httpStatusCodes) {
        this.taskService = taskService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res) {
        const { name } = req.body;

        const task = await this.taskService.create({
            name,
            userId: req.session.user._id,
            completed: false,
            createdAt: Date.now()
        });

        return res.status(this.httpStatusCodes.CREATED).send(task);
    }
}

module.exports = StoreController;
