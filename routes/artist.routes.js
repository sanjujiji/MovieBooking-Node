const express = require('express');
const router = express.Router();

const {findAllArtists} = require('../controllers/artist.controller');

router.get('/artists',(request,response) => {
    findAllArtists()
    .then((document) => {
        if (document.length !== 0){
            const messageObj = {
                artists : document
            }
            return response.end(JSON.stringify(messageObj));
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