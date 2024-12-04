import React, { useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi"; // Import the close icon

export default function Inquiry({ tourPlace, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    email: "",
    subject: tourPlace || "", // Set country/destination as subject
    number: "",
    departureMonth: "",
    inquiryPage: "" || tourPlace || "contactPage", // Set country or default to contactPage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3030/form/submit', formData);
      alert(response.data.message); // Success message
      setFormData({
        name: "",
        countryCode: "",
        phone: "",
        email: "",
        subject: tourPlace || "", // Reset subject
        number: "",
        departureMonth: "",
        inquiryPage: tourPlace || "contactPage", // Reset inquiry page
      });
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.message || error.message);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={closeModal} // Close the modal
        >
          <FiX size={24} />
        </button>
        <h3 className="text-2xl font-semibold mb-6 text-center">Get in touch!</h3>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex space-x-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                id="countryCode"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
              </select>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                id="phone"
                type="tel"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                required
              />
            </div>
            <div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                id="subject"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Destination"
                required
              />
            </div>
            <div>
              <input
                name="number"
                value={formData.number}
                onChange={handleChange}
                id="numberInput"
                type="number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of People"
                required
              />
            </div>
            <div>
              <select
                name="departureMonth"
                value={formData.departureMonth}
                onChange={handleChange}
                id="departureMonth"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select Month of Departure</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                id="submit"
                name="send"
                className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
