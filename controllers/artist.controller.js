const {artists} = require('../models/index');


const findAllArtists = () => {
    return artists.find({});
}

module.exports = {findAllArtists}