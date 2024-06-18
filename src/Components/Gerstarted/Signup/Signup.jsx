import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HouseholdUserSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    street: "",
    phonenumber: "", // Changed to match the state variable
    district: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup/household", formData);
      alert("Account registered successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        street: "",
        phonenumber: "",
        district: "",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to register household user");
    }
  };

  return (
    <div className="min-w-min w-1/2  bg-[#fff] p-8 rounded-r-3xl shadow-2xl">
      <h2 className="text-5xl font-bold mb-6">Create account</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
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
        </div>
        <div className="flex gap-5">
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
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              House number
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            />
          </div>

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
        </div>
        <button
          type="submit"
          className="w-3/4 bg-[#37af65] text-white py-2 rounded-lg hover:bg-[#3b684c] mb-5"
        >
          Sign Up
        </button>
        <p>
          Sign up as a Company? <a href="/SignupCompany">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default HouseholdUserSignup;
