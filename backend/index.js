const path = require('path');
const express = require('express');
const helmet = require('helmet');
const errorHandler = require('./src/plugins/errorHandler');
const di = require('./src/di');
const router = require('./src/routes')(di);

const app = express();

app.set('di', di);

app.use(helmet());
app.use(errorHandler);

require('./src/plugins/cors')(app);
require('./src/plugins/session')(app);
require('./src/plugins/bodyParser')(app);

app.use('/api', router);

app.use('/doc', express.static(path.join(__dirname, './src/public/swagger')));

module.exports = app;
