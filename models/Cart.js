const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: "Product"}],
    idUser: {type: Schema.Types.ObjectId, ref: "User"}
  
},
  {
    timestamps: true
  });

module.exports = model("Cart", cartSchema);