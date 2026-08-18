// pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../redux/slicer/adminSlice'; // adjust path
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
  FaShieldAlt,
  FaGift,
  FaStar
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error, success } = useSelector((state) => state.admin);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Redirect on success
  useEffect(() => {
    if (success) {
      // Optionally reset success state if you have reset action
      // dispatch(resetAdminState());
      navigate('/');
    }
  }, [success, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Dispatch login thunk
    dispatch(loginAdmin({
      email: formData.email,
      password: formData.password
    }));

    // Save email if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialLogin = (provider) => {
    // Social login not implemented – placeholder
    alert(`Social login with ${provider} not implemented yet.`);
  };

  const benefits = [
    { icon: FaGift, text: 'Exclusive offers', color: 'text-red-500' },
    { icon: FaStar, text: 'Loyalty rewards', color: 'text-yellow-500' },
    { icon: FaShieldAlt, text: 'Secure checkout', color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 pt-20">
      {/* Success Overlay */}
      {success && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-sm mb-4">Redirecting to your dashboard...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col lg:flex-row">
        {/* Left Side - Login Form */}
        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <GiHamburger className="text-2xl text-red-600" />
            <span className="text-xl font-bold text-gray-800">FastFood</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to continue your delicious journey
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-300"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
            >
              <FaFacebook className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Facebook</span>
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              <FaApple className="text-gray-700" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-sm ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <FaTimes className="text-[10px]" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-sm ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <FaTimes className="text-[10px]" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            {/* Display Redux error */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                <FaTimes className="text-xs" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-700 hover:to-red-800 hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side - Branding (unchanged) */}
        <div className="hidden lg:flex lg:w-96 bg-gradient-to-br from-red-600 to-red-700 p-10 flex-col justify-between">
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400 rounded-full opacity-10"></div>
          </div>
          <div className="relative z-10">
            <div className="text-white/20 text-6xl mb-8">🍔</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to<br />
              <span className="text-yellow-300">FastFood</span> Family
            </h2>
            <p className="text-red-100 text-sm mb-8">
              Sign in to access exclusive deals, track your orders, and earn loyalty rewards.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className={`text-sm ${benefit.color}`} />
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center gap-1 text-xs">
                  <FaShieldAlt className="text-yellow-400" />
                  Secure Login
                </span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="flex items-center gap-1 text-xs">
                  <FaCheckCircle className="text-green-400" />
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10 text-white/50 text-xs">
            © 2024 FastFood. All rights reserved.
          </div>
        </div>

        <div className="lg:hidden p-6 bg-gradient-to-r from-red-600 to-red-700 text-center">
          <h3 className="text-white font-bold text-lg mb-1">
            Welcome to FastFood Family
          </h3>
          <p className="text-red-100 text-sm">
            Sign in to access exclusive deals and rewards
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;