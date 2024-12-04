import React, { useState } from "react";
import axios from "axios";

const EditTourModal = ({ tour, onClose, onUpdate }) => {
  const [editedTour, setEditedTour] = useState({ ...tour });
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "coverImage") {
      setCoverImage(files[0]);
    } else if (name === "galleryImages") {
      setGalleryImages([...files]);
    }
  };

  // Submit the form to update the tour
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure this function only works in response to form submission
    setLoading(true);

    const formData = new FormData();
    formData.append("country", editedTour.country);
    formData.append("type", editedTour.type);
    formData.append("place", editedTour.place);
    formData.append("price", editedTour.price);
    formData.append("rating", editedTour.rating);
    formData.append("duration", editedTour.duration);
    formData.append("groupSize", editedTour.groupSize);
    formData.append("language", editedTour.language);
    formData.append("pricePerDay", editedTour.pricePerDay);
    formData.append("description", editedTour.description);

    // Append files if new ones are uploaded
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    try {
      const response = await axios.put(
        `http://localhost:3030/api/tours/${editedTour._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Tour updated successfully!");
        onUpdate(response.data.tour); // Pass updated tour data to parent
        onClose();
      } else {
        alert(`Error: ${response.status} - ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert(`Failed to update the tour. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-h-[80vh] overflow-y-auto max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Edit Tour</h2>
        <form onSubmit={handleSubmit}>
          {/* Country */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tour</label>
            <input
              type="text"
              name="country"
              value={editedTour.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={editedTour.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Place */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={editedTour.place}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={editedTour.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              value={editedTour.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={editedTour.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Group Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group Size</label>
            <input
              type="number"
              name="groupSize"
              value={editedTour.groupSize}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={editedTour.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Price Per Day */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={editedTour.pricePerDay}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={editedTour.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept="image/*"
            />
          </div>

          {/* Gallery Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Gallery Images
            </label>
            <input
              type="file"
              name="galleryImages"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept="image/*"
              multiple
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded ${
                loading
                  ? "bg-blue-300 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTourModal;
