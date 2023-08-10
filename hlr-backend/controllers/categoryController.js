const Category = require('../models/categoryModel');

// @desc    Get all categories
// @route   GET /api/category/list
// @access  Admin, Seller
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a new category
// @route   POST /api/category/create
// @access  Admin
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get a single category by ID
// @route   GET /api/category/read/:id
// @access  Admin
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update a category by ID
// @route   PATCH /api/category/update/:id
// @access  Admin
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated category
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Delete a category by ID
// @route   DELETE /api/category/delete/:id
// @access  Admin
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
