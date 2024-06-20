import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const RecyclingDashboard = () => {
  const [recyclingLog, setRecyclingLog] = useState([]);
  const [sortedLog, setSortedLog] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [materialType, setMaterialType] = useState("");
  const [amount, setAmount] = useState("");

  const fetchRecyclingLog = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/household/recycling-log",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const sortedData = response.data.slice();
      setRecyclingLog(response.data);
      setSortedLog(sortedData);
    } catch (error) {
      console.error("Error fetching recycling log:", error);
    }
  };

  const sortTable = (key, direction) => {
    const sortedData = [...recyclingLog].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedLog(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    const [key, direction] = value.split("-");
    sortTable(key, direction);
  };

  const addRecyclingLogEntry = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/household/recycling-log",
        {
          materialType,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchRecyclingLog();
      setMaterialType("");
      setAmount("");
    } catch (error) {
      console.error("Error adding recycling log entry:", error);
    }
  };

  const deleteRecyclingLogEntry = async (entryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/household/recycling-log/${entryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchRecyclingLog();
    } catch (error) {
      console.error(
        `Error deleting recycling log entry with ID ${entryId}:`,
        error
      );
    }
  };

  const editRecyclingLogEntry = async (entryId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/household/recycling-log/${entryId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchRecyclingLog(); // Fetch updated log after editing
    } catch (error) {
      console.error(
        `Error editing recycling log entry with ID ${entryId}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchRecyclingLog();
  }, []);

  useEffect(() => {
    sortTable(sortConfig.key, sortConfig.direction);
  }, [recyclingLog]);

  return (
    <div className="p-4 min-w-full">
      <div className="max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4">Recycling Log Entry</h2>
          <form onSubmit={addRecyclingLogEntry} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 items-center">
              <div className="flex-1">
                <label
                  htmlFor="materialType"
                  className="block mb-2 font-semibold"
                >
                  Material Type:
                </label>
                <input
                  type="text"
                  id="materialType"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="amount" className="block mb-2 font-semibold">
                  Amount (lbs/kg):
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex-1">
                <button
                  type="submit"
                  className="w-full py-2 mt-8 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:bg-green-500"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10 rounded-lg border border-green-500 shadow-lg p-5 ">
          <h2 className="text-2xl font-bold mb-4">Recycling Log</h2>
          <div className="flex items-center mb-4">
            <h3 className="font-semibold mr-2">Sort by:</h3>
            <select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={handleSortChange}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="materialType-asc">Material Type (A-Z)</option>
              <option value="materialType-desc">Material Type (Z-A)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="date-asc">Date & Time (Oldest First)</option>
              <option value="date-desc">Date & Time (Newest First)</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full  ">
              <thead>
                <tr className="gap-5">
                  <th>No</th>
                  <th>Material Type</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedLog.map((entry, index) => (
                  <tr key={entry._id} className="text-center">
                    <td>{index + 1}</td>
                    <td className="py-2 px-4 border-b">{entry.materialType}</td>
                    <td className="py-2 px-4 border-b">{entry.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(entry.date).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => editRecyclingLogEntry(entry._id, {})}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        onClick={() => deleteRecyclingLogEntry(entry._id)}
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
    </div>
  );
};

export default RecyclingDashboard;
