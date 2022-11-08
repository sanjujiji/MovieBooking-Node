const express = require('express');
const router = express.Router();

const {findAllGenres} = require('../controllers/genre.controller');

router.get('/genres',(request,response) => {
    findAllGenres()
    .then((document) => {
        if (document.length !== 0){
            const messageObj = {
                genres : document
            }
            return response.end(JSON.stringify(messageObj));
            }
            else {
                response.status(400).send("Genres Not Found");
                response.end(); 
            }
    })
    .catch((err) => {
        response.status(400).send("Genres Not Found");
        response.end();
    })
})

module.exports = router;