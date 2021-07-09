const { StatusCodes } = require('http-status-codes');

class RegisterController {
    constructor(userService) {
        this.userService = userService;
    }

    async invoke(req, res, next) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    next(err);
                }
            });
        }

        return res.sendStatus(StatusCodes.OK);
    }
}

module.exports = RegisterController;
