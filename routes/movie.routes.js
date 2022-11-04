const express = require('express');
const router = express.Router();

const  {findAllMovies,findAllMoviesbyStatus,findOne,findMoviesByDetails} =  require('../controllers/movie.controller');


//get the list of movies by id
router.get('/movies/:movieid',(request,response) =>{
    let movieIdReq = request.params.movieid;
    findOne(movieIdReq)
        .then((document) => {
            if (document.length !== 0){
            response.status(200).send(document);
            response.end();
            }
            else {
                response.status(400).send("Movie Not Found");
                response.end(); 
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
    console.log(status,title,genres,artists,start_date,end_date);
    
    if ((request.query.status)&&(title === undefined && genres === undefined && artists === undefined && start_date === undefined && end_date === undefined)){
        let statusRequired = request.query.status;
        findAllMoviesbyStatus(statusRequired)
        .then((document) => {
            response.status(200).send(document);
            response.end();
        })
        .catch((err) => {
            response.status(400).send("List of movies not found");
            response.end();
        })
    }
//get the list of movies based on the different criteria
    else if ((status && title && genres && artists && start_date && end_date
        )){
        
        findMoviesByDetails(status,
            title,
            JSON.parse(genres),
            JSON.parse(artists),
            start_date,
            end_date
            )
        .then((document) => {
            response.status(200).send(document);
            response.end();
        })
        .catch((err) => {
            response.status(400).send("List of movies not found");
            response.end();
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




// app.get('/movies',(request , response) => {
//     findAllMovies()
//     .then ((document) => {
//         console.log(document);
//     });
// })

module.exports = router;