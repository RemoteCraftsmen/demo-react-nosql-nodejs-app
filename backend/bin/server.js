const app = require('../index');

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
        console.info('Shutting down sequelize connection ...');
        const { sequelize } = await di.get('sequelize');
        await sequelize.close();
    } catch (e) {
        console.error('There was an error during shutting down sequelize connection!');
    }

    process.exit(status);
}
