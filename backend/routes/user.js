
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/createUser', userController.createUser);


router.put('/updateUser/:id', userController.updateUser);


router.get('/attendance/:userId/:subjectId', userController.viewAttendance);

router.get('/submissions/:userId', userController.listSubmissionsForUser);

// Create a new submission
router.post('/submissions/create', userController.createSubmission);

// Update a submission by ID
router.put('/submissions/update/:submissionId', userController.updateSubmissionStatus);

// Delete a submission by ID
// router.delete('/submissions/delete/:submissionId', userController.deleteSubmission);

router.get('/subjects', userController.fetchSubjects);

router.post('/subjects/create/:userId', userController.createSubject);

// Create a new task
router.post('/Todo', userController.createTodo);

// Get all tasks
router.get('/Todo', userController.getAllTodos);

module.exports = router;
