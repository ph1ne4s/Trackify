const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
  subject: {
    type: ObjectId,
    ref: 'Subject',
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  },
  deadline: Date,
  haveSubmitted: {
    type: Boolean,
    default: false,
  },
  submittedBy: {
    type: ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
