// controllers/userController.js
const User = require('../models/user');
// const User = require('../models/user');
const Submission = require('../models/submissions');
const Subject = require('../models/subject');
const Attendance = require('../models/attendance');

// Create a new user
exports.createUser = async (req, res) => {
  const userData = req.body;

  try {
    // Create a new user
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



// List submissions for a user
exports.listSubmissionsForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all submissions submitted by the user
    const submissions = await Submission.find({ submittedBy: userId }).populate('subject');

    if (!submissions) {
      return res.status(404).json({ error: 'Submissions not found for this user' });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    res.status(500).json({ error: 'Error listing submissions', message: error.message });
  }
};




// Create a new submission
exports.createSubmission = async (req, res) => {
  const submissionData = req.body;

  try {
        // Check if the user already has a submission for the same subject
        const existingSubmission = await Submission.findOne({
          subject: submissionData.subject,
          submittedBy: submissionData.submittedBy,
        });
    
        if (existingSubmission) {
          return res.status(400).json({ error: 'Duplicate submission for the same subject' });
        }
    // Create a new submission
    const submission = new Submission(submissionData);
    await submission.save();

    // Update the user's submissions array with the submission information
    const user = await User.findById(submissionData.submittedBy);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the submission to the user's submissions array
    user.submissions.push({
      submission: submission._id,
      isSubmitted: false, // Initially set as not submitted
    });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Submission created successfully', submission });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create submission', message: error.message });
  }
};
// Update a submission by ID
exports.updateSubmissionStatus = async (req, res) => {
  const submissionId = req.params.submissionId;
  const { isSubmitted } = req.body;

  try {
    // Check if the submission exists
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Update the submission status
    submission.haveSubmitted = isSubmitted;
    await submission.save();

    res.status(200).json({ message: 'Submission status updated successfully', submission });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update submission status', message: error.message });
  }
};

// Delete a submission by ID
// exports.deleteSubmission = async (req, res) => {
//   const submissionId = req.params.submissionId;

//   try {
//     // Find and delete the submission
//     const submission = await Submission.findByIdAndDelete(submissionId);

//     if (!submission) {
//       return res.status(404).json({ error: 'Submission not found' });
//     }

//     res.status(200).json({ message: 'Submission deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to delete submission', message: error.message });
//   }
// };

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

  const User = require('../models/user');
  const Subject = require('../models/subject');
  
  exports.createSubject = async (req, res) => {
    const subjectData = req.body;
    const userId = req.params.userId; // Get the userId from the route parameter
  
    try {
      // Create the subject with the associated userId
      const subject = new Subject({
        ...subjectData,
        userId: userId,
      });
  
      // Save the subject to the database
      await subject.save();
  
      // Update the user's subjects array by pushing the subject's ObjectId
      await User.findByIdAndUpdate(userId, {
        $push: { subjects: subject._id },
      });
  
      res.status(201).json({ message: 'Subject created successfully', subject });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create subject', message: error.message });
    }
  };
  

  // Create a new task
exports.createTodo = async (req, res) => {
  try {
    const { task, dateTime } = req.body;
    const newTodo = new Todo({ task, dateTime });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Could not save the task.' });
  }
};

// Get all tasks
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve tasks.' });
  }
};