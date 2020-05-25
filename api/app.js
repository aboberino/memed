var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var MemeController = require('./meme/MemeController');
var UserController = require('./User/UserController');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/meme', MemeController);
app.use('/api/user', UserController);

module.exports = app;