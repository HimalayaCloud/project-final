const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Vehicles = require("../models/ConstructionVehicle");

//  @route POST api/posts
//  @desc Create a new post
//  @access Private

router.post("/", verifyToken, async (req, res) => {
  const {
    vehicle_type,
    vehicle_name,
    vehicle_branch,
    wheel_type,
    manufacturer,
    manufacturer_country,
    vehicle_model,
    manufacturer_year,
    engine_capacity,
    bucket_capacity,
    vehicle_tonnage,
    hours_worked,
    price,
    vehicle_status,
    description,
    picture,
    driver_link,
  } = req.body;

  // simple validation
  if (!vehicle_type) {
    return res
      .status(400)
      .json({ success: false, message: "Vehicle Type is required" });
  }

  try {
    const newVehicle = new Vehicles({
      vehicle_type,
      vehicle_name,
      vehicle_branch,
      wheel_type,
      manufacturer,
      manufacturer_country,
      vehicle_model,
      manufacturer_year,
      engine_capacity,
      bucket_capacity,
      vehicle_tonnage,
      hours_worked,
      price,
      vehicle_status,
      description,
      picture,
      driver_link,
      user: req.userId,
    });

    await newVehicle.save();

    res.json({
      success: true,
      message: "Thêm thông tin xe thành công",
      vehicle_info: newVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

//  @route GET api/posts
//  @desc GET post
//  @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    // const posts = await Post.find({ user: req.userId }).populate("user", [
    //   "username",
    // ]);
    const vehicles = await Vehicles.find();
    res.json({ success: true, vehicles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

//  @route PUT api/posts
//  @desc Update post
//  @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const {
    vehicle_type,
    vehicle_name,
    vehicle_branch,
    wheel_type,
    manufacturer,
    manufacturer_country,
    vehicle_model,
    manufacturer_year,
    engine_capacity,
    bucket_capacity,
    vehicle_tonnage,
    hours_worked,
    price,
    vehicle_status,
    description,
    picture,
    driver_link,
  } = req.body;
  if (!vehicle_type) {
    return res
      .status(400)
      .json({ success: false, message: "Vehicle Type is required" });
  }

  try {
    let updatedVehicle = {
        vehicle_type,
        vehicle_name,
        vehicle_branch,
        wheel_type,
        manufacturer,
        manufacturer_country,
        vehicle_model,
        manufacturer_year,
        engine_capacity,
        bucket_capacity,
        vehicle_tonnage,
        hours_worked,
        price,
        vehicle_status,
        description,
        picture,
        driver_link,
    };

    const vehicleUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedVehicle = await Vehicles.findOneAndUpdate(
      vehicleUpdateCondition,
      updatedVehicle,
      { new: true }
    );

    // User not authorized to update post
    if (!updatedVehicle) {
      return res.status(401).json({
        success: false,
        message: "Vehicle not found or user is not authorized",
      });
    }
    // All good

    res.json({
      success: true,
      message: "Thay đổi dữ liệu thành công",
      post: updatedVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

//  @route Delete api/posts
//  @desc Delete post
//  @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const vehicleDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedVehicle = await Vehicles.findOneAndDelete(vehicleDeleteCondition);

    // User not authorized to delete post
    if (!deletedVehicle) {
      return res.status(401).json({
        success: false,
        message: "Vehicle not found or user is not authorized",
      });
    }
    // All Good
    res.json({
      success: true,
      message: "vehicle deleted successfully",
      vehicle: deletedVehicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

module.exports = router;
