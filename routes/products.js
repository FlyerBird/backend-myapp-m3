const router = require('express').Router();
const Product = require('../models/Product');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all products
// @route   GET /api/v1/products/
// @access  Public
// to http://localhost:8000/api/v1/products returns the following response.
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (!products) {
          next(new ErrorResponse('No products found', 404));
        }
        res.status(200).json({ data: products })
      } catch (error) {
        next(error);
      }
    });

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        next(new ErrorResponse(`Project not found by id: ${id}`, 404));
      }
      res.status(200).json({ data: product })
    } catch (error) {
      next(error);
    }
  });

// @desc    Create a product
// @route   POST /
// @access  Public
router.post('/', async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ data: product })
    } catch (error) {
      next(error);
    }
  });


module.exports = router;