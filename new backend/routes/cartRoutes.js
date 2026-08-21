const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/protect");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCartQuantity);
router.delete("/remove/:productId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
