const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Cart = require("../models/Cart");
// @route Get api/auth
// @desc check if user is authenticated
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
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

router.put("/update-quantity", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ guest_id: req.guestId });
  const updated_cart = req.body.cart_products;
  await Cart.findOneAndUpdate(
    { guest_id: req.guestId },
    {
      guest_id: req.guestId,
      cart_products: updated_cart,
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "Update successful",
    cart: {
      guest_id: req.guestId,
      __v: 0,
      _id: cart._id,
      cart_products: updated_cart,
    },
  });
});

router.put("/update", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ guest_id: req.guestId });
  const { vehicle_id, vehicle_name, vehicle_price, pictureUrl, quantity } =
    req.body;
  let updatedCart = {
    vehicle_id,
    vehicle_name,
    vehicle_price,
    pictureUrl,
    quantity,
  };
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
  console.log(cart);
  await Cart.findOneAndUpdate(
    { guest_id: req.guestId },
    {
      guest_id: req.guestId,
      cart_products: [...cart.cart_products],
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "Update Success!",
    cart: {
      guest_id: req.guestId,
      __v: 0,
      _id: cart._id,
      cart_products: [...cart.cart_products],
    },
  });

  // const cart2 = await Cart.findOne({ guest_id: req.guestId });
  // console.log(JSON.stringify(cart2), "bbbbbbbb");
});

router.put("/delete-product", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ guest_id: req.guestId });
  const updated_cart = cart.cart_products.map((product) => {
    if (product.vehicle_id !== req.body.vehicle_id) {
      return product;
    }
  });

  updated_cart.map((product, index) => {
    if (!product) {
      updated_cart.splice(index, 1);
    }
  });

  await Cart.findOneAndUpdate(
    { guest_id: req.guestId },
    {
      guest_id: req.guestId,  
      cart_products: updated_cart,
    },
    { new: true }
  );

  // console.log(updated_cart);
  res.json({
    success: true,
    message: "Delete successful",
    cart: {
      guest_id: req.guestId,
      __v: 0,
      _id: cart._id,
      cart_products: updated_cart,
    },
  });
});

module.exports = router;
