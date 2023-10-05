// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmissionsPage({ userId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user's submissions
  const fetchSubmissions = () => {
    axios.get(`/api/submissions/${userId}`)
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
    axios.put(`/api/submissions/update/${submissionId}`, { isSubmitted: true })
      .then(() => {
        // Update the UI to reflect the change (move the submission to the 'Completed' section)
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission._id === submissionId ? { ...submission, haveSubmitted: true } : submission
          )
        );
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
      <h2>Pending Submissions</h2>
      <ul className="list-group">
        {submissions.map((submission) => (
          !submission.haveSubmitted && (
            <li key={submission._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{submission.subject.name}</span>
                <span>{submission.deadline}</span>
                <button
                  className="btn btn-primary"
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
                <span>{submission.subject.name}</span>
                <span>{submission.deadline} (Completed)</span>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default SubmissionsPage;

