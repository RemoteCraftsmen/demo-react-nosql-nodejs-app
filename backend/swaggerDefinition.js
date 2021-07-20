const {
    app: { host }
} = require('./config');

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'NOSQL-NODEJS API',
        version: '1.0.0',
        description:
            'API documentation for DEMO-NOSQL-NODEJS App \n\n First make request to /auth/token in order to get a valid CSRF Token from the server'
    },
    servers: [
        {
            url: `${host}/api`
        }
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'SessionID'
            }
        }
    }
};
