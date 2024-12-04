import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check token in localStorage

  // If no token, redirect to the login page
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
