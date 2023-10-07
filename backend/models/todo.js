const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: String,
  dateTime: Date,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;