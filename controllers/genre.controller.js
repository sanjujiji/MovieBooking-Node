const {genres} = require('../models/index');

const findAllGenres = () => {
    return genres.find({});
}

module.exports = {findAllGenres}