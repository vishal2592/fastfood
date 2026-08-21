const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    const requestedQuantity = Number(quantity);

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be a valid positive number" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.status !== "Available" || product.stock <= 0) {
      return res.status(400).json({ success: false, message: "Product is out of stock" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      if (requestedQuantity > product.stock) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items available` });
      }

      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: requestedQuantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId.toString()
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + requestedQuantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({ success: false, message: `Only ${product.stock} items available` });
        }

        existingItem.quantity = newQuantity;
      } else {
        if (requestedQuantity > product.stock) {
          return res.status(400).json({ success: false, message: `Only ${product.stock} items available` });
        }

        cart.items.push({ product: productId, quantity: requestedQuantity });
      }
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      cart: cart || { user: req.user.id, items: [] },
    });
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get cart",
      error: error.message,
    });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const newQuantity = Number(quantity);

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.status !== "Available" || product.stock < newQuantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available`,
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = newQuantity;
    await cart.save();

    await cart.populate({
      path: "items.product",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart,
    });
  } catch (error) {
    console.error("Update Cart Quantity Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const oldLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    if (oldLength === cart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};
