var mysql = require('mysql');

var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'memed'
});

module.exports = connection;