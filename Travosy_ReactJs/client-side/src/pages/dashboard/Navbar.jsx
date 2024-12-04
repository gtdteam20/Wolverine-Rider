import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dashboardLogo from "../../assets/images/logo-light.png";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Remove token from localStorage or sessionStorage
            localStorage.removeItem("token");  // or sessionStorage.removeItem("token");
    
            // Redirect to login page
            navigate("/login");
    
            // Optionally, inform the backend about the logout (since JWT is stateless)
            const response = await axios ("http://localhost:3030/api/auth/logout", {
                method: "POST",
            });
    
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
    
        } catch (error) {
            console.error("Logout error:", error);
            alert("Failed to log out. Please try again.");
        }
    };
    

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center justify-center mx-auto">
                    <img
                        src={dashboardLogo}
                        alt="Logo"
                        className="w-10 h-10 rounded-full transition-transform transform hover:scale-110"
                    />
                    <span className="text-white text-lg font-bold ml-2">Wolverine Travel</span>
                </div>
                <button
                    className="text-white md:hidden"
                    aria-label="Toggle navigation"
                    onClick={() =>
                        document.getElementById("navbarNav").classList.toggle("hidden")
                    }
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
                <div
                    id="navbarNav"
                    className="hidden md:flex items-center justify-end space-x-4"
                >
                    <a
                        href="/user-profile"
                        className="text-white text-sm hover:text-yellow-400 transition-colors"
                    >
                        Profile
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
