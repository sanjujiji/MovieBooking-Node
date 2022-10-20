const express = require('express');
const app = express();
const port = 9000;

app.listen(port,() => {
  console.log(`Web server listening at port ${port}`);
});

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

