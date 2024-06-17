// src/PerformanceLogManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getUserIdFromToken = (token) => {
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id; // Assuming the token payload contains the user id as `id`
};

const PerformanceLogManager = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ houseNumber: '', wasteType: '', days: '', date: '', time: '' });
  const [editLog, setEditLog] = useState(null);
  const [newLogDateTime, setNewLogDateTime] = useState({ date: '', time: '' });
  const [editLogDateTime, setEditLogDateTime] = useState({ date: '', time: '' });

  useEffect(() => {
    fetchPerformanceLogs();
  }, []);

  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token); // Function to extract userId from token

  const fetchPerformanceLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/service/${userId}/performance-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching performance logs:', error);
    }
  };

  const addPerformanceLog = async () => {
    try {
      const { date, time, ...rest } = newLog;
      const newLogData = { ...rest, date, time };

      await axios.post(`http://localhost:5000/api/service/${userId}/performance-logs`, newLogData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Performance log added successfully!');
      fetchPerformanceLogs();
      setNewLog({ houseNumber: '', wasteType: '', days: '', date: '', time: '' });
    } catch (error) {
      console.error('Error adding performance log:', error);
    }
  };

  const updatePerformanceLog = async () => {
    try {
      const { date, time, ...rest } = editLog;
      const editLogData = { ...rest, date, time };

      await axios.put(`http://localhost:5000/api/service/${userId}/performance-logs/${editLog._id}`, editLogData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Performance log updated successfully!');
      fetchPerformanceLogs();
      setEditLog(null);
    } catch (error) {
      console.error('Error updating performance log:', error);
    }
  };

  const deletePerformanceLog = async (logId) => {
    try {
      await axios.delete(`http://localhost:5000/api/service/${userId}/performance-logs/${logId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Performance log deleted successfully!');
      fetchPerformanceLogs();
    } catch (error) {
      console.error('Error deleting performance log:', error);
    }
  };

  const handleEdit = (log) => {
    setEditLog({ ...log });
    setEditLogDateTime({ date: log.date, time: log.time });
  };

  const handleCancelEdit = () => {
    setEditLog(null);
    setEditLogDateTime({ date: '', time: '' });
  };

  const handleChangeNewLog = (e) => {
    const { name, value } = e.target;
    setNewLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  const handleChangeEditLog = (e) => {
    const { name, value } = e.target;
    setEditLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  const handleChangeNewLogDateTime = (e) => {
    const { name, value } = e.target;
    setNewLogDateTime((prevDateTime) => ({ ...prevDateTime, [name]: value }));
    setNewLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  const handleChangeEditLogDateTime = (e) => {
    const { name, value } = e.target;
    setEditLogDateTime((prevDateTime) => ({ ...prevDateTime, [name]: value }));
    setEditLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  return (
    <div>
      <h2>Performance Log Manager</h2>

      <h3>Add New Log</h3>
      <div>
        <input type="text" name="houseNumber" placeholder="House Number" value={newLog.houseNumber} onChange={handleChangeNewLog} required />
        <input type="text" name="wasteType" placeholder="Waste Type" value={newLog.wasteType} onChange={handleChangeNewLog} required />
        <input type="number" name="days" placeholder="Days" value={newLog.days} onChange={handleChangeNewLog} required />
        <input type="date" name="date" value={newLogDateTime.date} onChange={handleChangeNewLogDateTime} required />
        <input type="time" name="time" value={newLogDateTime.time} onChange={handleChangeNewLogDateTime} required />
        <button onClick={addPerformanceLog}>Add Log</button>
      </div>

      <h3>Performance Logs</h3>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            House Number: {log.houseNumber}, Waste Type: {log.wasteType}, Days: {log.days}, Date: {log.date}, Time: {log.time}
            <button onClick={() => handleEdit(log)}>Edit</button>
            <button onClick={() => deletePerformanceLog(log._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editLog && (
        <div>
          <h3>Edit Log</h3>
          <div>
            <input type="text" name="houseNumber" value={editLog.houseNumber} onChange={handleChangeEditLog} required />
            <input type="text" name="wasteType" value={editLog.wasteType} onChange={handleChangeEditLog} required />
            <input type="number" name="days" value={editLog.days} onChange={handleChangeEditLog} required />
            <input type="date" name="date" value={editLogDateTime.date} onChange={handleChangeEditLogDateTime} required />
            <input type="time" name="time" value={editLogDateTime.time} onChange={handleChangeEditLogDateTime} required />
            <button onClick={updatePerformanceLog}>Update Log</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceLogManager;
