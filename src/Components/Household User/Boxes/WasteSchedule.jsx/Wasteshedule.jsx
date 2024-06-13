import React, { useState } from "react";
import Swal from "sweetalert2";

const WasteCollectionSchedule = () => {
  const [formData, setFormData] = useState({
    address: "",
    pickupDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Here you would send formData to your backend to schedule the waste collection.
      console.log("Scheduling waste collection:", formData);

      // Show success alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Waste collection scheduled!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Clear form after successful submission
      setFormData({
        address: "",
        pickupDate: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Schedule Waste Collection</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="block text-gray-700">Address</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="123 Main St"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </label>
        <label className="block mb-4">
          <span className="block text-gray-700">Pickup Date</span>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              errors.pickupDate ? "border-red-500" : ""
            }`}
          />
          {errors.pickupDate && (
            <span className="text-red-500 text-sm">{errors.pickupDate}</span>
          )}
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Schedule Pickup
        </button>
      </form>
    </div>
  );
};

export default WasteCollectionSchedule;
