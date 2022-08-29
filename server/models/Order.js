const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  transaction_id: {
    type: Schema.Types.ObjectId,
    ref: "transactions",
  },
  transaction_id: {
    type: Schema.Types.ObjectId,
    ref: "vehicles",
  },
  qty: {
    type: Number,
    default: "0"
  },
  amount: {
    type: Number,
    default: "0"
  },
  data: {
    type: String,
  },
  status: {
    type: Number,
    default : "0"
  },
  create_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("orders", OrderSchema);
