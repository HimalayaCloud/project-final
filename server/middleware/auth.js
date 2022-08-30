const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: " Access Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.guestId = decoded.guestId;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

// const authRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       res.status(401);
//       return res.send("Not allowed");
//     }
//     next();
//   };
// };

module.exports = verifyToken;
// module.exports = authRole;
