import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo-icon.png";
import Switcher from "../../components/switcher";
import BackToHome from "../../components/back-to-home";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Show/Hide password toggle
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post("http://localhost:3030/api/auth/login", {
                email,
                password,
            });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token); // Store token
                setLoading(false); // Reset loading state
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                throw new Error("Login failed. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
                <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2" id="particles-snow"></div>
                <div className="container relative z-3">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
                            <img src={logo} className="mx-auto" alt="Logo" />
                            <h5 className="my-6 text-xl font-semibold">Login</h5>
                            <form className="text-start" onSubmit={handleSubmit}>
                                {error && <p className="text-red-500">{error}</p>}
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input
                                            id="LoginEmail"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4 relative">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input
                                            id="LoginPassword"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                            placeholder="Password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-8 text-gray-600 dark:text-gray-400"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            type="submit"
                                            className={`py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full ${
                                                loading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            value={loading ? "Logging in..." : "Login / Sign in"}
                                            disabled={loading} // Disable button while loading
                                        />
                                    </div>

                                    <div className="text-center">
                                        <Link to="/forgot-password" className="text-black dark:text-white font-bold">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
            <BackToHome />
        </>
    );
}
