// api/index.js
const { app, MONGODB_URI } = require('../app');
const connectDB = require('../config/db');

let isConnected = false;

// Handler for all routes
module.exports = async (req, res) => {
  try {
    // Connect to MongoDB (if not already connected)
    if (!isConnected) {
      await connectDB(MONGODB_URI);
      isConnected = true;
      console.log('MongoDB connected in serverless function');
    }

    // Handle the request using Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};