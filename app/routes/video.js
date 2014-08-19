var Video      = require('../models/video');
var express = require('express');

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
    var generateId = function(length){
      // via http://stackoverflow.com/a/19964557
      return new Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
    }

    var video = new Video();
    video.youtubeUrl = req.body.youtubeUrl;
    if (typeof(req.body.startSeconds)!="undefined") video.startSeconds = req.body.startSeconds;
    if (typeof(req.body.endSeconds)!="undefined") video.endSeconds = req.body.endSeconds;
    if (typeof(req.body.duration)!="undefined") video.duration = req.body.duration;
    if (typeof(req.body.title)!="undefined") video.title = req.body.title;
    
    video["_id"] = generateId(5);
    if (typeof(video.youtubeUrl) =="undefined") {
      res.status(400).send('No youtubeUrl');
    }
    else {
      video.save(function(err) {
        if (err)
          res.send(err);

        res.json(video);
      });
    }
  })

  .get(function(req, res) {
    Video.find(function(err, videos) {
      if (err)
        res.status(404).send(err);

      res.json(videos);
    });
  });

router.route('/video/:videoId')

  .get(function(req, res) {
    Video.findById(req.params.videoId, function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
  });

module.exports = router
