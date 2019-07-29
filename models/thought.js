var mongoose = require('mongoose');

// define Schema
var thoughtSchema = mongoose.Schema({
  userId: String,
  thought: String,
  tags: Array
});

// Export Contact model
var Thought = module.exports = mongoose.model('Thought', thoughtSchema);

module.exports.get = function (callback, limit) {
  Thought.find(callback).limit(limit);
}