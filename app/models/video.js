var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
  _id: String,
  youtubeUrl: String,
  startSeconds: int,
  endSeconds: int
});

module.exports = mongoose.model('Video', VideoSchema);