const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });

const { protect, admin } = require("../middleware/authMiddleware");

// Import the controllers for each route
const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  registerUser,
  loginUser,
  forgotPassword,
  deleteUser,
} = require("../controllers/userController");

const {
  getAllProperties,
  getUserAllProperties,
  getPropertyById,
  getUserPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFilteredProperties,
} = require("../controllers/propertyController");

const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const {
  getAbout,
  createOrUpdateAbout,
  deleteAbout,
} = require("../controllers/aboutController");
const {
  createSell,
  createRent,
  getRentSells,
  updateRentSell,
  visitingTimeAssign,
  orderFiltering,
  userFilter,
} = require("../controllers/orderController");
// Root API route
router.get("/", (req, res) => {
  res.send("It's Working");
});

// User routes
router.get("/user/list", protect, admin, getAllUsers);
router.get("/user/read/:id", protect, getUserProfile);
router.patch("/user/update/:id", protect, updateUserProfile);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/forget", forgotPassword);
router.delete("/user/delete/:id", protect, admin, deleteUser);

// Category routes
router.get("/category/list", getAllCategories);
router.post("/category/create", protect, createCategory);
router.get("/category/read/:id", getCategoryById);
router.patch("/category/update/:id", protect, admin, updateCategory);
router.delete("/category/delete/:id", protect, admin, deleteCategory);

// Testimonial routes
router.get("/testimonial/list", getAllTestimonials);
router.get("/testimonial/read/:id", getTestimonialById);
router.post("/testimonial/create", protect, admin, createTestimonial);
router.patch("/testimonial/update/:id", protect, admin, updateTestimonial);
router.delete("/testimonial/delete/:id", protect, admin, deleteTestimonial);

// About routes
router.get("/about/read", getAbout);
router.post("/about/create-update", protect, admin, createOrUpdateAbout);
router.delete("/about/delete/:id", protect, admin, deleteAbout);

// Property routes
router.get("/property/filter", getFilteredProperties);
router.get("/property/list", getAllProperties);
router.get("/property/list/user", protect, getUserAllProperties);
router.get("/property/read/:id", getPropertyById);
router.get("/property/read-user/:id", protect, getUserAllProperties);
router.post(
  "/property/create",
  protect,
  upload.array("images", 10),
  createProperty
);
router.patch(
  "/property/update/:id",
  protect,
  upload.array("images", 10),
  updateProperty
);
router.delete("/property/delete/:id", protect, deleteProperty);

// Order Routes
router.get("/order/sell/list/:type", protect, admin, getRentSells);
router.post("/order/sell/create/:propertyId", protect, createSell);

router.get("/order/rent/list/:type", protect, admin, getRentSells);
router.post("/order/rent/create/:propertyId", protect, createRent);

router.patch("/order/rent-sell/update/:id", protect, admin, updateRentSell);
router.post(
  "/order/rent-sell/visit-time-assign/:id",
  protect,
  admin,
  visitingTimeAssign
);

router.get("/order/rent-sell/filtering", protect, admin, orderFiltering);
router.get("/order/buyer-seller-filter/", protect, admin, userFilter);

module.exports = router;
