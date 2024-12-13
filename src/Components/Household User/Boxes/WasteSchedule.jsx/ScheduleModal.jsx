import React from "react";

const ScheduleModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleChange,
  fetchUserLocation,
  editMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4">
          {editMode ? "Update Schedule" : "Add Schedule"}
        </h2>
        <form onSubmit={onSubmit} className="mb-6">
          <label className="block mb-4">
            <span>Select Waste Types:</span>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="wasteType"
                  value="general"
                  checked={formData.wasteType.includes("general")}
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
                  checked={formData.wasteType.includes("recyclables")}
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
                  checked={formData.wasteType.includes("organic")}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Organic</span>
              </label>
            </div>
          </label>
          <div className="flex gap-5 items-center ">
            <label className="block mb-4">
              <span>Schedule:</span>
              <select
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md  shadow-sm py-2 px-2"
                required
              >
                <option value="">Select Schedule</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
            <button
              type="button"
              onClick={fetchUserLocation}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-3"
            >
              Fetch Location
            </button>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              {editMode ? "Update Schedule" : "Add Schedule"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
