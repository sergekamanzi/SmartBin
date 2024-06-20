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
    contactPerson: '', 
    contactEmail: '', 
    serviceArea: '', 
    contactPhone: '', 
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
     
        if (userType === 'household') {
          setFormData({
            username: response.data.username,
            email: response.data.email,
            street: response.data.street,
            district: response.data.district,
            phonenumber: response.data.phonenumber,
            
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
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-8">No user data available</div>;
  }

  return (
    <div className=" bg-white ml-8 pl-5 rounded-lg shadow-2xl mt-8 mb-20 w-[500px]   ">
      <h2 className="text-3xl font-semibold my-6 ">Profile</h2>

      {!editMode ? (
        <div className="space-y-4">
          <ProfileField label="Username" value={user.username} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Street" value={user.street} />
          <ProfileField label="District" value={user.district} />
          <ProfileField label="Phone Number" value={user.phonenumber} />
          
          <div className="">
            <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <ProfileInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <ProfileInput
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
          />
          <ProfileInput
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            required
          />
          <ProfileInput
            label="Phone Number"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          

          <div className="flex justify-center">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-4">
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <p className="font-semibold">{label}:</p>
    <p>{value}</p>
  </div>
);

const ProfileInput = ({ label, name, value, onChange, placeholder, required }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
    />
  </div>
);

export default Profile;
