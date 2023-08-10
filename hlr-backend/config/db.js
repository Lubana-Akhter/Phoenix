const mongoose = require("mongoose");
const User = require("../models/userModel");

async function createAdminUser() {
  const userCount = await User.countDocuments();

  if (userCount === 0) {
    const newUser = new User({
      email: "admin@gmail.com",
      password: "12345678",
      name: "Mr Admin",
      role: "admin",
    });

    await newUser.save();
    console.log("Admin created!");
  }
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    createAdminUser();
    console.log(
      `Successfully connected to MongoDB: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
