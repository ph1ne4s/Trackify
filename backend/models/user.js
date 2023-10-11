const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: String,
  batch: String,
  branch: String,
  enrollmentNo: Number,
  email: {
    type: String,
    required: true,
    index: true,
  },
  subjects: [
    {
      subject: {
        type: ObjectId,
        ref: 'Subject',
      },
      name: String, 
      code: String, 
    },
  ],
  attendance: [
    {
      subject: {
        type: ObjectId,
        ref: 'Subject', 
      },
      lecture: Number,
      tutorial: Number,
      practical: Number,
    },
  ],
  submissions: [
    {
      submission: {
        type: ObjectId,
        ref: 'Submission',
      },
      isSubmitted: Boolean,
    },
  ],
  todo: [
    {
      task: String,
      dueDate: Date,
      isCompleted: Boolean,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

