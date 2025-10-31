// server.js - for local development
const { app, MONGODB_URI } = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

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
