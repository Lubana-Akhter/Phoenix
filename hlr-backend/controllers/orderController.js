const Order = require('../models/orderModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');
const logger = require('../utils/logger');

const getRentSells = async (req, res) => {
    try {
      const { type } = req.params;
      console.log(type)
  
      // Step 1: Find properties that are available for sell/rent of the given type
      const properties = await Property.find({ type });
  
      // Step 2: Get the property IDs of the available properties
      const propertyIds = properties.map(property => property._id);
  
      // Step 3: Fetch sell/rent orders related to the available properties from the orders collection
      const rentSells = await Order.find({ propertyId: { $in: propertyIds } })
        .populate('propertyId', '_id name location images') // Populate property data for displaying property details in the sell/rent orders
        .populate('buyer', 'name email phone') // Populate buyer data for displaying buyer details in the sell/rent orders
        .populate('seller', 'name email phone'); // Populate seller data for displaying seller details in the sell/rent orders
  
      res.status(200).json(rentSells);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const createRent = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      // Step 1: Check if the property exists and is available for rent
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      if (property.type !== 'Rent' && property.type !== 'Both') {
        return res.status(400).json({ error: 'This property is not available for rent' });
      }
      if (property.status !== 'Available') {
        return res.status(400).json({ error: 'This property is not available for rent at the moment' });
      }
  
      // Step 2: Get the authenticated user (buyer) from the request (assuming you're using 'protect' middleware)
      const buyer = req.user; // Assuming the authenticated user is stored in 'req.user' by the 'protect' middleware
  
      // Step 3: Check if the buyer and seller are the same person
      if (String(property.userId) === String(buyer._id)) {
        return res.status(400).json({ error: 'You cannot rent your own property' });
      }
  
      // Step 4: Create the rent order
      const newRent = await Order.create({
        propertyId,
        buyer: buyer._id,
        seller: property.userId,
        /* Add other relevant fields here, such as orderStatus and date (if needed) */
      });
  
      res.status(201).json(newRent);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const createSell = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      // Step 1: Check if the property exists and is available for sell
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      if (property.type !== 'Sell' && property.type !== 'Both') {
        return res.status(400).json({ error: 'This property is not available for sell' });
      }
      if (property.status !== 'Available') {
        return res.status(400).json({ error: 'This property is not available for sell at the moment' });
      }
  
      // Step 2: Get the authenticated user (seller) from the request (assuming you're using 'protect' middleware)
      const seller = req.user; // Assuming the authenticated user is stored in 'req.user' by the 'protect' middleware
  
      // Step 3: Check if the buyer and seller are the same person
      if (String(property.userId) === String(seller._id)) {
        return res.status(400).json({ error: 'You cannot sell a property to yourself' });
      }
  
      // Step 4: Create the sell order
      const newSell = await Order.create({
        propertyId,
        buyer: property.userId,
        seller: seller._id,
        /* Add other relevant fields here, such as orderStatus and date (if needed) */
      });
  
      res.status(201).json(newSell);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateRentSell = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
  
      // Step 1: Logic to update the sell order with the given id in the database
      const updatedSell = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
  
      // Step 2: Get the associated property of the updated order
      const property = await Property.findById(updatedSell.propertyId);
  
      // Step 3: Check if the orderStatus is being changed to "Completed"
      if (orderStatus === 'Completed') {
        // Step 4: Find all other pending orders for the same property
        const pendingOrders = await Order.find({
          propertyId: property._id,
          orderStatus: 'Pending',
          _id: { $ne: updatedSell._id } // Exclude the current updated order from the query
        });
  
        // Step 5: Update the status of all other pending orders to "Cancelled"
        await Promise.all(pendingOrders.map(async (order) => {
          order.orderStatus = 'Cancelled';
          await order.save();
        }));
  
        // Step 6: Update the Property Table status based on the property type
        if (property.type === 'Rent') {
          property.status = 'Rented';
        } else if (property.type === 'Sell') {
          property.status = 'Sold';
        }
  
        // Step 7: Save the updated property status
        await property.save();
      }
  
      res.status(200).json(updatedSell);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const visitingTimeAssign = async (req, res) => {
    try {
      const { id } = req.params;
      const { visitTime } = req.body;
  
      // Step 1: Find the order by ID
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Step 2: Find the associated property of the order
      const property = await Property.findById(order.propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Associated property not found' });
      }
  
      // Step 3: Check if the property is available
      if (property.status !== 'Available') {
        return res.status(400).json({ error: 'This property is not available for visit' });
      }
  
      // Step 4: Update the order's visitTime and orderStatus
      order.visitTime = visitTime;
      order.orderStatus = 'Visit Confirmed';
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  //:::::::::::::::::::: MOST COMPLEX FILTERING STARTS HERE FOR RENT/SELLS PAGE :::::::::::::::::::::::::::::::
  const preparePropertyFilter = (propertyData) => {
    const { name, location, price } = propertyData;
    const filter = {};
  
    if (name && name.trim() !== '') {
      filter.name = { $regex: name.trim(), $options: 'i' }; // Case-insensitive search for name
    }
  
    if (location && location.city && location.city.trim() !== '') {
      filter['location.city'] = { $regex: location.city.trim(), $options: 'i' }; // Case-insensitive search for city
    }
  
    if (price && price >= 0) {
      filter.price = { $gte: price }; // Price greater than or equal to the specified price
    }
  
    return filter;
  };
  
  
  const prepareOrderFilter = (orderData) => {
    const { buyer, seller, orderStatus } = orderData;
    const filter = {};
  
    if (buyer && buyer.trim() !== '') {
      filter.buyer = buyer.trim();
    }
  
    if (seller && seller.trim() !== '') {
      filter.seller = seller.trim();
    }
  
    if (orderStatus && orderStatus.trim() !== '') {
      filter.orderStatus = orderStatus.trim();
    }
  
    return filter;
  };
  

  const orderFiltering = async (req, res) => {
    try {
      const propertyData = req.body.propertyData;
      const orderData = req.body.orderData;
  
      // Prepare filter for Property table
      const propertyFilter = preparePropertyFilter(propertyData);
  
      // Fetch properties based on property filter
      const properties = await Property.find(propertyFilter);
  
      // Get the property IDs of the available properties
      const propertyIds = properties.map((property) => property._id);
  
      // Prepare filter for Order table
      const orderFilter = prepareOrderFilter(orderData);
  
      // Fetch orders related to the available properties from the orders collection
      const orders = await Order.find({
        ...orderFilter,
        propertyId: { $in: propertyIds },
      })
        .populate({
          path: 'propertyId',
          select: 'name images location type price',
        })
        .populate({
          path: 'buyer',
          select: 'name email phone',
        })
        .populate({
          path: 'seller',
          select: 'name email phone',
        });
  
      res.status(200).json(orders);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  //:::::::::::::::::::: MOST COMPLEX FILTERING ENDS HERE FOR RENT/SELLS PAGE :::::::::::::::::::::::::::::::

  const userFilter = async (req, res) => {
    try {
      // Find users with role 'user' and exclude the 'password' field from the query
      const users = await User.find({ role: 'user' }, { password: 0 });
  
      res.status(200).json(users);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = {
  getRentSells,
  createRent,
  createSell,
  updateRentSell,
  visitingTimeAssign,
  orderFiltering,
  userFilter
};
