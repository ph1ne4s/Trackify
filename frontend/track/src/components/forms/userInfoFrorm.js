// UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const userId = "651e56d72d8e62bd74df1cac";

  const [user, setUser] = useState({
    name: '',
    batch: '',
    branch: 'Select Branch',
    enrollmentNumber: '',
    email: '',
    subjectIds: [],
    subjects: [],
  });

  // const getSubjectDetails = async (subjectId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/api/subjects/${subjectId}`);
  //     return response.data.subject;
  //   } catch (error) {
  //     console.error('Error fetching subject details:', error);
  //     return null;
  //   }
  // };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        const userData = response.data.user;
  
        setUser((prevUser) => ({
          ...prevUser,
          name: userData.name,
          email: userData.email,
          batch: userData.batch,
          branch: userData.branch,
          enrollmentNumber: userData.enrollmentNo,
          subjects: userData.subjects.map((subjectData) => ({
            name: subjectData.name,
            code: subjectData.code,
          })),
        }));
       console.log(user);
        // if (userData.subjects) {
        //   const subjectIds = userData.subjects.map((subjectData) => subjectData._id);
        //   const subjectDetails = await Promise.all(subjectIds.map(getSubjectDetails));
        //   setUser((prevUser) => ({
        //     ...prevUser,
        //     subjects: subjectDetails,
        //   }));
        // }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, [userId]);
  
  

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
      subjects: [...user.subjects, { subject: '', code: '' }],
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
      const response = await axios.put(`http://localhost:8000/api/updateUser/${userId}`, user);
      console.log('Server response:', response.data);
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
            <option value="Select Branch">{user.branch}</option>
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
            <option value="Branch 3">Branch 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number</label>
          <input
            type="number"
            className="form-control"
            id="enrollmentNumber"
            name="enrollmentNumber"
            value={user.enrollmentNumber }
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
                value={subject.name}
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
