var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
  _id: String,
  youtubeUrl: String
});

module.exports = mongoose.model('Video', VideoSchema);