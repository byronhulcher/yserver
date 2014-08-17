// Much code based on http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set our port

var router = express.Router();        // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ up: true }); 
});

app.use('/api', router);

app.listen(port);
console.log('Youtubr API is active on port ' + port);