import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const WasteCollectionSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    wasteType: [],
    schedule: '',
    latitude: null,
    longitude: null
  });
  const [editMode, setEditMode] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/household/schedules', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch schedules. Please try again.'
        });
      }
    };

    fetchSchedules();
  }, []);

  // Function to fetch user's current location
  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude,
          longitude
        }));
      },
      (error) => {
        console.error('Error getting user location:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch your location. Please allow location access.'
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'wasteType') {
      setFormData((prevFormData) => {
        if (checked) {
          return { ...prevFormData, wasteType: [...prevFormData.wasteType, value] };
        } else {
          return {
            ...prevFormData,
            wasteType: prevFormData.wasteType.filter((type) => type !== value)
          };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editMode
        ? `http://localhost:5000/api/household/schedules/${currentScheduleId}`
        : 'http://localhost:5000/api/household/schedules';

      const method = editMode ? 'put' : 'post';

      // Include latitude and longitude in dataToSend
      const dataToSend = {
        ...formData
      };

      const response = await axios[method](url, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSchedules((prevSchedules) => {
        if (editMode) {
          return prevSchedules.map((schedule) =>
            schedule._id === currentScheduleId ? response.data : schedule
          );
        } else {
          return [...prevSchedules, response.data];
        }
      });

      setFormData({ wasteType: [], schedule: '', latitude: null, longitude: null });
      setEditMode(false);
      setCurrentScheduleId(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Schedule saved successfully'
      });
    } catch (error) {
      console.error('Error saving schedule:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save schedule. Please try again.'
      });
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      wasteType: Array.isArray(schedule.wasteType) ? schedule.wasteType : [],
      schedule: schedule.schedule,
      latitude: schedule.latitude,
      longitude: schedule.longitude
    });
    setEditMode(true);
    setCurrentScheduleId(schedule._id);
  };

  const handleDelete = async (scheduleId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/household/schedules/${scheduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule._id !== scheduleId));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Schedule deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting schedule:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete schedule. Please try again.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Waste Collection Schedules</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-4">
          <span>Select Waste Types:</span>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="wasteType"
                value="general"
                checked={formData.wasteType.includes('general')}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">General</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="wasteType"
                value="recyclables"
                checked={formData.wasteType.includes('recyclables')}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Recyclables</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="wasteType"
                value="organic"
                checked={formData.wasteType.includes('organic')}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Organic</span>
            </label>
          </div>
        </label>

        <label className="block mb-4">
          <span>Schedule:</span>
          <select
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
            required
          >
            <option value="">Select Schedule</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        <button type="button" onClick={fetchUserLocation} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
          Fetch Location
        </button>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-2">
          {editMode ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </form>

      <ul>
        {schedules.map((schedule) => (
          <li key={schedule._id} className="mb-4 p-4 border rounded-lg shadow">
            <p><strong>Waste Type:</strong> {Array.isArray(schedule.wasteType) ? schedule.wasteType.join(', ') : ''}</p>
            <p><strong>Schedule:</strong> {schedule.schedule}</p>
            <button onClick={() => handleEdit(schedule)} className="bg-blue-500 text-white py-2 px-4 rounded mt-2 mr-2">
              Edit
            </button>
            <button onClick={() => handleDelete(schedule._id)} className="bg-red-500 text-white py-2 px-4 rounded mt-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteCollectionSchedule;
