const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Edit an user
// @route   PUT /:id
// @access  Public
router.put('/edit', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    const { email, username, hashedPassword, imageProfile } = req.body;
    // Check if email or password or name are provided as empty string 
  if (email === "" || username === "") {
    return next(new ErrorResponse('Please fill all the fields to register', 400))
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorResponse('Email is not a valid format', 400))
  }
    try {
      const user = await User.findById(req.payload._id);
      if (!user) {
        next(new ErrorResponse('No user found', 404));
        return;
      } else {
        const updatedUser = await User.findByIdAndUpdate(req.payload._id, req.body, { new: true });
        res.status(200).json({ data: updatedUser })
      }
    } catch (error) {
      next(error);
    }
  });

// @desc    Delete an user
// @route   DELETE /api/v1/user/:id
// @access  Public
router.delete('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        next(new ErrorResponse(`User not found by id: ${id}`, 404));
        return;
      } else {
        const deleted = await User.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  });








module.exports = router;