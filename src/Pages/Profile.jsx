import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaEdit,
  FaSignOutAlt,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaPhone,
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import {
  getUserProfile,
  updateUserProfile,
  logoutUser,
  clearUserSuccess,
  clearUserError,
} from '../redux/slicer/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    // add more fields as needed (address, etc.)
  });

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Show toast on successful update
  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully!');
      dispatch(clearUserSuccess());
      setIsEditing(false);
    }
  }, [success, dispatch]);

  // Show toast on error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [error, dispatch]);

  // Populate edit form when user loads
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit – reset form to current user data
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!editData.name.trim()) {
      toast.warning('Name is required');
      return;
    }
    if (!editData.email.trim() || !/\S+@\S+\.\S+/.test(editData.email)) {
      toast.warning('Please enter a valid email');
      return;
    }

    dispatch(updateUserProfile(editData));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state (initial load)
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <FaSpinner className="text-4xl text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state – only if we have an error and no user (avoid showing error after update if user still exists)
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center pt-20 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="text-3xl text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Profile</h2>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => dispatch(getUserProfile())}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center pt-20 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserCircle className="text-3xl text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Not Logged In</h2>
          <p className="text-gray-600 text-sm mb-4">Please log in to view your profile.</p>
          <Link to="/login">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Main profile view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My <span className="text-red-600">Profile</span>
          </h1>
          <p className="text-gray-600 text-sm">Manage your account details and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Cover / Header */}
          <div className="relative h-28 sm:h-36 bg-gradient-to-r from-red-600 to-red-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <GiHamburger className="text-white/20 text-6xl" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400 rounded-full opacity-10"></div>
          </div>

          {/* Avatar & Name */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center -mt-12 sm:-mt-16">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 text-4xl sm:text-5xl font-bold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {user.name || 'User'}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaUserTag className="text-red-500" />
                    {user.role || 'User'}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-red-500" />
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-2">
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-red-600 rounded-lg font-semibold hover:bg-yellow-300 transition shadow-md hover:shadow-lg text-sm"
                >
                  <FaEdit />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition shadow-md hover:shadow-lg text-sm"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details or Edit Form */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-6">
            {!isEditing ? (
              // View mode
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                    <FaEnvelope className="text-red-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email Address</p>
                      <p className="text-gray-800 font-medium">{user.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                    <FaShieldAlt className="text-red-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Role</p>
                      <p className="text-gray-800 font-medium capitalize">{user.role || 'User'}</p>
                    </div>
                  </div>
                  {user.phone && (
                    <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                      <FaPhone className="text-red-500 mt-1" />
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                        <p className="text-gray-800 font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                    <FaCalendarAlt className="text-red-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Member Since</p>
                      <p className="text-gray-800 font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 md:col-span-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Account Status</p>
                      <p className="text-green-600 font-medium">
                        {user.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Edit mode
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin mx-auto" />
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-gray-50/50 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              Last updated: {formatDate(user.updatedAt)}
            </p>
            <Link to="/settings" className="text-xs text-red-600 hover:underline font-medium">
              Account Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;