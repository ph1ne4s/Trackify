// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmissionsPage({ userId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user's submissions
  const fetchSubmissions = () => {
    axios.get(`http://localhost:8000/api/submissions/651e56d72d8e62bd74df1cac`)
      .then((response) => {
        setSubmissions(response.data.submissions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
        setLoading(false);
      });
  };

  // Function to mark a submission as done
  const markSubmissionAsDone = (submissionId) => {
    // Update the UI to reflect the change (move the submission to the 'Completed' section)
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission._id === submissionId ? { ...submission, haveSubmitted: true } : submission
      )
    );

    // Send a PUT request to update the submission status in the database
    axios.put(`http://localhost:8000/api/submissions/update/651fa7d28e1ffad4eec589f0`, { isSubmitted: true })
      .then(() => {
        // No need to update the UI again here, as it's already done above
      })
      .catch((error) => {
        console.error('Error updating submission status:', error);
      });
  };

  useEffect(() => {
    // Fetch user's submissions when the component mounts
    fetchSubmissions();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
    <h2 className="mb-4">Pending Submissions</h2>
    <ul className="list-group">
      {submissions.map((submission) => (
        !submission.haveSubmitted && (
          <li key={submission._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span className="mr-2">{submission.subject.Name}</span>
              <span className="badge badge-primary">{submission.deadline}</span>
              <button
                className="btn btn-success ml-2"
                onClick={() => markSubmissionAsDone(submission._id)}
              >
                Mark as Done
              </button>
            </div>
          </li>
        )
      ))}
    </ul>
    <h2 className="mt-4">Completed Submissions</h2>
    <ul className="list-group">
      {submissions.map((submission) => (
        submission.haveSubmitted && (
          <li key={submission._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span className="mr-2">{submission.subject.Name}</span>
              <span className="badge badge-success">{submission.deadline} (Completed)</span>
            </div>
          </li>
        )
      ))}
    </ul>
  </div>
  );
}

export default SubmissionsPage;
