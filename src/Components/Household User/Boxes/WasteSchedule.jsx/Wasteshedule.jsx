import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WasteCollectionSchedule = () => {
  const [formData, setFormData] = useState({
    address: '',
    pickupDate: '',
    district: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        'http://localhost:5000/api/schedule',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Waste collection scheduled:', response.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Waste collection scheduled!',
        showConfirmButton: false,
        timer: 2000,
      });
      setFormData({ address: '', pickupDate: '', district: '' });
      setErrors({});
    } catch (error) {
      console.error('Error scheduling waste collection:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to schedule waste collection. Please try again.',
      });
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.address) newErrors.address = "Address is required";
    if (!data.pickupDate) newErrors.pickupDate = "Pickup Date is required";
    if (!data.district) newErrors.district = "District is required";
    return newErrors;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Schedule Waste Collection</h2>
      <form onSubmit={handleSubmit}>
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
        <label className="block mb-4">
          <span className="block text-gray-700">District</span>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              errors.district ? "border-red-500" : ""
            }`}
            placeholder="Enter district"
          />
          {errors.district && (
            <span className="text-red-500 text-sm">{errors.district}</span>
          )}
        </label>
        <label className="block mb-4">
          <span className="block text-gray-700">House Number</span>
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
