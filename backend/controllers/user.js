// controllers/userController.js
const User = require('../models/user');
// const User = require('../models/user');
const Submission = require('../models/submissions');
const Subject = require('../models/subject');
const Attendance = require('../models/attendance');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', message: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user', message: error.message });
  }
};

// List all submissions for a user
exports.listSubmissions = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all submissions for the user
    const submissions = await Submission.find({ submissionsOf: userId });
    res.status(200).json({ submissions });
  } catch (error) {
    res.status(500).json({ error: 'Error listing submissions', message: error.message });
  }
};

// Create a new submission
exports.createSubmission = async (req, res) => {
  const submissionData = req.body;

  try {
    // Create a new submission
    const submission = new Submission(submissionData);
    await submission.save();
    res.status(201).json({ message: 'Submission created successfully', submission });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create submission', message: error.message });
  }
};

// Update a submission by ID
exports.updateSubmission = async (req, res) => {
  const submissionId = req.params.submissionId;
  const updateData = req.body;

  try {
    // Find and update the submission
    const submission = await Submission.findByIdAndUpdate(submissionId, updateData, { new: true });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.status(200).json({ message: 'Submission updated successfully', submission });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update submission', message: error.message });
  }
};

// Delete a submission by ID
exports.deleteSubmission = async (req, res) => {
  const submissionId = req.params.submissionId;

  try {
    // Find and delete the submission
    const submission = await Submission.findByIdAndDelete(submissionId);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete submission', message: error.message });
  }
};

// Fetch all subjects
exports.fetchSubjects = async (req, res) => {
    try {
      // Find all subjects
      const subjects = await Subject.find();
      res.status(200).json({ subjects });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching subjects', message: error.message });
    }
  };

  // View user attendance for a specific subject
exports.viewAttendance = async (req, res) => {
    const userId = req.params.userId;
    const subjectId = req.params.subjectId;
  
    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the subject's attendance for the user
      const attendance = await Attendance.findOne({
        attendanceOf: userId,
        subjects: { $elemMatch: { subject: subjectId } },
      });
  
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance not found for this subject' });
      }
  
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching attendance', message: error.message });
    }
  };

  exports.createSubject = async (req, res) => {
    const subjectData = req.body;
  
    try {
      const subject = new Subject(subjectData);
      await subject.save();
      res.status(201).json({ message: 'Subject created successfully', subject });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create subject', message: error.message });
    }
  };