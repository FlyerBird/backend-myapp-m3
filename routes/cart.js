const router = require('express').Router();
const Cart = require('../models/Cart');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');


// @desc    Get Cart
// @route   GET /api/v1/products-cart/
// @access  Public
// to http://localhost:8000/api/v1/cart returns the following response.
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const cart = await Cart.find({idUser: req.payload._id}).populate('products');
        if (cart.length < 1) {
          next(new ErrorResponse('You have no products added', 204));
        }
        res.status(200).json({ data: cart })
      } catch (error) {
        next(error);
      }
    });

  // @desc    Create a product in Cart
// @route   POST /
// @access  Public
router.post('/', isAuthenticated, async (req, res, next) => {
    const { productId } = req.body;
     try {
        const cart = await Cart.find({idUser: req.payload._id});
        if(cart.length > 0) {
        const updatedCart = await Cart.findByIdAndUpdate(cart[0]._id, { $push: {products: productId } }, { new: true });   
        res.status(200).json({ data: updatedCart})
        } else {
            const newCart = await Cart.create({ products: [productId], idUser: req.payload._id });
            res.status(201).json({ data: newCart })
        }
     } catch (error) {
       next(error);
     }
   });

  // @desc    Delete a product in Cart
  // @route   DELETE /api/v1/products-cart/:id
  // @access  Public
  router.put('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    try {
      const cartUser = await Cart.find({idUser: req.payload._id}).populate('products');
      if (!cartUser) {
        next(new ErrorResponse(`Cart not found by id: ${id}`, 404));
      } else {
        const cartUserUpdated = await cartUser.products.pull(id);
        cartUser.save();
        const newCart = await Cart.find(cartUserUpdated, {idUser: req.payload._id})
        res.status(202).json({ data: newCart });
      }
    } catch (error) {
      next(error);
    }
  });


module.exports = router;