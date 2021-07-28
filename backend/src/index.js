const path = require('path');
const express = require('express');
const helmet = require('helmet');
const di = require('./di');
const router = require('./routes')(di);
const errorHandler = require('./plugins/errorHandler');

const app = express();

app.set('di', di);

app.use(helmet());

require('./plugins/cors')(app);
require('./plugins/session')(app);
require('./plugins/bodyParser')(app);

app.use('/api', router);

app.use('/doc', express.static(path.join(__dirname, './src/public/swagger')));

app.use(errorHandler);

module.exports = app;
