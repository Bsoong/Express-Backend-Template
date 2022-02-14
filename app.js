const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const configAuth = require('./middleware/auth')
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
configAuth(app);
configRoutes(app);

module.exports = app;
