import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo-icon.png";
import Switcher from "../../components/switcher";
import BackToHome from "../../components/back-to-home";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3030/api/auth/forgot-password", {
                email,
            });
            setMessage(response.data.message || "Password reset link sent to your email!");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
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
                            <Link to="/"><img src={logo} className="mx-auto" alt="Logo" /></Link>
                            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
                            <form className="text-start" onSubmit={handleForgotPassword}>
                                {message && <p className="text-green-500">{message}</p>}
                                {error && <p className="text-red-500">{error}</p>}
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="ForgotEmail">Email Address:</label>
                                        <input
                                            id="ForgotEmail"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            type="submit"
                                            className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                                            value="Send"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">Remember your password?</span>
                                        <Link to="/login" className="text-black dark:text-white font-bold">Sign in</Link>
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
