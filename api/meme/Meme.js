var db = require('../db');

var Meme = {
    getMemes: function(callback)
    {
        return db.query('SELECT * FROM meme', callback);
    },
    createMeme: function (Meme, callback) {
        return db.query("INSERT INTO meme(name, image, link, tags, creation_date) values(?, ?, ?, ?, ?)",[Meme.name, Meme.image, Meme.link, Meme.tags, Meme.date], callback);
    }
}

module.exports = Meme;