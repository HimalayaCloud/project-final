const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConstructionVehicle = new Schema({
  vehicle_type: {
    type: String,
    required: true,
  },
  vehicle_name: {
    type: String,
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
  manufacturer_year: {
    type: Number,
  },
  engine_capacity: {
    type: Number,
    required: true,
  },
  bucket_capacity: {
    type: Number,
  },
  vehicle_tonnage: {
    type: Number,
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
    enum: ["Đang Ở Nước Ngoài", "Đang Ở Việt Nam", "Đã Bán"],
    required: true,
  },
  description: {
    type: String,
  },
  pictureUrl: {
    type: String,
  },
  pictureId: {
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
