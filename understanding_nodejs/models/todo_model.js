var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  username: String,
  todo: String,
  is_done: Boolean,
  has_attachment: Boolean,
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;