import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    street: '',
    district: '',
    phonenumber: '',
    contactPerson: '', // Additional fields for service company
    contactEmail: '', // Additional fields for service company
    serviceArea: [], // Additional fields for service company
    contactPhone: '', // Additional fields for service company
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType'); 

        if (!token || !userType) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`http://localhost:5000/api/${userType}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
        // Set formData based on userType
        if (userType === 'household') {
          setFormData({
            username: response.data.username,
            email: response.data.email,
            street: response.data.street,
            district: response.data.district,
            phonenumber: response.data.phonenumber,
            contactPerson: '', // Reset additional fields for service company
            contactEmail: '', // Reset additional fields for service company
            serviceArea: [], // Reset additional fields for service company
            contactPhone: '', // Reset additional fields for service company
          });
        } else if (userType === 'service') {
          setFormData({
            username: response.data.username,
            email: response.data.email,
            street: response.data.street,
            district: response.data.district,
            phonenumber: response.data.phonenumber,
            contactPerson: response.data.contactPerson,
            contactEmail: response.data.contactEmail,
            serviceArea: response.data.serviceArea,
            contactPhone: response.data.contactPhone,
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch user profile. Please log in again.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userType = localStorage.getItem('userType'); 
    
      if (!token || !userType) {
        throw new Error('User not authenticated');
      }

      const response = await axios.put(`http://localhost:5000/api/${userType}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(response.data);
      setEditMode(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update profile. Please try again.'
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      {!editMode ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Street:</strong> {user.street}</p>
          <p><strong>District:</strong> {user.district}</p>
          <p><strong>Phone Number:</strong> {user.phonenumber}</p>
          {user.userType === 'service' && (
            <>
              <p><strong>Contact Person:</strong> {user.contactPerson}</p>
              <p><strong>Contact Email:</strong> {user.contactEmail}</p>
              <p><strong>Service Area:</strong> {user.serviceArea.join(', ')}</p>
              <p><strong>Contact Phone:</strong> {user.contactPhone}</p>
            </>
          )}
          <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Username"
              required
            />
          </label>

          <label className="block mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Email"
              required
            />
          </label>

          <label className="block mb-4">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Street"
              required
            />
          </label>

          <label className="block mb-4">
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="District"
              required
            />
          </label>

          <label className="block mb-4">
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Phone Number"
              required
            />
          </label>

          {user.userType === 'service' && (
            <>
              <label className="block mb-4">
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
                  placeholder="Contact Person"
                  required
                />
              </label>

              <label className="block mb-4">
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
                  placeholder="Contact Email"
                  required
                />
              </label>

              <label className="block mb-4">
                <input
                  type="text"
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
                  placeholder="Service Area (comma-separated)"
                  required
                />
              </label>

              <label className="block mb-4">
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
                  placeholder="Contact Phone"
                  required
                />
              </label>
            </>
          )}

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-4">
            Save Changes
          </button>
          <button onClick={() => setEditMode(false)} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
