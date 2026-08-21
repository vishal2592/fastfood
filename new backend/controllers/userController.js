const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ======================================================
// HELPERS
// ======================================================

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const getClearCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
});

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured in environment variables"
    );
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  phone: user.phone,
  address: user.address,
  profileImage: user.profileImage,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
  lastLogin: user.lastLogin,
});

// ======================================================
// USER REGISTER
// ======================================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
    } = req.body || {};

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",

      ...(typeof phone === "string" && phone.trim()
        ? { phone: phone.trim() }
        : {}),

      ...(typeof address === "string" && address.trim()
        ? { address: address.trim() }
        : {}),
    });

    const token = generateToken(user);

    res.cookie(
      "userToken",
      token,
      getCookieOptions()
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register User Error:", error);

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// USER LOGIN
// ======================================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body || {};

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Only explicitly inactive users are blocked
    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is inactive. Please contact support.",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    user.lastLogin = new Date();

    await user.save();

    const token = generateToken(user);

    res.cookie(
      "userToken",
      token,
      getCookieOptions()
    );

    return res.status(200).json({
      success: true,
      message: "User login successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// GET USER PROFILE
// ======================================================

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "Get User Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// UPDATE USER PROFILE
// ======================================================

const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      currentPassword,
      newPassword,
    } = req.body || {};

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ------------------------------
    // Update Name
    // ------------------------------

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      user.name = name.trim();
    }

    // ------------------------------
    // Update Phone
    // ------------------------------

    if (phone !== undefined) {
      user.phone =
        typeof phone === "string"
          ? phone.trim()
          : phone;
    }

    // ------------------------------
    // Update Address
    // ------------------------------

    if (address !== undefined) {
      user.address =
        typeof address === "string"
          ? address.trim()
          : address;
    }

    // ------------------------------
    // Password Validation
    // ------------------------------

    const hasCurrentPassword =
      typeof currentPassword === "string" &&
      currentPassword.length > 0;

    const hasNewPassword =
      typeof newPassword === "string" &&
      newPassword.length > 0;

    if (
      hasCurrentPassword !==
      hasNewPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Both currentPassword and newPassword are required to change password",
      });
    }

    // ------------------------------
    // Change Password
    // ------------------------------

    if (
      hasCurrentPassword &&
      hasNewPassword
    ) {
      if (!user.password) {
        return res.status(400).json({
          success: false,
          message:
            "Password cannot be changed for this account",
        });
      }

      const isPasswordCorrect =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message:
            "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be at least 6 characters",
        });
      }

      if (
        currentPassword === newPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be different from current password",
        });
      }

      user.password =
        await bcrypt.hash(
          newPassword,
          12
        );
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error(
      "Update User Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// USER LOGOUT
// ======================================================

const logoutUser = async (req, res) => {
  try {
    res.clearCookie(
      "userToken",
      getClearCookieOptions()
    );

    return res.status(200).json({
      success: true,
      message: "User logout successful",
    });
  } catch (error) {
    console.error(
      "Logout User Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// GET ALL USERS
// ADMIN ONLY
// ======================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(
      "Get All Users Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// DELETE USER
// ADMIN ONLY
// ======================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting last admin
    if (user.role === "admin") {
      const adminCount =
        await User.countDocuments({
          role: "admin",
        });

      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete the last admin user",
        });
      }
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete User Error:",
      error
    );

    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// TOGGLE USER STATUS
// ADMIN ONLY
// ======================================================

const toggleUserStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deactivating last active admin
    if (
      user.role === "admin" &&
      user.isActive !== false
    ) {
      const activeAdminCount =
        await User.countDocuments({
          role: "admin",
          isActive: { $ne: false },
        });

      if (activeAdminCount <= 1) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot deactivate the last active admin",
        });
      }
    }

    user.isActive =
      user.isActive === false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${
        user.isActive
          ? "activated"
          : "deactivated"
      } successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Toggle User Status Error:",
      error
    );

    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getAllUsers,
  deleteUser,
  toggleUserStatus,
};