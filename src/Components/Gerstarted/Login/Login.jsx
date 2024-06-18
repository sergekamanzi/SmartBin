import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);

      const userType = response.data.userType;

      if (userType === "service") {
        navigate("/dashboard");
      } else if (userType === "household") {
        navigate("/home");
      } else if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error.response.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 bg-gray-50 p-8 rounded-l-3xl shadow-lg"
    >
      <a href="/">
        <p className="text-3xl text-center font-bold">
          Smart <span className="font-light">Bin</span>{" "}
          <span className="text-[#37af65] text-7xl -ml-1">.</span>{" "}
        </p>
      </a>
      <h1 className="text-3xl my-6 text-center">Welcome Back</h1>
      <h2 className="text-xl font-light my-6 text-center">Login with email</h2>

      <label className="block mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm py-2 px-2 my-6"
          placeholder="Email"
          required
        />
      </label>

      <label className="block mb-4">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-3/4 rounded-md my-6 border-gray-300 shadow-sm py-2 px-2"
          placeholder="Password"
          required
        />
      </label>
      <a href="/" className="underline block mb-4 hover:text-[#37af65]">
        Forgot Password
      </a>

      <button
        type="submit"
        className="w-3/4 bg-[#37af65] text-white py-2 rounded-lg hover:bg-[#59a173]"
      >
        Login
      </button>
      <div className="flex gap-2 mt-5 ml-16">
        <p>Don't have an account yet?</p>
        <a href="/signup" className="underline block mb-4 hover:text-[#37af65]">
          Signup
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
