import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CollectionSchedules() {
  const [schedulesWithUsers, setSchedulesWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service/schedules', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
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
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto pl-8">
      <h1 className="text-2xl font-bold mb-4">Waste Collection Schedules</h1>
      {schedulesWithUsers.length === 0 ? (
        <p className="text-center">No schedules found for your district.</p>
      ) : (
        <div className="">
          <table className="min-w-full shadow-2xl border border-green-500 rounded-lg ">
            <thead className=''  >
              <tr className="bg-[eee] text-gray-900 uppercase text-sm leading-normal ">
                <th>No</th>
                <th className="">Username</th>
                <th className="t">Phone Number</th>
                <th className="">Waste Type</th>
                <th className="">Schedule</th>
                
              </tr>
            </thead>
            <tbody className="text-gray-900 text-sm font-normal">
              {schedulesWithUsers.map((user, index) => (
                <tr key={index} className={`text-[20px] text-center h-[34px] ${
                  index % 2 === 0 ? "bg-[#d6f1e1]" : ""
                }`}>
                  <td>{index + 1}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.username}</td>
                  <td className="py-3 px-6 text-left">{user.phonenumber}</td>
                  <td className="py-3 px-6 text-left">
                    <ul>
                      {user.schedules.map((schedule, idx) => (
                        <li key={idx}><strong>{schedule.wasteType}</strong></li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-6 text-left">
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
        </div>
      )}
    </div>
  );
}

export default CollectionSchedules;
