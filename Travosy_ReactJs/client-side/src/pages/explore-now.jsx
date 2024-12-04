import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import DetailSidebar from "../components/detail-sidebar";
import { FiClock, FiActivity, FiUsers, FiGlobe, FiDollarSign, FiMapPin, FiCamera } from "react-icons/fi";

export default function TourDetailPage() {
  const { id } = useParams(); // Extract the tour ID from the URL
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3030"; // Backend server URL

  // Fetch Tour Details and Gallery Images
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        if (!id) throw new Error("Invalid Tour ID");

        const response = await axios.get(`${BASE_URL}/api/tours/${id}`);
        if (response.data) {
          setTour(response.data);
          setImages(response.data.galleryImages || []); // Fetch gallery images
        } else {
          throw new Error("Tour not found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching tour details");
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleCLick = (index) => {
    console.log(`Image ${index + 1} clicked`);
    // Add lightbox or modal implementation here if needed
  };

  // Fallback to ensure proper structure even if there are fewer images
  const [image1, image2, image3, image4, image5] = [
    images[0] || "",
    images[1] || "",
    images[2] || "",
    images[3] || "",
    images[4] || "",
  ];

  if (loading) return <div className="text-center mt-20">Loading tour details...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <>
      <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />

      <div className="container-fluid relative mt-10">
                <div className="md:flex mt-20">
                  <div className="lg:w-1/2 md:w-1/2 p-1">
                    <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                      <img src={image1} alt="Gallery Image 1" />
                      <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                        <Link
                          to="#"
                          onClick={() => handleCLick(0)}
                          className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                        >
                          <FiCamera className="size-4 align-middle" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 md:w-1/2">
                    <div className="flex">
                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image2} alt="Gallery Image 2" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(1)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image3} alt="Gallery Image 3" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(2)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image4} alt="Gallery Image 4" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(3)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image5} alt="Gallery Image 5" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(4)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            


      {/* Hero Section */}
      <section className="relative md:pb-24 pb-16 mx-6 mt-20">
        <div className="container-fluid">
          <div className="md:flex mt-4">
            {/* Main Content Section */}
            <div className="lg:w-3/4 p-4">
              <h5 className="text-3xl font-semibold">{tour.heading}</h5>
              <p className="flex items-center text-slate-400 font-medium mt-2">
                <FiMapPin className="size-4 me-1" /> {tour.country || "Unknown Country"}
              </p>

              {/* Tour Details Icons */}
              <div className="flex items-center flex-wrap gap-6 bg-gray-100 dark:bg-slate-800 p-6 rounded-lg shadow mt-6">
                <div className="flex items-center gap-3">
                  <FiClock className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-slate-400">{tour.duration || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiActivity className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Type</p>
                    <p className="text-slate-400">{tour.type || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiUsers className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="text-slate-400">{tour.groupSize || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiGlobe className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Languages</p>
                    <p className="text-slate-400">{tour.language || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiDollarSign className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Price</p>
                    <p className="text-slate-400">₹{tour.pricePerDay || "N/A"} / Day</p>
                  </div>
                </div>
              </div>

              {/* Tour Description */}
              <div className="mt-6">
                <h5 className="text-lg font-semibold">Tour Description:</h5>
                <p className="text-slate-400 mt-6">{tour.description || "No description available."}</p>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="lg:w-1/4 md:w-1/3">
              <DetailSidebar />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
