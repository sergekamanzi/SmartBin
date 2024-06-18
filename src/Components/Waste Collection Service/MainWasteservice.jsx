import React from "react";

const MainWasteservice = () => {
  return (
    <div className="h-screen flex">
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-2">Route Management</h5>
            <p className="text-gray-700 mb-4">
              Manage and optimize your collection routes.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">
              Manage Routes
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-2">Performance Tracking</h5>
            <p className="text-gray-700 mb-4">
              Track and analyze the performance of your services.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">
              Track Performance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWasteservice;
