// Much code based on http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@ds063449.mongolab.com:63449/youtubr'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set our port

var router = express.Router();        // get an instance of the express Router
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Request from API', req.originalUrl);
  next();
});

router.get('/', function(req, res) {
  res.json({ up: true }); 
});

require('./app/routes/video')(router)

app.use('/api', router);

app.listen(port);
console.log('Youtubr API is active on port ' + port);
