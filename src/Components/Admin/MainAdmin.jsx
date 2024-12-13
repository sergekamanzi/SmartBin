import React from 'react';
import UserDashboard from './Box/Users/UserDashboard';

const MainAdmin = () => {
  return (
    <div className="flex-1 p-6 md:ml-52">
      <h1 className="text-4xl pl-5 mt-7 font-semibold mb-6">Dashboard</h1>
      <UserDashboard />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">User Management</h5>
          <p className="text-gray-700 mb-4">Manage your users.</p>
          <a href="/users" className="text-green-600 hover:underline">
            View Users
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">Performance Tracker</h5>
          <p className="text-gray-700 mb-4">
            Track your recycling efforts and view impact metrics.
          </p>
          <a href="/all" className="text-green-600 hover:underline">
            Performance
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
