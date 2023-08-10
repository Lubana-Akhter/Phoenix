const { uploadImagesToCloudinary } = require("../utils/cloudinary");
const logger = require("../utils/logger");
const Property = require("../models/propertyModel");

/**
 * Get filtered properties
 * @route GET /api/property/filter
 * @access Public
 */
const getFilteredProperties = async (req, res) => {
  const type = req.body.type;
  const location = req.body.location;
  const ctg = req.body.ctg;
  const baths = req.body.baths;
  const beds = req.body.beds;
  const { minPrice, maxPrice } = req.body.price;
  const { minArea, maxArea } = req.body.area;

  const categoryId = ctg ? mongoose.Types.ObjectId(ctg) : null;

  // Initialize an empty array for the $and operator
  const andQuery = [];

  // Add filters for properties with provided values
  if (type) andQuery.push({ type });
  if (categoryId) andQuery.push({ categoryId: categoryId });
  if (baths) andQuery.push({ baths: { $gte: baths } });
  if (beds) andQuery.push({ beds: { $gte: beds } });
  if (minPrice || maxPrice) {
    const priceQuery = {};
    if (minPrice) priceQuery.$gte = minPrice;
    if (maxPrice != 0) priceQuery.$lte = maxPrice;
    andQuery.push({ price: priceQuery });
  }
  if (minArea || maxArea) {
    const areaQuery = {};
    if (minArea) areaQuery.$gte = minArea;
    if (maxArea != 0) areaQuery.$lte = maxArea;
    andQuery.push({ land_area: areaQuery });
  }

  // Handle "location" search case with $or operator and $regex
  if (location) {
    const locationQuery = { $or: [] };
    const locationRegex = new RegExp(location, "i"); // 'i' for case-insensitive matching
    locationQuery.$or.push({ "location.address": { $regex: locationRegex } });
    locationQuery.$or.push({ "location.city": { $regex: locationRegex } });
    locationQuery.$or.push({ "location.state": { $regex: locationRegex } });
    locationQuery.$or.push({ "location.country": { $regex: locationRegex } });

    if (locationQuery.$or.length > 0) andQuery.push(locationQuery);
  }

  // Build the final query with $and operator
  const query = { $and: andQuery }; // Initialize an empty object for the query

  try {
    const properties = await Property.find(query).populate(
      "userId",
      "-password"
    );
    res.json(properties);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get all properties
 * @route GET /api/property/list
 * @access Public
 */
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate("userId", "-password");
    res.json(properties);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/**
 * Get all properties
 * @route GET /api/property/list/user
 * @access Public
 */
const getUserAllProperties = async (req, res) => {
  try {
    // Get the userId of the currently logged-in user from req.user
    const userId = req.user._id;

    // Use the userId to filter the properties for the current logged-in user
    const properties = await Property.find({ userId }).populate(
      "userId",
      "-password"
    );

    res.json(properties);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get property by ID
 * @route GET /api/property/read/:id
 * @access Public
 */
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "userId",
      "-password"
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get property by ID for the currently logged-in user
 * @route GET /api/property/user/:id
 * @access Private (User must be authenticated)
 */
const getUserPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    console.log("Property ID:", propertyId);

    // Check if the user is authenticated and their details are available in `req.user`
    console.log("Authenticated User:", req.user);

    const property = await Property.findById(propertyId).populate(
      "userId",
      "-password"
    );
    console.log("Property:", property);

    // Check if property exists
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the user is an admin or the property's userId matches the current logged-in user's ID
    const isAdmin = req.user.role === "admin";
    const isOwner = property.userId.toString() === req.user._id.toString();

    console.log("Admin:", isAdmin, "Owner:", isOwner);

    // If the user is not an admin and is not the owner of the property, return an error
    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this property" });
    }

    res.json(property);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new property
 * @route POST /api/property/create
 * @access Private (Seller, Admin)
 */
const createProperty = async (req, res) => {
  try {
    // Check if the user is a seller or admin
    // Assuming req.user.role contains the user's role (Admin, User, Seller, Expert)

    if (!["admin", "user"].includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      name,
      description,
      location,
      type,
      categoryId,
      storeys,
      land_area,
      basement,
      parking,
      floor,
      unit,
      sales,
      price,
      baths,
      beds,
    } = req.body;

    // UPLOAD IMAGES TO CLOUDINARY MEDIA
    const imageUrls = await uploadImagesToCloudinary(req.files);
    // console.log(imageUrls);

    // Check if a property with the same name, description, location, type, storeys, land_area, basement,
    // parking, floor, unit, sales, price, baths, and beds exists for the user
    const existingProperty = await Property.findOne({
      name,
      description,
      location,
      type,
      storeys,
      land_area,
      basement,
      parking,
      floor,
      unit,
      sales,
      price,
      baths,
      beds,
    });

    if (existingProperty) {
      return res
        .status(409)
        .json({ message: "Property with the same details already exists" });
    }

    const property = await Property.create({
      userId: req.user._id, // Store the userId of the currently logged-in user
      name,
      description,
      images: imageUrls,
      location,
      type,
      categoryId,
      storeys,
      land_area,
      basement,
      parking,
      floor,
      unit,
      sales,
      price,
      baths,
      beds,
    });

    res.status(201).json(property);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update property
 * @route PATCH /api/property/update/:id
 * @access Private (Seller)
 */
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the user is an admin
    const isAdmin = req.user.role === "admin";

    // If the user is not an admin, check if the property belongs to the user
    if (!isAdmin && property.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this property" });
    }

    let {
      name = property.name,
      description = property.description,
      images = property.images,
      location = property.location,
      type = property.type,
      categoryId = property.categoryId,
      storeys = property.storeys,
      land_area = property.land_area,
      basement = property.basement,
      parking = property.parking,
      floor = property.floor,
      unit = property.unit,
      sales = property.sales,
      price = property.price,
      baths = property.baths,
      beds = property.beds,
    } = req.body;

    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const newImageUrls = await uploadImagesToCloudinary(req.files);
      // Replace existing image URLs with the new ones
      images = newImageUrls;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          images,
          location,
          type,
          categoryId,
          storeys,
          land_area,
          basement,
          parking,
          floor,
          unit,
          sales,
          price,
          baths,
          beds,
        },
      },
      { new: true } // To get the updated document in the response
    );

    res.json(updatedProperty);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete property
 * @route DELETE /api/property/delete/:id
 * @access Private (Admin, Seller)
 */
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the user is an admin
    const isAdmin = req.user.role === "admin";

    // If the user is not an admin, check if the property belongs to the user
    if (!isAdmin && property.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this property" });
    }

    // Use deleteOne() to remove the document from the collection
    await Property.deleteOne({ _id: req.params.id });

    res.json({ message: "Property removed successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFilteredProperties,
  getAllProperties,
  getUserAllProperties,
  getPropertyById,
  getUserPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
