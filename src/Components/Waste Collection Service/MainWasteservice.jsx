import React, { useState, useEffect } from "react";
import axios from "axios";

const MainWasteservice = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(
          `"http://localhost:5000/api/service/profile"`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching user profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No Name available</div>;
  }

  return (
    <div className="h-screen flex">
      <div className="flex-1 p-6">
        <p className="text-3xl font-bold">{user.serviceName}</p>
        <h1 className="text-2xl font-semibold mb-6">Waste Collection Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-2">
              Waste Collection Schedule
            </h5>
            <p className="text-gray-700 mb-4">
              Manage your waste collection schedules.
            </p>
            <a href="/schedule" className="text-green-600 hover:underline">
              View Schedules
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-2">Route Management</h5>
            <p className="text-gray-700 mb-4">
              Manage and optimize your collection routes.
            </p>
            <a href="#" className="text-green-500 hover:underline">
              Manage Routes
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-2">Performance Tracking</h5>
            <p className="text-gray-700 mb-4">
              Track and analyze the performance of your services.
            </p>
            <a href="#" className="text-green-500 hover:underline">
              Track Performance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWasteservice;
