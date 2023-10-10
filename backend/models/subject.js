const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  Name: String,
  Code: String,
  userId: {
    type: ObjectId,
    ref: 'User', 
  },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);

