const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Get all users
// @route   GET /api/user/list
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Get user profile
// @route   GET /api/user/read/:id
// @access  All (authenticated users)
const getUserProfile = async (req, res) => {
  const { id } = req.params; // Use req.params.id to get the user ID from the route

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Update user profile
// @route   PATCH /api/user/update/:id
// @access  All (authenticated users)
const updateUserProfile = async (req, res) => {
  const { id } = req.params; // Use req.params.id to get the user ID from the route
  const { name, email, password, phone, designation, social } = req.body; // Add the missing fields from the userSchema

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone; // Adding phone field
    user.designation = designation || user.designation; // Adding designation field
    user.social = social || user.social; // Adding social field
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Register a new user
// @route   POST /api/user/register
// @access  All
const registerUser = async (req, res) => {
  const { name, email, password, phone, designation, social } = req.body; // Add the missing fields from the userSchema

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      designation,
      social,
    }); // Add the missing fields to the User.create call
    let token = await generateToken(res, user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Login user
// @route   POST /api/user/login
// @access  All
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate the token and include it in the JSON response
    const token = await generateToken(res, user._id, true);

    // Return user information and the token in the response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token, // Include the generated token in the response
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// @desc    Forgot password (Not implemented in this outline)
// @route   POST /api/user/forget
// @access  All
const forgotPassword = async (req, res) => {
  // Not implemented in this outline
  res.status(501).json({ message: "Not implemented" });
};

// @desc    Delete user
// @route   DELETE /api/user/delete/:id
// @access  Admin
const deleteUser = async (req, res) => {
  const { id } = req.params; // Use req.params.id to get the user ID from the route

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  registerUser,
  loginUser,
  forgotPassword,
  deleteUser,
};
