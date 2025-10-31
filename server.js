// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;
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

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
