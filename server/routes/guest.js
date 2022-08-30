const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const Guest = require("../models/Guest");
const Cart = require("../models/Cart");
// @route Get api/auth
// @desc check if guest is authenticated
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const guest = await Guest.findById(req.guestId).select("-password");
    if (!guest) {
      return res
        .status(400)
        .json({ success: false, message: "guest not found" });
    }
    // all good
    const cart = await Cart.findOne({ guest_id: req.guestId });
    if (!cart) {
      const newCart = new Cart({ guest_id: req.guestId, cart_products: [] });
      await newCart.save();
    }
    res.json({
      success: true,
      message: "guest authenticated",
      guest: guest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

//  @route POST api/auth/register
//  @desc Register a guest
//  @access Public

router.post("/register", async (req, res) => {
  const { guest_name, guest_email, password, guest_phone, guest_address  } = req.body;

  // simple validation
  if (!guest_name || !password || !guest_email)
    return res
      .status(400)
      .json({ success: false, message: "Invalid guestname or password" });
  try {
    // check for existing guestname
    const guest = await Guest.findOne({ guest_email: guest_email });
    if (guest) {
      return res
        .status(400)
        .json({ success: false, message: "Already registered guestname" });
    }
    // All Good
    const harshedPassword = await argon2.hash(password);
    const newGuest = new Guest({
      guest_name: guest_name,
      guest_email: guest_email,
      password: harshedPassword,
      guest_phone:guest_phone,
      guest_address:guest_address
    });

    await newGuest.save();

    // Return token
    const accessToken = jwt.sign(
      { guestId: newGuest._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "guest created successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

//  @route POST api/auth/login
//  @desc login a guest
//  @access Public

router.post("/login", async (req, res) => {
  const { password, guest_email } = req.body;

  // simple validation
  if (!guest_email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid guest_name or password" });
  }

  try {
    // Check for existing guest
    const guest = await Guest.findOne({ guest_email: guest_email });
    if (!guest) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid guest_email" });
    }

    // guest name found
    const passwordValid = await argon2.verify(guest.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // All good
    // Return token
    const accessToken = jwt.sign(
      { guestId: guest._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "guest login successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal Server Error" });
  }
});

module.exports = router;
