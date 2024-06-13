import React, { useState } from "react";
import Swal from "sweetalert2";

const RouteManagement = () => {
  const [routeData, setRouteData] = useState({
    routeName: "",
    startDate: "",
    endDate: "",
    schedule: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
  };

  const handleScheduleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSchedule = [...routeData.schedule];
    updatedSchedule[index][name] = value;
    setRouteData({ ...routeData, schedule: updatedSchedule });
  };

  const handleAddStop = () => {
    setRouteData({
      ...routeData,
      schedule: [...routeData.schedule, { location: "", time: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the route data
    console.log("Route data:", routeData);

    // Show success alert
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Route data saved successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    // Clear the form
    setRouteData({ routeName: "", startDate: "", endDate: "", schedule: [] });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6">Route Management</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="block text-gray-700">Route Name</span>
          <input
            type="text"
            name="routeName"
            value={routeData.routeName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-gray-700">Start Date</span>
          <input
            type="date"
            name="startDate"
            value={routeData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-gray-700">End Date</span>
          <input
            type="date"
            name="endDate"
            value={routeData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        <h3 className="text-xl font-semibold mb-4">Schedule</h3>
        {routeData.schedule.map((stop, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="location"
              value={stop.location}
              onChange={(e) => handleScheduleChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Location"
            />
            <input
              type="time"
              name="time"
              value={stop.time}
              onChange={(e) => handleScheduleChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStop}
          className="mb-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
        >
          Add Stop
        </button>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
        >
          Save Route
        </button>
      </form>
    </div>
  );
};

export default RouteManagement;
