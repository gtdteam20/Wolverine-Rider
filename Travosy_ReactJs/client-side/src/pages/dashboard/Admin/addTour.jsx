import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'; // Adjust the path as needed
import Sidebar from '../Sidebar'; // Adjust the path as needed

const AddTour = () => {
  const [formData, setFormData] = useState({
    coverImage: null,
    galleryImages: [],
    country: '',
    place: '',
    rating: '',
    price: '',
    heading: '',
    duration: '',
    type: '',
    groupSize: '',
    language: '',
    pricePerDay: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData({ ...formData, coverImage: files[0] }); // Storing only the first file
    } else if (name === 'galleryImages') {
      setFormData({ ...formData, galleryImages: Array.from(files).slice(0, 5) }); // Limiting to 5 images
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImage) {
      alert('Cover image is required');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('coverImage', formData.coverImage);
    formData.galleryImages.forEach((file) => {
      formDataToSend.append('galleryImages', file);
    });
    Object.keys(formData)
      .filter((key) => key !== 'coverImage' && key !== 'galleryImages')
      .forEach((key) => formDataToSend.append(key, formData[key]));

    try {
      const response = await axios.post('http://localhost:3030/api/tours', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message || 'Tour added successfully!');
      setFormData({
        coverImage: null,
        galleryImages: [],
        country: '',
        place: '',
        rating: '',
        price: '',
        heading: '',
        duration: '',
        type: '',
        groupSize: '',
        language: '',
        pricePerDay: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding tour:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to add the tour. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-4">Add New Tour</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleChange}
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700">
                Gallery Images (max 5)
              </label>
              <input
                type="file"
                id="galleryImages"
                name="galleryImages"
                onChange={handleChange}
                multiple
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {[
              { field: 'country', placeholder: 'Enter the country name' },
              { field: 'place', placeholder: 'Enter the place name' },
              { field: 'rating', placeholder: 'Enter the rating (e.g., 4.5)' },
              { field: 'price', placeholder: 'Enter the price (e.g., 1000)' },
              { field: 'heading', placeholder: 'Enter a short heading for the tour' },
              { field: 'duration', placeholder: 'Enter the duration (e.g., 5 days)' },
              { field: 'type', placeholder: 'Enter the type (e.g., Adventure, Family)' },
              { field: 'groupSize', placeholder: 'Enter the group size (e.g., 10)' },
              { field: 'language', placeholder: 'Enter the language (e.g., English)' },
              { field: 'pricePerDay', placeholder: 'Enter the price per day' },
            ].map(({ field, placeholder }) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a detailed description of the tour"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Tour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTour;
