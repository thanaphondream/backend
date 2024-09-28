const cloudinary = require('cloudinary').v2;

// Configure Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Use environment variable for cloud name
    api_key: process.env.CLOUDINARY_API_KEY,        // Use environment variable for API key
    api_secret: process.env.CLOUDINARY_API_SECRET,  // Use environment variable for API secret
    secure: true                                    // Enable HTTPS
});


module.exports = cloudinary;