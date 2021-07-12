const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res) => {
    if (err.message === 'Not allowed by CORS') {
        return res.send({ message: 'Request not allowed by CORS' });
    }

    if (err.message === 'Validation failed') {
        const errors = err.array().map(e => {
            return { message: e.msg, param: e.param };
        });

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ errors });
    }

    console.error(err);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('We messed something up. Sorry!');
};
