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
  const { guest_id, vehicle_id, quantity } = req.body;
  let updatedCart = { vehicle_id, quantity };
  if (
    cart.cart_products.findIndex(
      (product) => product.vehicle_id === vehicle_id
    ) > -1
  ) {
    cart.cart_products.forEach((product, index) => {
      if (product.vehicle_id === vehicle_id) {
        cart.cart_products[index].quantity += quantity;
      }
    });
  } else cart.cart_products.push(updatedCart);
  await Cart.findOneAndUpdate(
    { guest_id: req.guestId },
    {
      guest_id: req.guestId,
      cart_products: [...cart.cart_products],
    },
    { new: true }
  );

  const cart2 = await Cart.findOne({ guest_id: req.guestId });
  console.log(JSON.stringify(cart2), "bbbbbbbb");
});

module.exports = router;
