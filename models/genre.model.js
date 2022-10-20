const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    genreid : {
        type : Number
    },
    genre : {
        type : String
    }
});

module.exports = genreSchema;