const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const Cart = require("../models/Cart");
const { response } = require("express");
// @route Get api/auth
// @desc check if user is authenticated
// @access Public
router.post("/", verifyToken, async (req, res) => {
  const {
    guest_id,
    guest_name,
    guest_email,
    guest_phone,
    guest_address,
    amount,
    order_details
  } = req.body.transactionInfo;

  // console.log(req.files.picture, " picture uploaded!!!!!!!!");
  // console.log(Buffer.from(req.files.picture.data).toString('base64'), "Buffer image base64");
  console.log(req.body);
  // simple validation
  if (!guest_id) {
    return res.status(400).json({
      success: false,
      message: "Guest Id is required",
    });
  }

  try {
    const newTransaction = new Transaction({
      guest_id,
      guest_name,
      guest_email,
      guest_phone,
      guest_address,
      amount,
      order_details
    });

    await newTransaction.save();

    await Cart.findOneAndUpdate(
      { guest_id: req.guestId },
      { guest_id: req.guestId, cart_products: [] }
    );

    res.json({
      success: true,
      message: "Tạo đơn hàng thành công",
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction not found" });
    }
    res.json({
      success: true,
      message: "Transaction successfully found",
      transactions: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

router.put("/update-status", verifyToken, async (req, res) => {
  try {
    const updated_transaction = req.body.transaction_info;

    await Transaction.findOneAndUpdate(
      { _id: updated_transaction._id },
      updated_transaction
    );

    res.json({
      success: true,
      message: "Transaction successfully found",
      updated_transaction: updated_transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Transaction.findOneAndDelete((_id = req.params.id));
    res.json({
      success: true,
      message: "Transaction delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

module.exports = router;
