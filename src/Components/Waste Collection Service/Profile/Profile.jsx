import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    district: "",
    serviceArea: "",
  });

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(
          "http://localhost:5000/api/service/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCompany(response.data);
        setFormData({
          serviceName: response.data.serviceName,
          contactPerson: response.data.contactPerson,
          contactEmail: response.data.contactEmail,
          contactPhone: response.data.contactPhone,
          district: response.data.district,
          serviceArea: response.data.serviceArea.join(", "),
        });
      } catch (error) {
        console.error("Error fetching company profile:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch company profile. Please log in again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
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
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.put(
        "http://localhost:5000/api/service/profile",
        {
          ...formData,
          serviceArea: formData.serviceArea
            .split(",")
            .map((area) => area.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompany(response.data);
      setEditMode(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again.",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>No company data available</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>

      {!editMode ? (
        <>
          <p>
            <strong>Company Name:</strong> {company.serviceName}
          </p>
          <p>
            <strong>Contact Person:</strong> {company.contactPerson}
          </p>
          <p>
            <strong>Contact Email:</strong> {company.contactEmail}
          </p>
          <p>
            <strong>Contact Phone:</strong> {company.contactPhone}
          </p>
          <p>
            <strong>District:</strong> {company.district}
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Service Name"
              required
            />
          </label>

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
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-2"
              placeholder="Contact Phone"
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

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default CompanyProfile;
