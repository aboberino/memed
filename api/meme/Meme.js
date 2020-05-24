var db = require('../db');

var Meme = {
    getMemes: function(callback)
    {
        return db.query('SELECT * FROM meme', callback);
    },
    createMeme: function (Meme, callback) {
        return db.query('INSERT INTO meme(name, link, tags) values(?, ?, ?)',[Meme.name, Meme.link, Meme.tags], callback);
    }
}

module.exports = Meme;