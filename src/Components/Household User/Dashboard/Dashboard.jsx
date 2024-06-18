import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        // Assuming 'usertype' is a variable holding the user's type (e.g., 'household', 'admin', etc.)
        const usertype = 'household'; // Replace with your logic to get the user type

        const response = await axios.get(
          `http://localhost:5000/api/${usertype}/profile/`,
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
        setError("Error fetching user profile. Please try again later."); // Set error state
        setLoading(false); // Ensure loading state is updated even in case of error
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
    return <div>No user data available</div>;
  }

  return (
    <div className=" bg-[#eeeeee] p-8  mt-6">
      <p className="text-3xl font-bold ">Welcome {user.username}</p>
    </div>
  );
};

export default Dashboard;
