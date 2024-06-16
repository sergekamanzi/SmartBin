import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollectionSchedules() {
  const [schedulesWithUsers, setSchedulesWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionSchedules = async () => {
      try {
        // Replace baseURL with your backend server URL
        const response = await axios.get('http://localhost:5000/api/service/schedules', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token in localStorage
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
      <h1>Waste Collection Schedules</h1>
      {schedulesWithUsers.length === 0 ? (
        <p>No schedules found for your district.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Waste Type</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {schedulesWithUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.phonenumber}</td>
                <td>
                  <ul>
                    {user.schedules.map((schedule, idx) => (
                      <li key={idx}>
                        <strong>{schedule.wasteType}</strong>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {user.schedules.map((schedule, idx) => (
                      <li key={idx}>{schedule.schedule}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CollectionSchedules;
