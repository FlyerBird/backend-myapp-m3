const router = require('express').Router();
const Product = require('../models/Product');
const ErrorResponse = require('../utils/error');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');
const fileUploader = require("../config/cloudinary.config");

// @desc    Get all products
// @route   GET /api/v1/products/
// @access  Public
// to http://localhost:8000/api/v1/product returns the following response.
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products) {
          next(new ErrorResponse('No product found', 204));
        }
        res.status(200).json({ data: products })
      } catch (error) {
        next(error);
      }
    });

// @desc    Get single product
// @route   GET /api/v1/product/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        next(new ErrorResponse(`Product not found by id: ${id}`, 404));
      }
      res.status(200).json({ data: product })
    } catch (error) {
      next(error);
    }
  });

// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/product/upload
// @access  Private
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new ErrorResponse('Error uploading the image', 500));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

// @desc    Create a product
// @route   POST /
// @access  Public
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
   const { title, description, price, details, images } = req.body;
    try {
      const product = await Product.create({ title, description, price, details, images });
      res.status(201).json({ data: product })
    } catch (error) {
      next(error);
    }
  });

// @desc    Edit a product
// @route   PUT /:id
// @access  Public
router.put('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, details, images } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { title, description, price, details, images }, { new: true });
    res.status(202).json({ data: updatedProduct })
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Public
router.delete('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      next(new ErrorResponse(`Product not found by id: ${id}`, 404));
    } else {
      const deleted = await Product.findByIdAndDelete(id);
      res.status(202).json({ data: deleted });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;