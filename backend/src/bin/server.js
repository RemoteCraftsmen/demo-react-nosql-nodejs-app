const app = require('../../index');

const config = require('../config');

process.on('SIGINT', status => shutdown(status));
process.on('SIGTERM', status => shutdown(status));
process.on('exit', status => shutdown(status));

app.listen(config.app.port, () => {
    console.info(`APP is listening on port: ${config.app.port}`);
});

async function shutdown(status = 0) {
    const di = app.get('di');

    try {
        console.info('Shutting down session redis connection ...');
        const redisSessionClient = await di.get('redisSessionClient');
        await redisSessionClient.quit();
    } catch (e) {
        console.error('There was an error during shutting down redis connection!');
    }

    process.exit(status);
}
