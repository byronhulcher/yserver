var generateId = function(length){
  // via http://stackoverflow.com/a/19964557
  return new Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
}

var Video      = require('../models/video');

module.exports = function (router) {

  router.route('/video')

    .post(function(req, res) {
      var video = new Video();
      video.youtubeUrl = req.body.youtubeUrl;
      video._id = generateId(5);
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
}