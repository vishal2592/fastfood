const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/protect");

router.post("/add", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/remove/:productId", protect, removeFromWishlist);
router.delete("/clear", protect, clearWishlist);

module.exports = router;
