import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceProfile = () => {
  const [service, setService] = useState({
    serviceName: '',
    contactPerson: '',
    email: '',
    contactPhone: '',
    district: '',
    password: '',
  });
  const [editMode, setEditMode] = useState(false); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    
    const fetchServiceProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service/profile', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }); 
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service profile:', error);
      }
    };

    fetchServiceProfile();
  }, [token]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5000/api/service/profile',
        service,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ); 
      console.log('Updated service profile:', response.data);
      setEditMode(false); 
      
    } catch (error) {
      console.error('Error updating service profile:', error);
      
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className=" p-8">
      <h2 className="text-2xl font-bold mb-4">Service Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Service Name:</label>
            <input
              type="text"
              name="serviceName"
              value={service.serviceName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Contact Person:</label>
            <input
              type="text"
              name="contactPerson"
              value={service.contactPerson}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={service.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Contact Phone:</label>
            <input
              type="text"
              name="contactPhone"
              value={service.contactPhone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">District:</label>
            <input
              type="text"
              name="district"
              value={service.district}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p>
            <strong>Service Name:</strong> {service.serviceName}
          </p>
          <p>
            <strong>Contact Person:</strong> {service.contactPerson}
          </p>
          <p>
            <strong>Email:</strong> {service.email}
          </p>
          <p>
            <strong>Contact Phone:</strong> {service.contactPhone}
          </p>
          <p>
            <strong>District:</strong> {service.district}
          </p>
          <button
            onClick={toggleEditMode}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceProfile;
