const express = require('express');
const router = express.Router();

const {findAllArtists} = require('../controllers/artist.controller');

router.get('/artists',(request,response) => {
    findAllArtists()
    .then((document) => {
        if (document.length !== 0){
            response.status(200).send(document);
            response.end();
            }
            else {
                response.status(400).send("Artists Not Found");
                response.end(); 
            }
    })
    .catch((err) => {
        response.status(400).send("Artists Not Found");
        response.end();
    })
})

module.exports = router;