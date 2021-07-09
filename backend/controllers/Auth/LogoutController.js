class RegisterController {
    constructor(userService, httpStatusCodes) {
        this.userService = userService;
        this.httpStatusCodes = httpStatusCodes;
    }

    async invoke(req, res, next) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    next(err);
                }
            });
        }

        return res.sendStatus(this.httpStatusCodes.OK);
    }
}

module.exports = RegisterController;
