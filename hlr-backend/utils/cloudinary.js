const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dde4yk2ib",
  api_key: "399894288911821",
  api_secret: "V9eMm_coH4fZUBMAMNq0RD8Q4go"
});

// Function to upload images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path));
  const results = await Promise.all(uploadPromises);
  return results.map(result => result.secure_url);
};

module.exports = {
  cloudinaryConfig: cloudinary.config,
  uploadImagesToCloudinary
};
