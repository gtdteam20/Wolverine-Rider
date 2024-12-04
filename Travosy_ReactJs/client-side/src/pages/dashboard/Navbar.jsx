import React from "react";
import axios from "axios";
import dashboardLogo from "../../assets/images/logo-light.png";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        throw new Error("No token found");
      }
  
      // Call the backend logout endpoint
      const response = await axios.post(
        "http://localhost:3030/api/logout",
        {}, // No body is needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );
  
      if (response.status === 200) {
        // Clear local storage and session storage
        localStorage.removeItem("token");
        sessionStorage.clear();
  
        // Redirect to login page
        window.location.href = "/login";
      } else {
        throw new Error("Logout failed on the server.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Centering the logo and name */}
        <div className="flex items-center justify-center mx-auto">
          <img
            src={dashboardLogo}
            alt="Logo"
            className="w-10 h-10 rounded-full transition-transform transform hover:scale-110"
          />
          <span className="text-white text-lg font-bold ml-2">Wolverine Travel</span>
        </div>

        {/* Responsive Toggler */}
        <button
          className="text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={() => document.getElementById("navbarNav").classList.toggle("hidden")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div id="navbarNav" className="hidden md:flex items-center justify-end space-x-4">
          <a href="/user-profile" className="text-white text-sm hover:text-yellow-400 transition-colors">
            <i className="mdi mdi-account-circle mr-1"></i>Profile
          </a>
          <button
  onClick={handleLogout}
  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
>
  Logout
</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
