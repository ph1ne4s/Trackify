// routes/attendance.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');

// Mark attendance for a subject
router.put('/mark/:subjectId', attendanceController.markAttendance);
router.get('/view/:subjectId', attendanceController.fetchAttendance);

module.exports = router;