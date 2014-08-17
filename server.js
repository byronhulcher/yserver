var generateId = function(length){
  // via http://stackoverflow.com/a/19964557
  return new Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
}

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
