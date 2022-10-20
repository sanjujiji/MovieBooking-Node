const mongoose = require('mongoose');
const artistSchema = require('./artist.model');

const moviesSchema = mongoose.Schema({
    movieid : {
        type : Number
    },
    title : {
        type : String
    },
    published :{
        type : Boolean
    },
    released :{
        type : Boolean
    },
    poster_url:{
        type : String
    },
    release_date : {
        type : Date
    },
    publish_date : {
        type : Date
    },
    artists : [{
        type : artistSchema
    }],
    genres : [{
        type : String
    }],
    duration : {
        type : Number
    },
    critic_rating :{
        type : Number
    },
    trailer_url : {
        type : String
    },
    wiki_url : {
        type : String
    },
    story_line : {
        type : String
    },
    shows : [{
        id : {
            type : Number
        },
        theatre : {
            name : {
                type : String
            },
            city : {
                type : String
            }
        },
        language : {
            type : String
        },
        show_timing : {
            type : Date
        },
        available_seats :{
            type : Number
        },
        unit_price : {
            type : Number
        }
    }]
});

module.exports = moviesSchema;