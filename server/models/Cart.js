const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  guest_id: {
    type: String,
  },
  cart_products: [
    {
      vehicle_id: String,
      quantity: Number
    }
  ],
});

module.exports = mongoose.model("cart", CartSchema);
