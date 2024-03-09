// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Person'); // Assuming you have a User model

// Login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // If user does not exist, return error
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords don't match, return error
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
  
      // Send token to the client in a secure HTTP-only cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
  
      res.status(200).json({ token }); // You can also send the token in the response body if needed
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
