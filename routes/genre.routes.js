const express = require('express');
const router = express.Router();

const {findAllGenres} = require('../controllers/genre.controller');

router.get('/genres',(request,response) => {
    findAllGenres()
    .then((document) => {
        if (document.length !== 0){
            response.status(200).send(document);
            response.end();
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