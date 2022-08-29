const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  guest_id: {
    type: String,
  },
  cart_products: [],
});

module.exports = mongoose.model("cart", CartSchema);
