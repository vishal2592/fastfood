const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // ======================================================
    // 1. CHECK COOKIE TOKEN
    // ======================================================

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ======================================================
    // 2. CHECK AUTHORIZATION HEADER
    // ======================================================

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ======================================================
    // 3. TOKEN NOT FOUND
    // ======================================================

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // ======================================================
    // 4. VERIFY TOKEN
    // ======================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ======================================================
    // 5. FIND USER
    // ======================================================

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // ======================================================
    // 6. CHECK ACTIVE STATUS
    // ======================================================

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    // ======================================================
    // 7. ATTACH USER TO REQUEST
    // ======================================================

    req.user = user;

    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};

module.exports = protect;