import React, { useState } from 'react';

const UserForm = () => {
  const initialSubject = { subject: '', code: '' };
    const [user, setUser] = useState({
    name: '',
    batch: '',
    branch: 'Select Branch',
    enrollmentNumber: '',
    email: '',
    subjects: [initialSubject],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...user.subjects];
    updatedSubjects[index][name] = value;
    setUser({
      ...user,
      subjects: updatedSubjects,
    });
  };

  const addSubject = () => {
    setUser({
      ...user,
      subjects: [...user.subjects, initialSubject],
    });
  };

  const deleteSubject = (index) => {
    const updatedSubjects = [...user.subjects];
    updatedSubjects.splice(index, 1);
    setUser({
      ...user,
      subjects: updatedSubjects,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Extract the subjects' data from the user object
      const subjectsData = user.subjects;
  
      // Send subjectsData to the server to create subjects
      const response = await axios.post('/api/subjects/create', subjectsData);
      console.log('Server response:', response.data);
  
      // Reset the form after successful submission
      setUser({
        name: '',
        batch: '',
        branch: 'Select Branch',
        enrollmentNumber: '',
        email: '',
        subjects: [initialSubject],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Info Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <input
            type="text"
            className="form-control"
            id="batch"
            name="batch"
            value={user.batch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select
            className="form-control"
            id="branch"
            name="branch"
            value={user.branch}
            onChange={handleChange}
            required
          >
            <option value="Select Branch">Select Branch</option>
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
            <option value="Branch 3">Branch 3</option>
            {/* Add more branch options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number</label>
          <input
            type="number"
            className="form-control"
            id="enrollmentNumber"
            name="enrollmentNumber"
            value={user.enrollmentNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Subjects</h3>
        {user.subjects.map((subject, index) => (
          <div key={index} className="mb-4 border p-3">
            <div className="form-group">
              <label htmlFor={`subject${index}`}>Subject</label>
              <input
                type="text"
                className="form-control"
                id={`subject${index}`}
                name="subject"
                value={subject.subject}
                onChange={(e) => handleSubjectChange(e, index)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`code${index}`}>Code</label>
              <input
                type="text"
                className="form-control"
                id={`code${index}`}
                name="code"
                value={subject.code}
                onChange={(e) => handleSubjectChange(e, index)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteSubject(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addSubject}>
          Add Subject
        </button>
        <button type="submit" className="btn btn-success ml-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;



