const app = require('../index');

const config = require('../config');

app.listen(config.app.port, () => {
    console.log(`APP is listening on port: ${config.app.port}`);
});
