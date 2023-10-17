// models/timetable.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  subject: {
    name: String, 
    code: String,  
  },
  day: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
});

const timetableSchema = new mongoose.Schema({
  classes: [classSchema],
  timetableOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

module.exports = mongoose.model('Timetable', timetableSchema);
