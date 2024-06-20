import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { FaCirclePlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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

  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    fetchPerformanceLogs();
  }, []);

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
      const response = await axios.delete(
        `http://localhost:5000/api/service/${userId}/performance-logs/${logId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", response.data.message, "success");
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
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-bold mb-4">Performance Log Manager</h2>
      <div className="flex items-center flex-col md:flex-row items-start space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 px-4">
          <h3 className="text-xl font-semibold mb-2">Add New Log</h3>
          <div className="shadow-xl rounded-xl bg-white p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="houseNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  House Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  placeholder="Enter House Number"
                  value={newLog.houseNumber}
                  onChange={handleChangeNewLog}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Waste Type
                </label>
                <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="wasteType"
                      value="General"
                      checked={newLog.wasteType.includes("General")}
                      onChange={(e) => handleCheckboxChange(e, "General")}
                      className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900">General</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="wasteType"
                      value="Organic"
                      checked={newLog.wasteType.includes("Organic")}
                      onChange={(e) => handleCheckboxChange(e, "Organic")}
                      className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900">Organic</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="wasteType"
                      value="Recyclables"
                      checked={newLog.wasteType.includes("Recyclables")}
                      onChange={(e) => handleCheckboxChange(e, "Recyclables")}
                      className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900">Recyclables</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col md:-mt-5">
                <label
                  htmlFor="days"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Day
                </label>
                <select
                  id="days"
                  name="days"
                  value={newLog.days}
                  onChange={handleChangeNewLog}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newLogDateTime.date}
                  onChange={handleChangeNewLogDateTime}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div className="flex flex-col md:-mt-6">
                <label
                  htmlFor="time"
                  className="text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newLogDateTime.time}
                  onChange={handleChangeNewLogDateTime}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              onClick={addPerformanceLog}
              className="btn text-green-500 text-5xl px-4 py-2 mt-4 md:ml-64 md:-mt-20"
            >
              <FaCirclePlus />
            </button>
          </div>
        </div>

        {editLog && (
          <div className="w-full md:w-1/2 px-4">
            <h3 className="text-xl font-semibold mb-4">Edit Log</h3>
            <div className="shadow-xl rounded-xl bg-white p-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="editHouseNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    House Number
                  </label>
                  <input
                    type="text"
                    id="editHouseNumber"
                    name="houseNumber"
                    value={editLog.houseNumber}
                    onChange={handleChangeEditLog}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Waste Type
                  </label>
                  <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="wasteType"
                        value="General"
                        checked={editLog.wasteType.includes("General")}
                        onChange={(e) =>
                          handleCheckboxChange(e, "General", true)
                        }
                        className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-900">General</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="wasteType"
                        value="Organic"
                        checked={editLog.wasteType.includes("Organic")}
                        onChange={(e) =>
                          handleCheckboxChange(e, "Organic", true)
                        }
                        className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-900">Organic</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="wasteType"
                        value="Recyclables"
                        checked={editLog.wasteType.includes("Recyclables")}
                        onChange={(e) =>
                          handleCheckboxChange(e, "Recyclables", true)
                        }
                        className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-900">Recyclables</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="editDays"
                    className="text-sm font-medium text-gray-700"
                  >
                    Days
                  </label>
                  <input
                    type="number"
                    id="editDays"
                    name="days"
                    value={editLog.days}
                    onChange={handleChangeEditLog}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="editDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="editDate"
                    name="date"
                    value={editLogDateTime.date}
                    onChange={handleChangeEditLogDateTime}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="editTime"
                    className="text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="editTime"
                    name="time"
                    value={editLogDateTime.time}
                    onChange={handleChangeEditLogDateTime}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex -mt-10 ml-72">
                <button
                  onClick={updatePerformanceLog}
                  className="btn bg-green-500 text-white px-4 py-2 mr-2"
                >
                  Update Log
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn bg-gray-300 text-gray-800 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto mt-5">
        <div className="align-middle inline-block min-w-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
                    <div className="text-sm text-gray-900">
                      {log.houseNumber}
                    </div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                    <button
                      onClick={() => handleEdit(log)}
                      className="text-green-600 hover:text-green-900 "
                    >
                     <MdEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deletePerformanceLog(log._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceLogManager;
