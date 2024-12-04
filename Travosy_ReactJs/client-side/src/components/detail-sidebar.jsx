import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

export default function DetailSidebar() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    email: "",
    subject: "",
    number: "",
    departureMonth: "",
    inquiryPage: "sidebarPage", // Specify the page as "sidebarPage"
  });

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the formData to check if it is correct
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3030/form/submit", formData);

      alert(response.data.message); // Success message
      setFormData({
        name: "",
        countryCode: "",
        phone: "",
        email: "",
        subject: "",
        number: "",
        departureMonth: "",
        inquiryPage: "sidebarPage",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data?.message || error.message);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="lg:col-span-4 md:col-span-5">
      <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">Phone:</label>
            <div className="mt-2 flex items-center space-x-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="py-2 w-24 px-1 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                required
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                {/* Add more options as needed */}
              </select>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">Destination:</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              placeholder="Enter destination"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">No. of People:</label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              type="number"
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              placeholder="Enter number of people"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">Departure Month:</label>
            <select
              name="departureMonth"
              value={formData.departureMonth}
              onChange={handleChange}
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              required
            >
              <option value="" disabled>
                Select Month of Departure
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              {/* Add more options */}
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-semibold">Select Date:</label>
            <DatePicker
              className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <button
            type="submit"
            className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
