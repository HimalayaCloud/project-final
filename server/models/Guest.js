const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  guest_name: {
    type: String,
    required: true,
  },
  guest_email: {
    type: String,
    required: true,
    unique: true,
  },
  guest_phone: {
    type: String,
  },
  guest_address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("guests", GuestSchema);
