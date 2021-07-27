const path = require('path');
const express = require('express');
const helmet = require('helmet');
const errorHandler = require('./plugins/errorHandler');
const di = require('./di');
const router = require('./routes')(di);

const app = express();

app.set('di', di);

app.use(helmet());
app.use(errorHandler);

require('./plugins/cors')(app);
require('./plugins/session')(app);
require('./plugins/bodyParser')(app);

app.use('/api', router);

app.use('/doc', express.static(path.join(__dirname, './src/public/swagger')));

module.exports = app;
