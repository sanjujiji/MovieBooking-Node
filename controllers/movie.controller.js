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
let getArtistId = async (artist,q) => {
    var artistsArr = artist.split(",");
    const artistIdArr = [];
    var artistidNew;
    for (var i = 0; i < artistsArr.length; i++){
        try{
            await artists.find({$expr:{$eq:[artistsArr[i], {$concat:["$first_name"," ","$last_name"]}]}},{_id:0,artistid:1},(err,results) =>{
                artistidNew = results;
                artistIdArr.push(artistidNew[0].artistid);
            }).clone();
            q["$and"].push({"artists.artistid" : artistidNew[0].artistid});
    } catch(error){
        console.log(error);
    }
}
};

const findMoviesByDetails =  async (status,title,genres,artist,releaseDateStart,releaseDateEnd)=>{
    var q = {};
    q['$and'] = [];
    if (status === 'PUBLISHED')
        q["$and"].push({published : true});
    if (status === 'RELEASED')
        q["$and"].push({released : true});    
    if (title)
        q["$and"].push({title : title}); 
    if (genres){
        var genresArr = genres.split(",");
        q["$and"].push({genres: {$all: (genresArr)}});
    }
    if (releaseDateStart && releaseDateEnd)
        q["$and"].push({release_date : {$gte : (releaseDateStart), $lte : (releaseDateEnd)}});
    if (releaseDateStart && (releaseDateEnd === undefined))    
        q["$and"].push({release_date : {$gte : (releaseDateStart)}});
    if ((releaseDateStart===undefined) && (releaseDateEnd))    
        q["$and"].push({release_date : {$lte : (releaseDateEnd)}});
    if (artist)  {
        await getArtistId(artist,q);    
    }
        return movies.find(q);
}

//to fetch details of shows of a specific movie given its id
const findShows = (movieId) => {
    return movies.find(({movieId : movieId}),shows)
};

module.exports = {findAllMovies, findAllMoviesbyStatus, findOne, findShows,findMoviesByDetails};

