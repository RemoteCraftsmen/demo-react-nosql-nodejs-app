const session = require('express-session');
const RedisStore = require('connect-redis')(session);

class RedisStoreFactory {
    static create(redisClient) {
        const id = Math.random().toString(36).substring(2);
        console.info(`Redis store instance created #ID ${id}`);

        return new RedisStore({ client: redisClient });
    }
}

module.exports = RedisStoreFactory;
