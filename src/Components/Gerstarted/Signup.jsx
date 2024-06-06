import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    userType: 'household',
    companyName: '',
    serviceArea: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
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
      const response = await axios.post('http://localhost:5000/api/users/register', {
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
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

      {/* Form fields here */}
      <label className="block mb-4">
        <span className="block text-gray-700">Full Name</span>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="John Doe" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Email Address</span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="example@example.com" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Password</span>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="••••••••" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Confirm Password</span>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="••••••••" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Phone Number</span>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="(123) 456-7890" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Address</span>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="123 Main St" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">City</span>
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="City" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">State</span>
        <input type="text" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="State" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">Postal Code</span>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Postal Code" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700">User Type</span>
        <select name="userType" value={formData.userType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="household">Household User</option>
          <option value="waste-collection">Waste Collection Service Company</option>
        </select>
      </label>
      {formData.userType === 'waste-collection' && (
        <>
          <label className="block mb-4">
            <span className="block text-gray-700">Company Name</span>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Company Name" />
          </label>
          <label className="block mb-4">
            <span className="block text-gray-700">Service Area</span>
            <input type="text" name="serviceArea" value={formData.serviceArea} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Service Area" />
          </label>
        </>
      )}
      <label className="block mb-4">
        <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="mr-2 leading-tight" />
        <span className="text-gray-700">I agree to the terms and conditions</span>
      </label>
      <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
