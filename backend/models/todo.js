const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  task: String,
  dateTime: Date,
  userId: {
    type: ObjectId,
    ref: 'User', 
  },
}, { timestamps: true });


const Todo = mongoose.model('Todo', todoSchema);

// module.exports = Todo;
