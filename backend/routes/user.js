
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const attendanceController = require('../controllers/attendance');

router.post('/createUser', userController.createUser);


router.put('/updateUser/:userId', userController.updateUser);

router.get('/users/:userId', userController.getUserInfo);

router.get('/attendance/:userId/:subjectId', userController.viewAttendance);

router.get('/submissions/:userId', userController.listSubmissionsForUser);

// Create a new submission
router.post('/submissions/create', userController.createSubmission);

// Update a submission by ID
router.put('/submissions/update/:submissionId', userController.updateSubmissionStatus);

// Delete a submission by ID
// router.delete('/submissions/delete/:submissionId', userController.deleteSubmission);

// router.get('/subjects', userController.fetchSubjects);
router.get('/users/:userId/subjects', userController.getSubjectsByUserId);

router.post('/subjects/create/:userId', userController.createSubject);

router.get('/subjects/:subjectId', userController.getSubjectDetails);

// Create a new task
// router.post('/Todo/create/:userId', userController.createTodo);

// Get all tasks
// router.get('/Todo/:userId', userController.getAllTodos);

router.post('/user/:userId/todo', userController.saveTodo);

// List todos for a user
router.get('/user/:userId/getTodos', userController.listTodos);

// Remove a todo for a user
router.delete('/user/:userId/todo/:todoId', userController.removeTodo);


router.put('/mark/:subjectId', attendanceController.markAttendance);
router.get('/attendance/:subjectId', attendanceController.fetchAttendance);

module.exports = router;
