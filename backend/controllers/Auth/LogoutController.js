class LogoutController {
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

        return res.sendStatus(this.httpStatusCodes.NO_CONTENT);
    }
}

module.exports = LogoutController;
