const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else {
      const exists = wishlist.products.some(
        (id) => id.toString() === productId.toString()
      );

      if (exists) {
        await wishlist.populate({
          path: "products",
          populate: { path: "category" },
        });

        return res.status(400).json({
          success: false,
          message: "Product already exists in wishlist",
          wishlist,
        });
      }

      wishlist.products.push(productId);
    }

    await wishlist.save();

    await wishlist.populate({
      path: "products",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Add Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate({
      path: "products",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      wishlist: wishlist || { user: req.user.id, products: [] },
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get wishlist",
      error: error.message,
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    const oldLength = wishlist.products.length;

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString()
    );

    if (oldLength === wishlist.products.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    await wishlist.save();

    await wishlist.populate({
      path: "products",
      populate: { path: "category" },
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      wishlist,
    });
  } catch (error) {
    console.error("Clear Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
      error: error.message,
    });
  }
};
