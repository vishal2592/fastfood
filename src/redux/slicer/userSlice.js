import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ======================
// REGISTER USER
// ======================

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

// ======================
// LOGIN USER
// ======================

export const loginUser = createAsyncThunk(
  "user/login",

  async (userData, { rejectWithValue }) => {
    try {
      console.log("LOGIN REQUEST START");

      const { data } = await api.post("/users/login", userData);

      console.log("LOGIN RESPONSE:", data);

      return data;

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

// ======================
// LOGOUT USER
// ======================

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/logout");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout Failed"
      );
    }
  }
);

// ======================
// GET PROFILE
// ======================

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed To Fetch Profile"
      );
    }
  }
);

// ======================
// UPDATE PROFILE
// ======================

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/users/profile", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update Failed"
      );
    }
  }
);

// ======================
// GET ALL USERS
// ======================

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/all");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed To Fetch Users"
      );
    }
  }
);

// ======================
// DELETE USER
// ======================

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/users/${id}`);
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete Failed"
      );
    }
  }
);

// ======================
// TOGGLE USER STATUS
// ======================

export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/user/${id}/toggle-status`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Status Update Failed"
      );
    }
  }
);

// ======================
// INITIAL STATE
// ======================

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  success: false,
};

// ======================
// SLICE
// ======================

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearUserSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // state.user = action.payload.user;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        console.log("LOGIN PENDING");

        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("LOGIN FULFILLED", action.payload);

        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        console.log("LOGIN REJECTED", action.payload);

        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = true;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.success = true;
      })

      // Get All Users
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
      })

      // Toggle Status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload.user.id
            ? {
              ...user,
              isActive: action.payload.user.isActive,
            }
            : user
        );
      })

      // Common Pending
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Common Rejected
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearUserError,
  clearUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;