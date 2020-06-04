var db = require('../config/db');

var Meme = {
    getMemes: function(callback)
    {
        return db.query('SELECT * FROM meme', callback);
    },
    createMeme: function (Meme, callback) {
        return db.query('INSERT INTO meme(name, image, link, tags) values(?, ?, ?, ?)',[Meme.name, Meme.image, Meme.link, Meme.tags], callback);
    }
}

module.exports = Meme;