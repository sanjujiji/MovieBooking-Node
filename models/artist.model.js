const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artistid :{
        type : Number
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    wiki_url : {
        type : String
    },
    profile_url :{
        type : String
    },
    movies : [{
        type : String
    }]
});

module.exports = artistSchema;