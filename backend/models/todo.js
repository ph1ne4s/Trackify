const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});


const Todo = mongoose.model('Todo', todoSchema);

// module.exports = Todo;
