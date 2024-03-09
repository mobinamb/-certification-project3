const express = require('express');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');
const peopleRoutes = require('./routes/people');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/people', peopleRoutes);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
