import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecyclingDashboard = () => {
  const [recyclingLog, setRecyclingLog] = useState([]);
  const [materialType, setMaterialType] = useState('');
  const [amount, setAmount] = useState('');

  // Function to fetch recycling log data from the server
  const fetchRecyclingLog = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/household/recycling-log', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecyclingLog(response.data);
    } catch (error) {
      console.error('Error fetching recycling log:', error);
    }
  };

  // Function to handle adding a new recycling log entry
  const addRecyclingLogEntry = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/household/recycling-log',
        {
          materialType,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // After adding the entry, fetch the updated log
      await fetchRecyclingLog();
      // Reset form fields
      setMaterialType('');
      setAmount('');
    } catch (error) {
      console.error('Error adding recycling log entry:', error);
    }
  };

  // Fetch recycling log data when component mounts
  useEffect(() => {
    fetchRecyclingLog();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recycling Log</h2>
        <ul className="space-y-4">
          {recyclingLog.map((entry) => (
            <li key={entry._id} className="border border-gray-200 p-4 rounded">
              <p className="font-semibold">Material Type: {entry.materialType}</p>
              <p>Amount: {entry.amount}</p>
              <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Add Recycling Log Entry</h2>
        <form onSubmit={addRecyclingLogEntry} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="materialType">
              Material Type:
            </label>
            <input
              id="materialType"
              type="text"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="amount">
              Amount:
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecyclingDashboard;
