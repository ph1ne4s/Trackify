// controllers/userController.js
const User = require('../models/user');
// const User = require('../models/user');
const Submission = require('../models/submissions');
const Subject = require('../models/subject');
const Attendance = require('../models/attendance');
const Todo = require('../models/todo');

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
// Import necessary modules and models
// const User = require('../models/user');

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
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



exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the userId from the route parameter

    // Find the user by ID
    const user = await User.findById(userId)
      .populate('subjects.subject') // Populate the subjects with details if needed
      .populate('attendance.subject'); // Populate attendance subjects with details if needed

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user information
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error getting user information', message: error.message });
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

// Fetch all subjects for a user

exports.getSubjectsByUserId = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const user = await User.findById(userId).populate('subjects.subject');
    // console.log(user.batch);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const subjects = user.subjects.map((subject) => ({
      name: subject.name ,
      code: subject.code
    }));

    res.status(200).json({ subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching subjects', message: error.message });
  }
};



  exports.getSubjectDetails = async (req, res) => {
    const { subjectId } = req.params;
  
    try {
      // Find the subject by ObjectId
      const subject = await Subject.findById(subjectId);
  
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found',message:error.message });
      }
  
      res.status(200).json({ message: 'Subject details retrieved successfully', subject });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve subject details', message: error.message });
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

  // const User = require('../models/user');
  // const Subject = require('../models/subject');
  
  exports.createSubject = async (req, res) => {
    const { name, code } = req.body; // Extract name and code from the request body
    const userId = req.params.userId; // Get the userId from the route parameter
  
    try {
      // Create the subject with the associated userId, name, and code
      const subject = new Subject({
        name: name,
        code: code,
        userId: userId,
      });
  
      // Save the subject to the database
      await subject.save();
  
      // Update the user's subjects array by pushing the subject's ObjectId
      await User.findByIdAndUpdate(userId, {
        $push: { subjects: { _id: subject._id, name: name, code: code } },
      });
  
      res.status(201).json({ message: 'Subject created successfully', subject });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create subject', message: error.message });
    }
  };
  
  

// Create a new task for a user
// exports.createTodo = async (req, res) => {
//   console.log("heeh");
//   try {
//     const { task, dateTime } = req.body;
//     const userId = req.params.userId; // Get the user's ID from the request params

//     // Find the user by ID and add the task to their todo array
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     console.log(user);

//     const newTodo = { task, dateTime };
    
//     user.todo.push(newTodo);
//     await user.save();

//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not save the task.',message: error.message });
//   }
// };
// // Get all tasks for a user
// exports.getAllTodos = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Get the user's ID from the request params

//     // Find the user by ID and return their todo array
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const todos = user.todo;
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not retrieve tasks.',message: error.message });
//   }
// };


// Save a new todo for a user
exports.saveTodo = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the user's ID from the request params
    const { task, dateTime } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new todo to the user's todo array
    user.todo.push({ task, dateTime });
    await user.save();

    return res.status(201).json({ message: 'Todo saved successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// List todos for a user
exports.listTodos = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ todos: user.todo });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a todo for a user
exports.removeTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the todo item to remove
    const todoIndex = user.todo.findIndex((todo) => todo._id.toString() === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Remove the todo from the user's todo array
    user.todo.splice(todoIndex, 1);
    await user.save();

    return res.status(200).json({ message: 'Todo removed successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
