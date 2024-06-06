import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Store the token in localStorage or cookies
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>

      <label className="block mb-4">
        <span className="block text-gray-700">Email Address</span>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="example@example.com" />
      </label>

      <label className="block mb-4">
        <span className="block text-gray-700">Password</span>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="••••••••" />
      </label>

      <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
