var express = require('express');
var app = express();
var cors = require('cors');

var MemeController = require('./meme/MemeController');
var UserController = require('./User/UserController');

app.use(cors());
app.options('*', cors());

app.use('/api/meme', MemeController);
app.use('/api/user', UserController);

module.exports = app;