class RedisClientFactory {
    static create(redis, redisConfig) {
        const redisClient = redis.createClient(redisConfig);

        const id = Math.random().toString(36).substring(2);
        console.info(`Redis client instance created #ID ${id}`);

        return redisClient;
    }
}

module.exports = RedisClientFactory;
