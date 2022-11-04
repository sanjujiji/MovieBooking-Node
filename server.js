const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

//Importing all routes
const movieRoute = require('./routes/movie.routes');
const genreRoute = require('./routes/genre.routes');
const artistRoute = require('./routes/artist.routes');
const loginRoute = require('./routes/user.routes');
//cors module
const cors = require('cors');
  app.use(cors());
  var corsOptions = {
      origin: 'http://localhost:9000',
      optionsSuccessStatus: 200, // For legacy browser support
      methods: "GET, PUT" // would allow only GET and PUT request
  };
  app.use(cors(corsOptions))
  app.use(bodyParser.json());
//port for web server 
const port = 9000;

app.listen(port,() => {
  console.log(`Web server listening at port ${port}`);
});



//Routes
app.use('/api/',movieRoute);
app.use('/api/',genreRoute);
app.use('/api/',artistRoute);
app.use('/api/',loginRoute);

// const http = require('http');
// const httpStatus = require('http-status-codes');

// //webserver setup
// const port = 9000;

// const app = http.createServer((req,res) => {
//     let url = req.url;
//     let text = url.substring(1);
//     if (req.method == 'GET'){
//         res.writeHead(httpStatus.StatusCodes.OK,"Content-Type:text/plain");
//         res.write(`All ${text} Data in JSON format from Mongo DB`);
//         res.end();
//     }

// });

//mongo db setup
const dbNew = require("./models/index");
dbNew.mongoose.connect(dbNew.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


  //Routing
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
  });
 
  module.exports = {express,router}  ;