const {
    app: { host }
} = require('./src/config');

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'NOSQL-NODEJS API',
        version: '1.0.0',
        description:
            'API documentation for DEMO-NOSQL-NODEJS App \n\n Get sessionID from cookies by logging into app to make authorized requests'
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
