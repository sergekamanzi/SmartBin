import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdModeEdit, MdDelete } from "react-icons/md";
import ScheduleModal from "./ScheduleModal";

const WasteCollectionSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [sortedSchedules, setSortedSchedules] = useState([]);
  const [formData, setFormData] = useState({
    wasteType: [],
    schedule: "",
    latitude: null,
    longitude: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/household/schedules",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSchedules(response.data);
        setSortedSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch schedules. Please try again.",
        });
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const sorted = [...schedules].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortedSchedules(sorted);
  }, [schedules, sortOrder]);

  const fetchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error("Error getting user location:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch your location. Please allow location access.",
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "wasteType") {
      setFormData((prevFormData) => {
        if (checked) {
          return {
            ...prevFormData,
            wasteType: [...prevFormData.wasteType, value],
          };
        } else {
          return {
            ...prevFormData,
            wasteType: prevFormData.wasteType.filter((type) => type !== value),
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
      const token = localStorage.getItem("token");
      const url = editMode
        ? `http://localhost:5000/api/household/schedules/${currentScheduleId}`
        : "http://localhost:5000/api/household/schedules";
      const method = editMode ? "put" : "post";
      const dataToSend = { ...formData };
      const response = await axios[method](url, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      setFormData({
        wasteType: [],
        schedule: "",
        latitude: null,
        longitude: null,
      });
      setEditMode(false);
      setCurrentScheduleId(null);
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Schedule saved successfully",
      });
    } catch (error) {
      console.error("Error saving schedule:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save schedule. Please try again.",
      });
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      wasteType: Array.isArray(schedule.wasteType) ? schedule.wasteType : [],
      schedule: schedule.schedule,
      latitude: schedule.latitude,
      longitude: schedule.longitude,
    });
    setEditMode(true);
    setCurrentScheduleId(schedule._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (scheduleId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/household/schedules/${scheduleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== scheduleId)
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Schedule deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting schedule:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete schedule. Please try again.",
      });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const openModal = () => {
    setEditMode(false);
    setCurrentScheduleId(null);
    setFormData({
      wasteType: [],
      schedule: "",
      latitude: null,
      longitude: null,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Waste Collection Schedules</h2>
      <button
        onClick={openModal}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Schedule
      </button>

      <div>
        
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Waste Type</th>
              <th className="py-2 px-4 border-b">Schedule</th>
              <th className="py-2 px-4 border-b">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {sortedSchedules.map((schedule, index) => (
              <tr
                key={schedule._id}
                className={`text-[11px] h-[34px] ${index % 2 === 0 ? "bg-[#d6f1e1]" : ""}`}
              >
                <td className="py-2 px-4">
                  {Array.isArray(schedule.wasteType)
                    ? schedule.wasteType.join(", ")
                    : ""}
                </td>
                <td className="py-2 px-4">{schedule.schedule}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="text-black text-lg py-1 px-2 rounded"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
                    className=" text-black text-lg py-1 px-2 rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        fetchUserLocation={fetchUserLocation}
        editMode={editMode}
      />
    </div>
  );
};

export default WasteCollectionSchedule;
