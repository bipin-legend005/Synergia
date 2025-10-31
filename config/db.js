// config/db.js
const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * Accepts a full connection string (mongoUri). If not provided,
 * it will attempt to build one from individual env vars:
 * MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DB, MONGODB_OPTIONS
 */
const connectDB = async (mongoUri) => {
  try {
    let uri = mongoUri && mongoUri.trim() ? mongoUri : '';

    if (!uri) {
      const user = process.env.MONGODB_USER;
      const pass = process.env.MONGODB_PASSWORD;
      const host = process.env.MONGODB_HOST || '127.0.0.1';
      const port = process.env.MONGODB_PORT || '27017';
      const db = process.env.MONGODB_DB || 'synergia_db';
      const options = process.env.MONGODB_OPTIONS || '';

      // If user/pass provided, include them. Otherwise build a simple URI.
      if (user && pass) {
        uri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}`;
      } else {
        uri = `mongodb://${host}:${port}/${db}`;
      }

      if (options) {
        // allow passing options either with or without leading ?
        uri += options.startsWith('?') ? options : `?${options}`;
      }
    }

    if (!uri) {
      throw new Error('No MongoDB connection information found in environment');
    }

    await mongoose.connect(uri, {
      // Use mongoose defaults (v7+)
    });

    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    // rethrow so callers can decide how to handle (server start, retry, etc.)
    throw err;
  }
};

module.exports = connectDB;
