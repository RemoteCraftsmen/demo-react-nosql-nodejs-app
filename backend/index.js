const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const errorHandler = require('./plugins/errorHandler');
const di = require('./di');
const router = require('./routes')(di);

const app = express();

app.set('di', di);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);

require('./plugins/cors')(app);
require('./plugins/session')(app);

app.use('/api', router);

module.exports = app;
