const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Load environment variables from .env file
dotenv.config();

// Import UserModel route
const router = require("./routes/api.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

// Connect to the database
const connectDB = require("./config/db.js");
connectDB(); // Call the connectDB function to connect to the MongoDB

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

// API routes
app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
