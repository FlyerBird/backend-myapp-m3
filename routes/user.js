const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Edit an user
// @route   PUT /:id
// @access  Public
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { email, username, hashedPassword } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { email, username, hashedPassword }, { new: true });
      res.status(202).json({ data: updatedUser })
    } catch (error) {
      next(error);
    }
  });

// @desc    Delete an user
// @route   DELETE /api/v1/user/:id
// @access  Public
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        next(new ErrorResponse(`User not found by id: ${id}`, 404));
      } else {
        const deleted = await User.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  });








module.exports = router;