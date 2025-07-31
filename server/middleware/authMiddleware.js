const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      next();
    } catch (error) {
      console.log("Auth failed", error);
      res.status(401);
      throw new Error("Invalid Request : Unauthorised", error);
    }
  } else {
    res.status(401);
    throw new Error("Invalid Request : Unauthorised");
  }
};

module.exports = { authMiddleware };
