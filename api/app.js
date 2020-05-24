var express = require('express');
var app = express();

var MemeController = require('./meme/MemeController');
app.use('/api/meme', MemeController);

module.exports = app;