// controllers/attendanceController.js
const Attendance = require('../models/attendance');

// Mark attendance for a subject
// controllers/attendanceController.js
// const Attendance = require('../models/attendance');
const User = require('../models/user');

// Mark attendance for a subject
exports.markAttendance = async (req, res) => {
    try {
      const { subjectId } = req.params;
      const { lecture, tutorial, practical } = req.body;
      const userId = '651e56d72d8e62bd74df1cac';  // Replace with the actual userId
  
      console.log('Received userId:', userId);
      
      // Find the attendance record for the subject and user
      let attendance = await Attendance.findOne({ subject: subjectId, attendanceOf: userId });
  
      if (!attendance) {
        // Create a new attendance record if it doesn't exist
        attendance = new Attendance({
          subject: subjectId,
          lecture: 0,
          tutorial: 0,
          practical: 0,
          attendanceOf: userId,
        });
      }
  
      // Update attendance for lectures, tutorials, and practicals
      attendance.lecture = lecture;
      attendance.tutorial = tutorial;
      attendance.practical = practical;
  
      // Calculate the total attendance percentage (you can adjust the formula)
      const totalAttendance = (lecture + tutorial + practical) / 3;
  
      attendance.save();
  
      // Update the user's attendance in the User model
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the attendance record for the subject in the user's attendance array
      const userAttendance = user.attendance.find((entry) => entry.subject.equals(subjectId));
  
      if (userAttendance) {
        // If the attendance entry exists, update it
        userAttendance.lecture = lecture;
        userAttendance.tutorial = tutorial;
        userAttendance.practical = practical;
      } else {
        // If it doesn't exist, create a new entry
        user.attendance.push({
          subject: subjectId,
          lecture: lecture,
          tutorial: tutorial,
          practical: practical,
        });
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({ message: 'Attendance marked successfully', totalAttendance });
    } catch (error) {
      res.status(500).json({ error: 'Error marking attendance', message: error.message });
    }
  };
  


// Fetch attendance for a subject
exports.fetchAttendance = async (req, res) => {
    try {
      const { subjectId } = req.params;
      const userId = '651e56d72d8e62bd74df1cac';  // Replace with the actual userId
  
      // Find the attendance record for the subject and user
      const attendance = await Attendance.findOne({ subject: subjectId, attendanceOf: userId });
  
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance not found for this user and subject', message: error.message  });
      }
  
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching attendance', message: error.message });
    }
  };
