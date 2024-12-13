import React from 'react';

const MainHousehold = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">Waste Collection Schedule</h5>
          <p className="text-gray-700 mb-4">Manage your waste collection schedules.</p>
          <a href="/schedule" className="text-green-600 hover:underline">View Schedule</a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">Recycling Tracker</h5>
          <p className="text-gray-700 mb-4">Track your recycling efforts and view impact metrics.</p>
          <a href="/recycling" className="text-green-600 hover:underline">Track Recycling</a>
        </div>
      </div>
    </div>
  );
};

export default MainHousehold;
