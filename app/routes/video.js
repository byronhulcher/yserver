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

          var retVal ={}
          retVal[video._id] = video
          res.json(retVal);
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