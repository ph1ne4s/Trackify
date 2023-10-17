// controllers/timetableController.js
const Timetable = require('../models/timetable');

// ...

exports.addOrUpdateClass = async (req, res) => {
  const { userId, classData } = req.body;
  const { day, timeSlot } = classData;
  
  try {
    // Check if a class with the same day and time already exists
    const existingTimetable = await Timetable.findOne({ timetableOf: userId });
    if (existingTimetable) {
      const existingClassIndex = existingTimetable.classes.findIndex((cls) => cls.day === day && cls.timeSlot === timeSlot);
      if (existingClassIndex !== -1) {
        // If a class with the same day and time exists, update it
        existingTimetable.classes[existingClassIndex] = classData;
      } else {
        // If not, add a new class
        existingTimetable.classes.push(classData);
      }
      // Save the updated timetable
      await existingTimetable.save();
      res.status(200).json({ message: 'Class added/updated successfully', timetable: existingTimetable });
    } else {
      // If no timetable exists for the user, create a new one
      const newTimetable = new Timetable({
        timetableOf: userId,
        classes: [classData],
      });
      await newTimetable.save();
      res.status(201).json({ message: 'Timetable created successfully', timetable: newTimetable });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to add/update class', message: error.message });
  }
};


exports.deleteClass = async (req, res) => {
  const { userId } = req.params;
  const { day, timeSlot } = req.body;

  try {
    // Find the user's timetable
    const timetable = await Timetable.findOne({ timetableOf: userId });

    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    // Find the index of the class to delete
    const classIndex = timetable.classes.findIndex((cls) => cls.day === day && cls.timeSlot === timeSlot);

    if (classIndex === -1) {
      return res.status(404).json({ error: 'Class not found in timetable' });
    }

    // Remove the class from the timetable
    timetable.classes.splice(classIndex, 1);

    // Save the updated timetable
    await timetable.save();

    res.status(200).json({ message: 'Class deleted successfully', timetable });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete class', message: error.message });
  }
};

// controllers/timetable.js
// controllers/timetableController.js
// const Timetable = require('../models/timetable');

// Fetch class info for a specific day and time
exports.getClassInfo = async (req, res) => {
  const { userId, day, timeSlot } = req.params;

  try {
    const timetable = await Timetable.findOne({ timetableOf: userId });
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    const classInfo = timetable.classes.find(
      (cls) => cls.day === day && cls.timeSlot === timeSlot
    );

    // if (!classInfo) {
    //   return res.status(400).json({ error: 'Class not found for the given day and time slot' });
    // }

    res.status(200).json(classInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class info', message: error.message });
  }
};

