// controllers/attendanceController.js
// const Attendance = require('../models/attendance');

// Mark attendance for a subject
// controllers/attendanceController.js
const Attendance = require('../models/attendance');
const User = require('../models/user');

// Mark attendance for a subject
exports.markAttendance = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { lecture, tutorial, practical } = req.body;
    const userId = req.user._id; // Assuming you have user authentication

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
    await User.findOneAndUpdate(
      { _id: userId, 'attendance.subject': subjectId },
      {
        $set: {
          'attendance.$.lecture': lecture,
          'attendance.$.tutorial': tutorial,
          'attendance.$.practical': practical,
        },
      }
    );

    res.status(200).json({ message: 'Attendance marked successfully', totalAttendance });
  } catch (error) {
    res.status(500).json({ error: 'Error marking attendance', message: error.message });
  }
};



// Fetch attendance for a subject
exports.fetchAttendance = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const userId = req.user._id; // Assuming you have user authentication

    // Find the attendance record for the subject and user
    const attendance = await Attendance.findOne({ subject: subjectId, attendanceOf: userId });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance not found for this subject' });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendance', message: error.message });
  }
};
