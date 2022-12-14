const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const authRole = require("../middleware/auth");
const Vehicles = require("../models/ConstructionVehicle");
const { uploadFile } = require("../s3");
const { makeid } = require("./utils");

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
    driver_link,
  } = req.body;

  // console.log(req.files.picture, " picture uploaded!!!!!!!!");
  // console.log(Buffer.from(req.files.picture.data).toString('base64'), "Buffer image base64");

  // simple validation
  if (!vehicle_type || !req.files) {
    return res.status(400).json({
      success: false,
      message: "Vehicle Type and Picture is required",
    });
  }

  const pictureId = makeid(10);
  const resultUpload = await uploadFile({
    ...req.files.picture,
    path: req.files.picture.data,
    id: pictureId,
  });

  const pictureUrl = resultUpload.Location;

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
      pictureUrl,
      pictureId,
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

router.get("/", async (req, res) => {
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

  const pictureId = makeid(10);
  let pictureUrl = "";
  if (picture !== "") {
    const resultUpload = await uploadFile({
      ...req.files.picture,
      path: req.files.picture.data,
      id: pictureId,
    });
    pictureUrl = resultUpload.Location;
  } else {
    const currentVehicle = await Vehicles.findOne({ _id: req.params.id });
    pictureUrl = currentVehicle.pictureUrl;
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
      pictureUrl,
      driver_link,
    };

    const vehicleUpdateCondition = { _id: req.params.id };
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
      vehicle: updatedVehicle,
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
    const vehicleDeleteCondition = { _id: req.params.id };
    const deletedVehicle = await Vehicles.findOneAndDelete(
      vehicleDeleteCondition
    );

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

// Search Vehicle

router.post("/search", verifyToken, async (req, res) => {
  try {
    const {
      vehicle_name,
      vehicle_tonnage,
      vehicle_type,
      bucket_capacity,
      price_range,
    } = req.body;

    const vehicles = await Vehicles.find({
      price: { $gte: price_range.minPrice, $lte: price_range.maxPrice },
    });

    const searchData = vehicles.filter((vehicle) => {
      const vehicleSeachName = vehicle_name
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
      const vehicleName = vehicle.vehicle_name
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");

      if (
        vehicle_name == "" &&
        vehicle_tonnage == "" &&
        vehicle_type == "" &&
        bucket_capacity == ""
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle_tonnage == "" &&
        vehicle_type == "" &&
        bucket_capacity == ""
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle.vehicle_tonnage == vehicle_tonnage &&
        vehicle_type == "" &&
        bucket_capacity == ""
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle_tonnage == "" &&
        vehicle.vehicle_type == vehicle_type &&
        bucket_capacity == ""
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle_tonnage == "" &&
        vehicle_type == "" &&
        vehicle.bucket_capacity == bucket_capacity
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle.vehicle_tonnage == vehicle_tonnage &&
        vehicle.vehicle_type == vehicle_type &&
        bucket_capacity == ""
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle.vehicle_tonnage == vehicle_tonnage &&
        vehicle_type == "" &&
        vehicle.bucket_capacity == bucket_capacity
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle.vehicle_tonnage == vehicle_tonnage &&
        vehicle.vehicle_type == vehicle_type &&
        vehicle.bucket_capacity == bucket_capacity
      ) {
        return vehicle;
      } else if (
        vehicleName.includes(vehicleSeachName) &&
        vehicle_tonnage == "" &&
        vehicle.vehicle_type == vehicle_type &&
        vehicle.bucket_capacity == bucket_capacity
      ) {
        return vehicle;
      }
    });

    console.log(searchData);

    res.json({
      success: true,
      message: "search successful",
      vehicles: searchData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

module.exports = router;
