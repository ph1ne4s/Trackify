  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import ClassModal from './modals/addClassModal'; // Adjust the import path as needed

  const Timetable = ({ userId }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [
      '08-09',
      '09-10',
      '10-11',
      '11-12',
      '12-01',
      '01-02',
      '02-03',
      '03-04',
      '04-05',
      '05-06',
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [classInfo, setClassInfo] = useState({});
    const [subjects, setSubjects] = useState([]); // State to store subjects

    useEffect(() => {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/subjects');
          const subjectNames = response.data.subjects.map((subject) => subject.Name); // Extract only the subject names
          setSubjects(subjectNames);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };

      fetchSubjects();

      const fetchClassInfo = async () => {
        const classInfoData = {};
        for (const day of days) {
          for (const time of times) {
            try {
              const response = await axios.get(
                `http://localhost:8000/api/timetable/classInfo/651e56d72d8e62bd74df1cac/${day}/${time}`
              );
              classInfoData[`${day}-${time}`] = response.data;
            } catch (error) {
              console.error(`Error fetching class info for ${day}-${time}:`, error);
            }
          }
        }
        setClassInfo(classInfoData);
      };

      fetchClassInfo();
    }, [userId]);

    const openModal = (day, time) => {
      setSelectedDay(day);
      setSelectedTime(time);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const onSave = async (selectedSubject, day, time) => {
      // Create the class data object
      const classData = {
        subject: {
          name: selectedSubject.name,
          code: 'll',
        },
        day: day,
        timeSlot: time,
        
        category: 'll', // Add this property if available
      };
    
      try {
        // Make a POST request to add or update the class
        const response = await axios.post('http://localhost:8000/api/add-class', {
          userId: userId, // Replace with the actual user ID
          classData: classData,
        });
    
        // Check the response for success
        if (response.status === 200 || response.status === 201) {
          // Class added/updated successfully, close the modal
          
          console.log('Class added/updated successfully');
        } else {
          console.error('Failed to add/update class:', response.data.message);
          // Handle the error as needed
        }
      } catch (error) {
        console.error('Error while adding/updating class:', error);
        // Handle the error as needed
      }
      setIsModalOpen(false);
    };
    
    const timetable = times.map((time, timeIndex) => (
      <tr key={timeIndex}>
        <td className="bg-light text-center">{time}</td>
        {days.map((day, dayIndex) => (
          <td key={dayIndex} className="timetable-cell text-center">
            {classInfo[`${day}-${time}`] ? (
              <div>
                <strong>{classInfo[`${day}-${time}`].subject.name}</strong>
                <br />
                {classInfo[`${day}-${time}`].subject.code} ({classInfo[`${day}-${time}`].category})
                <br/>
                <button onClick={() => openModal(day, time)} className="btn btn-link">
                 Edit
              </button>
              </div>
              
            ) : (
              <button onClick={() => openModal(day, time)} className="btn btn-link">
                Add 
              </button>
            )}
          </td>
        ))}
      </tr>
    ));

    return (
      <div className="container mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{timetable}</tbody>
        </table>

        {isModalOpen && (
          <ClassModal
          subjects={subjects}
          day={selectedDay}
          time={selectedTime}
          onSave={onSave}
          onCancel={closeModal}
          isModalOpen={isModalOpen} // Pass isModalOpen as a prop
        />
        )}
      </div>
    );
  };

  export default Timetable;
