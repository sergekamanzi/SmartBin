import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Apis/api";
import Swal from "sweetalert2";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    userType: "household",
    companyName: "",
    serviceArea: "",
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      city,
      state,
      postalCode,
      userType,
      companyName,
      serviceArea,
    } = formData;

    try {
      const response = await registerUser({
        name,
        email,
        password,
        phoneNumber,
        address,
        city,
        state,
        postalCode,
        userType,
        companyName,
        serviceArea,
      });

      // Show success alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 3000,
      });

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-min w-1/2  bg-[#fff] p-8 rounded-r-3xl shadow-2xl"
    >
      <h2 className="text-5xl font-bold mb-6 ">Create account</h2>

      {/* Form fields here */}
      <div className="flex gap-5">
        <label className="block mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="Full name"
          />
        </label>
        <label className="block mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1  w-full rounded-md bg-[#eee] shadow-sm  pl-2 py-2"
            placeholder="Email"
          />
        </label>
      </div>
      <div className="flex gap-5 ">
        <label className="block mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="Password"
          />
        </label>
        <label className="block mb-4">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="Confirm Password"
          />
        </label>
      </div>
      <div className="flex gap-5 ">
        <label className="block mb-4">
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="Phone Number"
          />
        </label>
        <label className="block mb-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="Adress"
          />
        </label>
      </div>
      <div className="flex gap-5 ">
        <label className="block mb-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="City"
          />
        </label>
        <label className="block mb-4">
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
            placeholder="State"
          />
        </label>
      </div>

      <label className="block mb-4">
        <span className="block text-gray-700">User Type</span>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="mt-1 block w-1/2 rounded-md bg-[#eee] shadow-sm py-2 pl-2"
        >
          <option value="household">Household User</option>
          <option value="waste-collection">
            Waste Collection Service Company
          </option>
        </select>
      </label>
      {formData.userType === "waste-collection" && (
        <>
          <div className="flex gap-5 ">
            <label className="block mb-4">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
                placeholder="Company Name"
              />
            </label>
            <label className="block mb-4">
              <input
                type="text"
                name="serviceArea"
                value={formData.serviceArea}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-[#eee] shadow-sm py-2 pl-2"
                placeholder="Service Area"
              />
            </label>
          </div>
        </>
      )}
      <label className="block mb-4">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <span className="text-gray-700">
          I agree to the terms and conditions
        </span>
      </label>
      <button
        type="submit"
        className="w-3/4 bg-[#37af65] text-white py-2 rounded-lg hover:bg-[#3b684c]"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
