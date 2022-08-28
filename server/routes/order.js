const express = require("express");

const router = express.Router();
const Orders = require("../models/Order");

router.post("/", async (req, res) => {
  const { customer_name, customer_number, customer_email, customer_model } =
    req.body;

  if (!customer_name || !customer_number) {
    return res.status(400).json({
      success: false,
      message: "Name and Number are required",
    });
  }

  try {
    const newOrder = new Orders({
      customer_name,
      customer_number,
      customer_email,
      customer_model,
    });

    await newOrder.save();
    res.json({
      success: true,
      message: "Order was successfully created",
      order_info: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const newStatus = req.body
  console.log('dayne', newStatus)
  try {
    const orderUpdateCondition = { _id: req.params.id };
    const orderUpdateInfo = await Orders.findOne(orderUpdateCondition)
    console.log('dayneee', orderUpdateInfo)
    const updatedOrder = await Orders.findOneAndUpdate(
      orderUpdateCondition,
      { status: newStatus.status },
      { new: true }
    );

    const x = await Orders.findOne(orderUpdateCondition);
    console.log(x, 'aaaaaaaaaaaaaa')

    if (!updatedOrder) {
      return res.status(401).json({
        success: false,
        message: "Order not found or user is not authorized",
      });
    }
    // all good
    res.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

module.exports = router;
