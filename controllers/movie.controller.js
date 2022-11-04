const {db,mongoose,artists,genres,movies,users} = require('../models/index');

//To search all movies
const findAllMovies = () => {
    return movies.find({})
};


//To search the movie by status
const findAllMoviesbyStatus = (publishedStatus) => {
    if (publishedStatus === "PUBLISHED")
        return movies.find({published : true})
    else if (publishedStatus === "RELEASED") 
        return movies.find({released : true})   
};



//To fetch the details of a movie given its id
const findOne = (movieId) => {
    return movies.find({movieid : parseInt(movieId)})
};

//To fetch the details of a movie given the details of status, title, genres, artists, release date and published date
const findMoviesByDetails = (status,title,genres,artists,releaseDate,publishedDate)=>{
    
    if (status === "PUBLISHED"){
        return movies.find({
            published : true,
            title : title,
            genres: {$all: (genres)} ,
            "artists.artistid" : {$all : artists},
            release_date : new Date(releaseDate),
            publish_date : new Date(publishedDate)
        })
    }
    else{
        return movies.find({
            released : true,
            title : title,
            genres: {$all: (genres)} ,
            "artists.artistid" : {$all : artists},
            release_date : new Date(releaseDate),
            publish_date : new Date(publishedDate)
        })

    }  
}

//to fetch details of shows of a specific movie given its id
const findShows = (movieId) => {
    return movies.find(({movieId : movieId}),shows)
};

module.exports = {findAllMovies, findAllMoviesbyStatus, findOne, findShows,findMoviesByDetails};

