import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RouteManagement = () => {
  const [schedulesWithUsers, setSchedulesWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service/schedules', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust according to your authentication method
          }
        });
        setSchedulesWithUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCollectionSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h2>Route Managment</h2>

      {schedulesWithUsers.length === 0 ? (
        <p>No schedules found for companies in your district.</p>
      ) : (
        <div>
          <h3></h3>
          <ul>
            {schedulesWithUsers.map((user, index) => (
              <li key={index}>
                <strong>Phone Number:</strong> {user.phonenumber}<br />
                <strong>House Number:</strong> {user.street}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
