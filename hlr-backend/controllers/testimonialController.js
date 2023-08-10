const Testimonial = require('../models/testimonialModel');
const User = require('../models/userModel');
const logger = require('../utils/logger');

// Get all testimonials
// Route: GET /api/testimonial/list
// Access: Public
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate('userId','-password');
    res.json(testimonials);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get testimonial by ID
// Route: GET /api/testimonial/read/:id
// Access: Public
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).populate('userId');
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new testimonial
// Route: POST /api/testimonial/create
// Access: Public
const createTestimonial = async (req, res) => {
  try {
    const { userId, feedback, ratings } = req.body;

    // Check if a testimonial already exists for the given userId
    const existingTestimonial = await Testimonial.findOne({ userId });
    if (existingTestimonial) {
      return res.status(400).json({ message: 'Testimonial already exists for this user' });
    }

    // Fetch the associated user to get userName and userAvatar
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const testimonialData = {
      userId,
      title: req.body.title, // Add title if required
      feedback,
      ratings,
      userName: user.name,
      userAvatar: user.avatar
    };

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json(testimonial);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update testimonial by ID
// Route: PATCH /api/testimonial/update/:id
// Access: Public
// Update testimonial by ID
// Route: PATCH /api/testimonial/update/:id
// Access: Public
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    const { userId, title, feedback, ratings } = req.body;

    // Check if the updated userId already exists in another testimonial
    if (userId && userId.toString() !== testimonial.userId.toString()) {
      const existingTestimonial = await Testimonial.findOne({ userId });
      if (existingTestimonial) {
        return res.status(400).json({ message: 'Another testimonial already exists for this user' });
      }
    }

    // Update the testimonial fields if provided
    testimonial.userId = userId || testimonial.userId;
    testimonial.title = title || testimonial.title;
    testimonial.feedback = feedback || testimonial.feedback;
    testimonial.ratings = ratings || testimonial.ratings;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete testimonial by ID
// Route: DELETE /api/testimonial/delete/:id
// Access: Public
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
