import React, { useState } from 'react';

const ClassModal = ({ subjects, day, time, onSave, onCancel }) => {
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSave = () => {
    // Check if a subject is selected
    if (!selectedSubject) {
      alert('Please select a subject.');
      return;
    }

    // Trigger the onSave function with the selected subject, day, and time
    onSave(selectedSubject, day, time);
  };

  return (
    <div className="modal fade show">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Class</h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="subject">Select Subject</label>
              <select
                id="subject"
                className="form-control"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="day">Day</label>
              <input
                id="day"
                className="form-control"
                type="text"
                value={day}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time Slot</label>
              <input
                id="time"
                className="form-control"
                type="text"
                value={time}
                disabled
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;
