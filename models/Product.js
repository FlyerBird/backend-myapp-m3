const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
  
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Product = model('Product', productSchema);

module.exports = Product;