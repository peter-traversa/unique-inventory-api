var mongoose = require('mongoose');

// define Schema
var thoughtSchema = mongoose.Schema({
  thought_id: Number,
  thought: String,
  tags: Array
});

// Export Contact model
var Thought = module.exports = mongoose.model('thought', thoughtSchema);

module.exports.get = function (callback, limit) {
  Thought.find(callback).limit(limit);
}