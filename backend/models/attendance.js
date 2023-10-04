const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema({
  subject: {
    type: ObjectId,
    ref: 'Subject',
  },
  lecture: Number,
  tutorial: Number,
  practical: Number,
  attendanceOf: {
    type: ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
