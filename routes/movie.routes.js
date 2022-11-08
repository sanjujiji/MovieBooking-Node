const express = require('express');
const router = express.Router();

const  {findAllMovies,findAllMoviesbyStatus,findOne,findMoviesByDetails} =  require('../controllers/movie.controller');


//get the list of movies by id
router.get('/movies/:movieid',(request,response) =>{
    let movieIdReq = request.params.movieid;
    findOne(movieIdReq)
        .then((document) => {
            if (document.length !== 0){
                return response.status(200).send(document);
            }
            else {
                return response.status(400).send("Movie Not Found");
            }
        })
        .catch((err) => {
            response.status(400).send("Movie Not Found");
            response.end();
        })
})

//get the list of movies based on the movie status
router.get('/movies',(request,response,next)=>{
    const {status,title,genres,artists,start_date,end_date} = request.query;
    if ((status)&&(title === undefined && genres === undefined && artists === undefined && start_date === undefined && end_date === undefined)){
        findAllMoviesbyStatus(status)
        .then((document) => {
            const messageObj = {
                movies : document
            }
            return response.end(JSON.stringify(messageObj));
            // response.end();
        })
        .catch((err) => {
            return response.status(400).send("List of movies not found");
            // response.end();
        })
    }
//get the list of movies based on the different criteria
    else if ((status || title || genres || artists || start_date || end_date
        )){
        findMoviesByDetails(status,
            title,
            genres,
            artists,
            start_date,
            end_date
            )
        .then((document) => {
            const messageObj = {
                movies : document
            }
            return response.end(JSON.stringify(messageObj));
            // response.end();
        })
        .catch((err) => {
            return response.status(400);
            // response.end();
        })
    }
    else{
        findAllMovies()
        .then((document) => {
            response.status(200).send(document);
            response.end();
    })
        .catch((err) => {
            response.status(400).send("List of movies not found");
            response.end();
    })
    }
})

module.exports = router;