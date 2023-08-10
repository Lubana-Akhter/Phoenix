const About = require('../models/aboutModel');
const User = require('../models/userModel');
const Property = require('../models/propertyModel');
const logger = require('../utils/logger');

// Get the About data (assuming there will be only one entry)
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }
    res.json(about);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create or update the About data
const createOrUpdateAbout = async (req, res) => {
  try {
    const { title, description, mission, vision, philosophy } = req.body;

    // Calculate the number of clients (users) and rental apartments (properties of type 'Rent')
    const clientCount = await User.countDocuments();
    const rentalApartmentCount = await Property.countDocuments({ type: 'Rent' });

    const aboutData = {
      title,
      description,
      projects: 0, // Set projects to 0 initially, as we don't have a Project model
      clients: clientCount,
      rentalApartments: rentalApartmentCount,
      mission,
      vision,
      philosophy,
    };

    let about = await About.findOne();
    if (about) {
      // Update the existing About data
      about = await About.findByIdAndUpdate(about._id, aboutData, { new: true });
      res.json({ message: 'About data updated successfully', data: about });
    } else {
      // Create new About data
      about = await About.create(aboutData);
      res.status(201).json(about);
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete the About data
const deleteAbout = async (req, res) => {
    try {
      const about = await About.findOne();
      if (!about) {
        return res.status(404).json({ message: 'About data not found' });
      }
  
      await About.deleteOne();
      res.json({ message: 'About data deleted successfully' });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {
  getAbout,
  createOrUpdateAbout,
  deleteAbout,
};
