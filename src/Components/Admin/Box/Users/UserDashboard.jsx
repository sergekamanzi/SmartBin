// src/UserDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [householdCount, setHouseholdCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve token and userType from localStorage
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || !userType) {
      // Handle case where token or userType is missing
      setError("User not authenticated. Please log in.");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { householdUsers, services } = response.data;

        setHouseholdCount(householdUsers.length);
        setServiceCount(services.length);

        // Check if logged-in user is admin based on userType
        if (userType === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in.");
        } else {
          setError("An error occurred while fetching users.");
        }
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Number of Household Users: {householdCount}</p>
      <p>Number of Waste Collection Service Users: {serviceCount}</p>
      {isAdmin && (
        <p style={{ color: "green" }}>You are logged in as an admin.</p>
      )}
    </div>
  );
};

export default UserDashboard;
