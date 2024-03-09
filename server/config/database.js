const mongoose = require('mongoose');

// MongoDB connection string
const dbURI = 'mongodb+srv://mobina:gXs0Lqp1Tf1AZkJD@cluster0.cbs757u.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
