const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConstructionVehicle = new Schema({
  vehicle_type: {
    type: String,
    required: true,
  },
  vehicle_name: {
    type: String,
    required: true,
  },
  vehicle_branch: {
    type: String,
  },
  wheel_type: {
    type: String,
    // enum: ['TO LEARN', 'LEARNING', 'LEARNED']
  },
  manufacturer: {
    type: String,
    required: true,
  },
  manufacturer_country: {
    type: String,
    required: true,
  },
  vehicle_model: {
    type: String,
    required: true,
  },
  manufacture_year: {
    type: Number,
  },
  engine_capacity: {
    type: String,
    required: true,
  },
  bucket_capacity: {
    type: String,
  },
  vehicle_tonnage: {
    type: String,
  },
  hours_worked: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  vehicle_status: {
    type: String,
    enum: ['Đang ở nước ngoài', 'Đang ở Việt Nam', 'Đã bán'],
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  driver_link: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("vehicles", ConstructionVehicle);
