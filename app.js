// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingsRoutes = require('./routes/bookings');

// Create Express app
const app = express();

// Allow connectDB to build the URI from individual env vars when MONGODB_URI is not provided
const MONGODB_URI = process.env.MONGODB_URI || '';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRoutes);

// Root
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Synergia Bookings API is running' });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler (optional enhanced)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

// Export both the app and connection details for different usage (serverless vs traditional)
module.exports = { app, MONGODB_URI };