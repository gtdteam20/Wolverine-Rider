import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
const Dashboard = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="flex">
      <Sidebar/>
      <main className="flex-grow ml-52 p-4">
        <DashboardContent />
      </main>
    </div>
  </div>
);

export default Dashboard;
