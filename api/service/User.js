var db = require('../config/db');

var User = {
    getUsers: function (callback) {
        return db.query('SELECT * FROM user', callback);
    },
    getUser: function (username, callback) {
        return db.query(`SELECT * FROM user WHERE username='${username}'`, callback);
    },
    getUserById: function (id, callback) {
        return db.query(`SELECT * FROM user WHERE id='${id}'`, callback);
    },
    getUserByEmail: function (email, callback) {
        return db.query(`SELECT * FROM user WHERE email='${email}'`, callback);
    },
    createUser: function (User, callback) {
        return db.query('INSERT INTO user(username, password, email, avatar_url) values(?, ?, ?, ?)', [User.username, User.password, User.email, User.avatar_url], callback);
    },
    getRoleById: function (idRole, callback) {
        return db.query(`SELECT * FROM role WHERE id='${idRole}'`, callback);
    }
    
}

module.exports = User;