import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WasteCollectionServiceSignup = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    contactPerson: "",
    email: "",
    contactPhone: "",
    district: "",
    password: "",
    serviceArea: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup/service", formData);
      alert("Account registered successfully!");
      setFormData({
        serviceName: "",
        contactPerson: "",
        email: "",
        contactPhone: "",
        district: "",
        password: "",
        serviceArea: "",
      });

      navigate("/login"); 
    } catch (error) {
      console.error(error);
      alert("Failed to register waste collection service");
    }
  };

  return (
    <div className="min-w-min w-1/2  bg-[#fff] p-8 rounded-r-3xl shadow-2xl">
      <h2 className="text-5xl font-bold mb-6">
        Create account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="serviceName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Phone
            </label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-3/4 bg-[#37af65] text-white py-2 rounded-lg hover:bg-[#3b684c]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default WasteCollectionServiceSignup;
