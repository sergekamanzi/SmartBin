import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [householdUsers, setHouseholdUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    street: "",
    district: "",
    phonenumber: "",
    contactPerson: "", // Only for service type
  });
  const [services, setServices] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [userType, setUserType] = useState("household");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { householdUsers, services, admins } = response.data;
      setHouseholdUsers(householdUsers);
      setServices(services);
      setAdmins(admins);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.message || "Error fetching users");
    }
  };

  const handleChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const loggedUserType = localStorage.getItem("userType");

      if (!token || !loggedUserType) {
        throw new Error("Token or user type not found");
      }

      if (loggedUserType !== "admin") {
        throw new Error("Unauthorized access: Only admins can create users");
      }

      let url = "";
      let data = {};

      if (userType === "household") {
        url = "http://localhost:5000/api/signup/household";
        data = {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          street: newUser.street,
          district: newUser.district,
          phonenumber: newUser.phonenumber,
        };
      } else if (userType === "service") {
        url = "http://localhost:5000/api/signup/service";
        data = {
          serviceName: newUser.username,
          contactPerson: newUser.contactPerson,
          email: newUser.email,
          contactPhone: newUser.phonenumber,
          district: newUser.district,
          password: newUser.password,
        };
      }

      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewUser({
        username: "",
        email: "",
        password: "",
        street: "",
        district: "",
        phonenumber: "",
        contactPerson: "", // Reset contactPerson field after submission
      });
      fetchUsers();
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const url = `http://localhost:5000/api/admin/users/${userId}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchUsers(); // Fetch updated user list after deletion
        setError(null); // Clear any previous error messages
      } else {
        setError("Failed to delete user"); // Handle unexpected responses
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={() => {
          setCreateModalOpen(true);
          setUserType("household");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create New Household User
      </button>

      <button
        onClick={() => {
          setCreateModalOpen(true);
          setUserType("service");
        }}
        className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create New Waste Collection Service
      </button>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {userType === "household"
                ? "Create New Household User"
                : "Create New Waste Collection Service"}
            </h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  {userType === "household" ? "Username" : "Company Name"}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newUser.username}
                  onChange={handleChangeNewUser}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              {userType === "service" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="contactPerson"
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={newUser.contactPerson}
                    onChange={handleChangeNewUser}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  {userType === "household" ? "Email" : "Contact Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChangeNewUser}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChangeNewUser}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              {userType === "household" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="street"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={newUser.street}
                    onChange={handleChangeNewUser}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text                  -sm font-bold mb-2"
                  htmlFor="district"
                >
                  District
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={newUser.district}
                  onChange={handleChangeNewUser}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phonenumber"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value={newUser.phonenumber}
                  onChange={handleChangeNewUser}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Household Users</h2>
        <ul>
          {householdUsers.map((user) => (
            <li key={user._id} className="mb-4">
              <p className="text-lg font-semibold">{user.username}</p>
              <p>{user.email}</p>
              <p>
                {user.street}, {user.district}
              </p>
              <p>{user.phonenumber}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Waste Collection Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service._id} className="mb-4">
              <p className="text-lg font-semibold">{service.serviceName}</p>
              <p>{service.contactPerson}</p>
              <p>{service.email}</p>
              <p>{service.contactPhone}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteUser(service._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Admins</h2>
        <ul>
          {admins.map((admin) => (
            <li key={admin._id} className="mb-4">
              <p className="text-lg font-semibold">{admin.username}</p>
              <p>{admin.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;

