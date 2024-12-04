import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Inquiry from "./inquiryForm"; // Assuming you have an Inquiry component

import { FiMapPin, FiX , FaStar} from "../assets/icons/vander";

export default function TourGrid() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null); // For modal
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const BASE_URL = "http://localhost:3030"; // Base URL for backend API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);
        if (response.data && Array.isArray(response.data)) {
          const domesticTours = response.data.filter((tour) => tour.type === "International");
          setTours(domesticTours);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        setError(error.message || "Error fetching tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const openModal = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTour(null);
    setModalVisible(false);
  };

  return (
    <>
      <Navbar navclass="defaultscroll is-sticky" navlight={true} manuclass="justify-end nav-light"/>

      {/* Hero Section */}
      <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/bg/cta.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">International Packages</h3>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          {loading ? (
            <div className="text-center">Loading tours...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : tours.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="group rounded-md shadow dark:shadow-gray-700 cursor-pointer"
                  onClick={() => navigate(`/tour/${tour._id}`)} // Navigate to tour details on column click
                >
                  <div className="relative overflow-hidden rounded-t-md shadow dark:shadow-gray-700 mx-3 mt-3">
                    <img
                      src={tour.coverImage}
                      className="scale-125 group-hover:scale-100 duration-500"
                      alt={tour.place || "Tour Image"}
                    />
                    {tour.country && (
                      <div className="absolute top-0 start-0 p-4">
                        <span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                           {tour.place}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                  <p className="flex items-center text-slate-400 font-medium mb-2">
                      <FiMapPin className="text-red-500 size-4 ms-2" />
                      {tour.country || "Unknown Location"}
                      <span className="flex ms-12 bg-red-500 text-white text-[12px] px-2 py-1 font-medium rounded-md h-6">
                        Rating : <FaStar className="text-yellow-200 size-4 me-1" /> {tour.rating}
                      </span>
                      </p>
                    <h4 className="text-lg font-medium">{tour.heading || "Unknown Place"}</h4>
                    <div className="mt-4 pt-4 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                      <h5 className="text-lg font-medium text-red-500">₹&nbsp;{tour.price || "N/A"}</h5>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation on button click
                          openModal(tour); // Open modal
                        }}
                        className="text-slate-400 hover:text-red-500"
                      >
                        Explore Now <i className="mdi mdi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No International tours available.</div>
          )}
        </div>
      </section>

      <Footer />
      <Switcher />

      {/* Modal */}
      {modalVisible && selectedTour && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg relative w-11/12 md:w-2/3 lg:w-1/2">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              onClick={closeModal}
            >
              <FiX size={24} />
            </button>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Inquiry for {selectedTour.place}</h3>
              {/* Inquiry Form */}
              <Inquiry tourPlace={selectedTour.place} /> {/* Pass the place to the Inquiry form */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
