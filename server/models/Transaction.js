const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  status: {
    type: Number,
    default: 0,
  },
  guest_id: {
    type: Schema.Types.ObjectId,
    ref: "guests",
    required: true,
  },
  guest_name: {
    type: String,
    required: true,
  },
  guest_email: {
    type: String,
  },
  guest_phone: {
    type: Number,
  },
  guest_address: {
    type: String,
  },
  amount: {
    type: Number,
  },
  order_details: [
    {
      vehicle_id: String,
      vehicle_name: String,
      vehicle_price: Number,
      pictureUrl: String,
      quantity: Number
    }
  ],
  payment: {
    type: String,
  },
  payment_info: {
    type: String,
  },
  message: {
    type: String,
  },
  security: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transactions", TransactionSchema);
