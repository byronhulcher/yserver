// Much code based on http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@ds063449.mongolab.com:63449/youtubr'); // connect to our database

var Video      = require('./app/models/video');

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

router.route('/video')

  .post(function(req, res) {
    var video = new Video();
    video.youtubeUrl = req.body.youtubeUrl;
    if (typeof(video.youtubeUrl) =="undefined") {
      res.status(400).send('No youtubeUrl');
    }
    else {
      video.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Video created! '+video.youtubeUrl.toString()});
      });
    }
  })

  .get(function(req, res) {
    Video.find(function(err, videos) {
      if (err)
        res.send(err);

      res.json(videos);
    });
  });

router.route('/video/:video_id')

  .get(function(req, res) {
    Video.findById(req.params.video_id, function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Youtubr API is active on port ' + port);
