import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { getAdminProfile, logoutAdmin } from '../redux/slicer/adminSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, loading, error, success } = useSelector((state) => state.admin);

  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  // Redirect if not logged in (optional – you might want to handle this via protected routes)
  useEffect(() => {
    if (!loading && !admin && !error) {
      // If no admin and not loading, maybe redirect to login
      // But we'll show a message instead to keep it user-friendly
    }
  }, [loading, admin, error]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    dispatch(resetAdminState());
    navigate('/login');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // You can implement edit logic here (e.g., open modal or navigate to edit page)
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <FaSpinner className="text-4xl text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center pt-20 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="text-3xl text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Profile</h2>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button
            onClick={() => dispatch(getAdminProfile())}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!admin) {
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
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400 rounded-full opacity-10"></div>
          </div>

          {/* Avatar & Name */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center -mt-12 sm:-mt-16">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  {admin.avatar ? (
                    <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 text-4xl sm:text-5xl font-bold">
                      {admin.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {admin.name || 'Admin'}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaUserTag className="text-red-500" />
                    {admin.role || 'Admin'}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-red-500" />
                    Joined {formatDate(admin.createdAt)}
                  </span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-2">
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-red-600 rounded-lg font-semibold hover:bg-yellow-300 transition shadow-md hover:shadow-lg text-sm"
                >
                  <FaEdit />
                  Edit
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

          {/* Profile Details */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <FaEnvelope className="text-red-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <p className="text-gray-800 font-medium">{admin.email || 'N/A'}</p>
                </div>
              </div>

              {/* Role */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <FaShieldAlt className="text-red-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Role</p>
                  <p className="text-gray-800 font-medium capitalize">{admin.role || 'Admin'}</p>
                </div>
              </div>

              {/* Phone – if available in schema */}
              {admin.phone && (
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                  <FaPhone className="text-red-500 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                    <p className="text-gray-800 font-medium">{admin.phone}</p>
                  </div>
                </div>
              )}

              {/* Joined Date */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <FaCalendarAlt className="text-red-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Member Since</p>
                  <p className="text-gray-800 font-medium">{formatDate(admin.createdAt)}</p>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 md:col-span-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Account Status</p>
                  <p className="text-green-600 font-medium">
                    {admin.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info / Actions */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-gray-50/50 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              Last updated: {formatDate(admin.updatedAt)}
            </p>
            <Link to="/settings" className="text-xs text-red-600 hover:underline font-medium">
              Account Settings →
            </Link>
          </div>
        </div>

        {/* Edit Mode placeholder – you can implement a modal or inline edit here */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Edit functionality coming soon. You can update your profile information here.
              </p>
              {/* Placeholder form fields */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={admin.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={admin.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  onClick={() => {
                    // Placeholder save
                    alert('Profile update feature coming soon!');
                    setIsEditing(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;