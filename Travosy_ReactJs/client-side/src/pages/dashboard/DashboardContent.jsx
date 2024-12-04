import React from 'react';

const DashboardContent = () => (
  <div className="dashboard-content  p-6">
    <h1 className="text-2xl font-bold mb-6">Welcome to the Travel Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-blue-500 text-white rounded-lg shadow-md p-6">
        <h5 className="text-lg font-semibold">Total Bookings</h5>
        <p className="text-2xl font-bold mt-2">120</p>
      </div>

      {/* Card 2 */}
      <div className="bg-green-500 text-white rounded-lg shadow-md p-6">
        <h5 className="text-lg font-semibold">Active Users</h5>
        <p className="text-2xl font-bold mt-2">75</p>
      </div>

      {/* Card 3 */}
      <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6">
        <h5 className="text-lg font-semibold">Travel Packages</h5>
        <p className="text-2xl font-bold mt-2">25</p>
      </div>
    </div>
  </div>
);

export default DashboardContent;
