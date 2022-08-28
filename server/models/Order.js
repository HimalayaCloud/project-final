const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer_name: {
    type: String,
    required: true,
  },
  customer_number: {
    type: Number,
    required: true,
  },
  customer_email: {
    type: String,
  },
  customer_model: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Chưa liên hệ", "Đã liên hệ"],
    default: "Chưa liên hệ",
  },
  create_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("orders", OrderSchema);
