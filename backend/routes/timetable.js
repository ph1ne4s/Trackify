const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetable');

// Route for adding a class to the timetable
router.post('/add-class', timetableController.addOrUpdateClass);

router.delete('/:userId/deleteClass', timetableController.deleteClass);
// router.get('/classInfo/:userId/:day/:timeSlot', timetableController.getClassInfo);
// router.get('/classInfo/:userId/:day/:category/:timeSlot', timetableController.getClassInfo);
router.get('/timetable/classInfo/:userId/:day/:timeSlot', timetableController.getClassInfo);



module.exports = router;
