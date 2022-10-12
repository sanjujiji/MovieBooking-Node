const http = require('http');
const httpStatus = require('http-status-codes');

const port = 9000;

const app = http.createServer((req,res) => {
    let url = req.url;
    let text = url.substring(1);
    if (req.method == 'GET'){
        res.writeHead(httpStatus.StatusCodes.OK,"Content-Type:text/plain");
        res.write(`All ${text} Data in JSON format from Mongo DB`);
        res.end();
    }

});
app.listen(port);
