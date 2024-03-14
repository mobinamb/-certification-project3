const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');
const peopleRoutes = require('./routes/people');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/login', loginRoutes);

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
