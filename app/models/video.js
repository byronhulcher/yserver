var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
  youtubeUrl: String
});

module.exports = mongoose.model('Video', VideoSchema);