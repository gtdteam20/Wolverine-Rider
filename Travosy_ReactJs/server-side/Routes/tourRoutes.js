import express from 'express';
import multer from 'multer';
import path from 'path';
import Tour from '../model/Tour.js'; // Mongoose model for the database
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix); // Unique filename
  },
});

const upload = multer({ storage });

// POST API to create a new tour
router.post('/api/tours', upload.fields([{ name: 'coverImage' }, { name: 'galleryImages', maxCount: 5 }]), async (req, res) => {
  try {
    // Validate required fields
    if (!req.files || !req.files.coverImage){
      return res.status(400).json({ message: 'Cover image is required.' });
    }

    // Construct the new tour object
    const newTour = new Tour({
      coverImage: `${req.protocol}://${req.get('host')}/uploads/${req.files.coverImage[0].filename}`, // Full URL for cover image
      galleryImages: req.files.galleryImages
      ? req.files.galleryImages.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`)
      : [], // Full URLs for gallery images
      country: req.body.country,
      place: req.body.place,
      rating: req.body.rating,
      price: req.body.price,
      heading: req.body.heading,
      duration: req.body.duration,
      type: req.body.type,
      groupSize: req.body.groupSize,
      language: req.body.language,
      pricePerDay: req.body.pricePerDay,
      description: req.body.description,
    });

    // Save to the database
    await newTour.save();

    res.status(201).json({ message: 'Tour added successfully!', tour: newTour });
  } catch (error) {
    console.error('Error adding tour:', error);
    res.status(500).json({ message: 'Failed to add the tour. Please try again.' });
  }
});

// GET API to fetch all tours
router.get('/api/tours', async (req, res) => {
  try {
    // Fetch all tours from the database
    const tours = await Tour.find();

    // Send the tours as a response
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ message: 'Failed to fetch tours. Please try again later.' });
  }
});

// explore-now get data 
router.get('/api/tours/:id', async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
  }
  res.json(tour);
});


// DELETE API to delete a tour by ID
router.delete('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found.' });
    }

    res.status(200).json({ message: 'Tour deleted successfully!' });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ message: 'Failed to delete the tour. Please try again.' });
  }
});


router.put(
  "/api/tours/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
  ]),
  async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      if (req.files.coverImage) {
        updatedData.coverImage = `${req.protocol}://${req.get("host")}/uploads/${req.files.coverImage[0].filename}`;
      }
      if (req.files.galleryImages) {
        updatedData.galleryImages = req.files.galleryImages.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }

      const updatedTour = await Tour.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      res.status(200).json({
        message: "Tour updated successfully",
        tour: updatedTour,
      });
    } catch (error) {
      console.error("Error updating the tour:", error);
      res.status(500).json({ error: "Failed to update the tour" });
    }
  }
);



// Export the router
export default router;
