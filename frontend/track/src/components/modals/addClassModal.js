import React, { useState } from 'react';
import { Modal, Select } from 'antd';

const { Option } = Select;

const ClassModal = ({ subjects, day, time, onSave, onCancel, isModalOpen }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  const handleSave = () => {
    if (!selectedSubject || !selectedCategory) {
      alert('Please select a subject and category.');
      return;
    }
    onSave(selectedSubject, day, time, selectedCategory); // Pass selected category to onSave
  };

  return (
    <Modal
      title="Edit Class"
      visible={isModalOpen}
      onOk={handleSave}
      onCancel={onCancel}
    >
      <div className="form-group">
        <label htmlFor="subject">Select Subject</label>
        <Select
          id="subject"
          style={{ width: '100%' }}
          value={selectedSubject}
          onChange={setSelectedSubject}
        >
          <Option value="">Select a Subject</Option>
          {subjects.map((subject, index) => (
            <Option key={index} value={subject.name}>
              {subject.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Select Category</label>
        <Select
          id="category"
          style={{ width: '100%' }}
          value={selectedCategory}
          onChange={setSelectedCategory}
        >
          <Option value="">Select a Category</Option>
          <Option value="Lecture">Lecture</Option>
          <Option value="Tutorial">Tutorial</Option>
          <Option value="Practical">Practical</Option>
        </Select>
      </div>
      <div className="form-group">
        <label htmlFor="day">Day</label>
        <input id="day" className="form-control" type="text" value={day} disabled />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time Slot</label>
        <input id="time" className="form-control" type="text" value={time} disabled />
      </div>
    </Modal>
  );
};

export default ClassModal;
