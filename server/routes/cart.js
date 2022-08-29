const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart");
// @route Get api/auth
// @desc check if user is authenticated
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log(req.guestId);
    const cart = await Cart.findOne({ guest_id: req.guestId });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }
    // all good
    res.json({
      success: true,
      message: "Cart Founded",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

router.put("/update", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ guest_id: req.guestId });
  const { guest_id, vehicle_id, qty, amount } = req.body;
  let updatedCart = { guest_id, cart: [{ vehicle_id, qty, amount }] };
  cart.cart_products.push(updatedCart);
  await Cart.updateOne(
    { guest_id: req.guestId },
    { cart_products: cart.cart_products }
  );

  const cart2 = await Cart.findOne({ guest_id: req.guestId });
  console.log(cart2,'aaaaaaaaaaa')

});

module.exports = router;
