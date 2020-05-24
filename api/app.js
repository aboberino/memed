var express = require('express');
var app = express();

var MemeController = require('./meme/MemeController');
var UserController = require('./User/UserController');

app.use('/api/meme', MemeController);
app.use('/api/user', UserController);

module.exports = app;