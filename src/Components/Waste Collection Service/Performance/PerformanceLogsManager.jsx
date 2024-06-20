import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';
const getUserIdFromToken = (token) => {
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
};

const PerformanceLogManager = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    houseNumber: "",
    wasteType: [],
    days: "",
    date: "",
    time: "",
  });
  const [editLog, setEditLog] = useState(null);
  const [newLogDateTime, setNewLogDateTime] = useState({ date: "", time: "" });
  const [editLogDateTime, setEditLogDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchPerformanceLogs();
  }, []);

  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  const fetchPerformanceLogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/service/${userId}/performance-logs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching performance logs:", error);
    }
  };

  const addPerformanceLog = async () => {
    try {
      const { date, time, ...rest } = newLog;
      const newLogData = {
        ...rest,
        wasteType: newLog.wasteType.join(", "),
        date,
        time,
      };

      await axios.post(
        `http://localhost:5000/api/service/${userId}/performance-logs`,
        newLogData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Performance log added successfully!", "success");
      fetchPerformanceLogs();
      resetNewLog();
    } catch (error) {
      Swal.fire("Error", "Error adding performance log", "error");
      console.error("Error adding performance log:", error);
    }
  };

  const updatePerformanceLog = async () => {
    try {
      const { date, time, ...rest } = editLog;
      const editLogData = {
        ...rest,
        wasteType: editLog.wasteType.join(", "),
        date,
        time,
      };

      await axios.put(
        `http://localhost:5000/api/service/${userId}/performance-logs/${editLog._id}`,
        editLogData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Performance log updated successfully!", "success");
      fetchPerformanceLogs();
      resetEditLog();
    } catch (error) {
      Swal.fire("Error", "Error updating performance log", "error");
      console.error("Error updating performance log:", error);
    }
  };

  const deletePerformanceLog = async (logId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/service/${userId}/performance-logs/${logId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Performance log deleted successfully!", "success");
      fetchPerformanceLogs();
    } catch (error) {
      Swal.fire("Error", "Error deleting performance log", "error");
      console.error("Error deleting performance log:", error);
    }
  };

  const handleEdit = (log) => {
    setEditLog({ ...log, wasteType: [...log.wasteType] });
    setEditLogDateTime({ date: log.date, time: log.time });
  };

  const handleCancelEdit = () => {
    resetEditLog();
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

  const handleCheckboxChange = (e, type, isEdit = false) => {
    const { checked, value } = e.target;
    const updatedWasteType = checked
      ? [...(isEdit ? editLog.wasteType : newLog.wasteType), value]
      : (isEdit ? editLog.wasteType : newLog.wasteType).filter(
          (wt) => wt !== value
        );

    isEdit
      ? setEditLog((prevLog) => ({ ...prevLog, wasteType: updatedWasteType }))
      : setNewLog((prevLog) => ({ ...prevLog, wasteType: updatedWasteType }));
  };

  const resetNewLog = () => {
    setNewLog({
      houseNumber: "",
      wasteType: [],
      days: "",
      date: "",
      time: "",
    });
    setNewLogDateTime({ date: "", time: "" });
  };

  const resetEditLog = () => {
    setEditLog(null);
    setEditLogDateTime({ date: "", time: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Performance Log Manager</h2>

      <h3 className="text-xl font-semibold mb-2">Add New Log</h3>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={newLog.houseNumber}
            onChange={handleChangeNewLog}
            required
            className="input"
          />
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                name="wasteType"
                value="General"
                checked={newLog.wasteType.includes("General")}
                onChange={(e) => handleCheckboxChange(e, "General")}
                className="mr-2"
              />
              General
            </label>
            <label>
              <input
                type="checkbox"
                name="wasteType"
                value="Organic"
                checked={newLog.wasteType.includes("Organic")}
                onChange={(e) => handleCheckboxChange(e, "Organic")}
                className="mr-2"
              />
              Organic
            </label>
            <label>
              <input
                type="checkbox"
                name="wasteType"
                value="Recyclables"
                checked={newLog.wasteType.includes("Recyclables")}
                onChange={(e) => handleCheckboxChange(e, "Recyclables")}
                className="mr-2"
              />
              Recyclables
            </label>
          </div>
          <select
            name="days"
            value={newLog.days}
            onChange={handleChangeNewLog}
            required
            className="input"
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <input
            type="date"
            name="date"
            value={newLogDateTime.date}
            onChange={handleChangeNewLogDateTime}
            required
            className="input"
          />
          <input
            type="time"
            name="time"
            value={newLogDateTime.time}
            onChange={handleChangeNewLogDateTime}
            required
            className="input"
          />
        </div>
        <button onClick={addPerformanceLog} className="btn mt-4">
          Add Log
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Performance Logs</h3>
      <ul className="divide-y divide-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                House Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Waste Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Days
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.houseNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {Array.isArray(log.wasteType)
                      ? log.wasteType.join(", ")
                      : log.wasteType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.days}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {moment(log.date).format("YYYY-MM-DD")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(log)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deletePerformanceLog(log._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>

      {editLog && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Edit Log</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="houseNumber"
              value={editLog.houseNumber}
              onChange={handleChangeEditLog}
              required
              className="input"
            />
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="checkbox"
                  name="wasteType"
                  value="General"
                  checked={editLog.wasteType.includes("General")}
                  onChange={(e) => handleCheckboxChange(e, "General", true)}
                  className="mr-2"
                />
                General
              </label>
              <label>
                <input
                  type="checkbox"
                  name="wasteType"
                  value="Organic"
                  checked={editLog.wasteType.includes("Organic")}
                  onChange={(e) => handleCheckboxChange(e, "Organic", true)}
                  className="mr-2"
                />
                Organic
              </label>
              <label>
                <input
                  type="checkbox"
                  name="wasteType"
                  value="Recyclables"
                  checked={editLog.wasteType.includes("Recyclables")}
                  onChange={(e) => handleCheckboxChange(e, "Recyclables", true)}
                  className="mr-2"
                />
                Recyclables
              </label>
            </div>
            <input
              type="number"
              name="days"
              value={editLog.days}
              onChange={handleChangeEditLog}
              required
              className="input"
            />
            <input
              type="date"
              name="date"
              value={editLogDateTime.date}
              onChange={handleChangeEditLogDateTime}
              required
              className="input"
            />
            <input
              type="time"
              name="time"
              value={editLogDateTime.time}
              onChange={handleChangeEditLogDateTime}
              required
              className="input"
            />
          </div>
          <div className="flex mt-4">
            <button
              onClick={updatePerformanceLog}
              className="btn btn-update mr-2"
            >
              Update Log
            </button>
            <button onClick={handleCancelEdit} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceLogManager;
