import React, { useState } from "react";
import Swal from "sweetalert2";

const RecyclingTracker = () => {
  const [recyclingData, setRecyclingData] = useState({
    plastic: 0,
    paper: 0,
    glass: 0,
    metal: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecyclingData({ ...recyclingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the recycling data
    console.log("Recycling data:", recyclingData);

    // Show success alert
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Recycling data saved successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    // Clear the form
    setRecyclingData({ plastic: 0, paper: 0, glass: 0, metal: 0 });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-8 transition-transform transform ">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">Recycling Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Plastic (kg)", name: "plastic" },
          { label: "Paper (kg)", name: "paper" },
          { label: "Glass (kg)", name: "glass" },
          { label: "Metal (kg)", name: "metal" }
        ].map(({ label, name }) => (
          <label key={name} className="block">
            <span className="block text-gray-700">{label}</span>
            <input
              type="number"
              name={name}
              value={recyclingData[name]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500  text-white py-2 rounded-lg hover:from-green-500 hover:to-blue-600 transition-colors duration-200"
        >
          Save Recycling Data
        </button>
      </form>
    </div>
  );
};

export default RecyclingTracker;
