var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var MemeController = require('../controller/MemeController');
var UserController = require('../controller/UserController');
var AuthController = require('../controller/AuthController');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/meme', MemeController);
app.use('/api/user', UserController);
app.use('/api/auth', AuthController);

module.exports = app;