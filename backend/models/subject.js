const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  Name: String,
  Code: String,
  category: {
    type: String,
    enum: ["lecture", "tutorial", "practical"],
  },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
