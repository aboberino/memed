var db = require('../config/db');

var User = {
    getUsers: function(callback)
    {
        return db.query('SELECT * FROM user', callback);
    },
    getUser: function(username, callback)
    {
        return db.query(`SELECT * FROM user WHERE username='${username}'`, callback);
    },
    createUser: function (User, callback) {
        return db.query('INSERT INTO user(username, password, email, avatar_url) values(?, ?, ?, ?)',[User.name, User.link, User.email, User.avatar_url], callback);
    }
}

module.exports = User;