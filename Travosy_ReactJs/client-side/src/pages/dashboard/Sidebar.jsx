import React from 'react';

const Sidebar = () => (
  <nav className="fixed top-0 left-0 h-screen w-48 bg-gray-800 text-white shadow-md">
    <div className="sticky top-0 pt-6 px-4">
      <h4 className="text-lg font-bold text-gray-300 mb-6 border-b border-gray-600 pb-2">
        Admin Panel
      </h4>
      <ul className="space-y-4">
        <li>
          <a
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2"
          >
            <i className="mdi mdi-view-dashboard-outline text-lg"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li>
          <a
            href="/addTour"
            className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2"
          >
            <i className="mdi mdi-pencil-outline text-lg"></i>
            <span>Add Tour</span>
          </a>
        </li>
        
        <li>
          <a
            href="/editTour"
            className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2"
          >
            <i className="mdi mdi-pencil-outline text-lg"></i>
            <span>Edit Tour</span>
          </a>
        </li>

        <li>
          <a
            href="/formDataTable"
            className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2"
          >
           <i className="mdi mdi-phone-outline text-lg"></i>
            <span>Contact Inquiries</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Sidebar;
