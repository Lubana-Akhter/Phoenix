const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  projects: { type: Number, required: true },
  clients: { type: Number, required: true },
  rentalApartments: { type: Number, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  philosophy: { type: String, required: true }
});

// Static method to calculate the total number of clients from the User model where the role is "User"
aboutSchema.statics.calculateTotalClients = async function () {
  const User = mongoose.model("User");
  const totalClients = await User.countDocuments({ role: "User" });
  return totalClients;
};

// Static method to calculate the total number of rental apartments from the Property model where the property type is "Rent"
aboutSchema.statics.calculateTotalRentalApartments = async function () {
  const Property = mongoose.model("Property");
  const totalRentalApartments = await Property.countDocuments({ type: "Rent" });
  return totalRentalApartments;
};

// Static method to get the existing About data or create a new one if it doesn't exist
aboutSchema.statics.getOrCreateAbout = async function () {
  let about = await this.findOne();

  if (!about) {
    // Calculate the initial values for projects, clients, and rentalApartments
    const projects = 0; // Set projects to 0 initially, as we don't have a Project model
    const clients = await this.calculateTotalClients();
    const rentalApartments = await this.calculateTotalRentalApartments();

    // Create the new About data
    about = await this.create({
      title: "Default Title",
      description: "Default Description",
      projects,
      clients,
      rentalApartments,
      mission: "Default Mission",
      vision: "Default Vision",
      philosophy: "Default Philosophy"
    });
  }

  return about;
};

const About = mongoose.model("About", aboutSchema);

module.exports = About;
