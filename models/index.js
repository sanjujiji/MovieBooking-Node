const mongoose = require('mongoose');
const db = require('../config/db.config');
const artistModel = require('./artist.model');
const genreModel = require('./genre.model');
const movieModel = require('./movie.model');
const userModel = require('./user.model');

var artists = mongoose.model("artists",artistModel);
var genres = mongoose.model("genres",genreModel);
var movies = mongoose.model("movies",movieModel);
var users = mongoose.model("users",userModel);

module.exports = {db,mongoose,artists,genres,movies,users};
