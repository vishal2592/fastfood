// pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../redux/slicer/adminSlice';
import { 
  FaUser, 
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
  FaStar,
  FaUtensils
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.admin);

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Redirect to home on success
  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and number';
    }
    
    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Send only name, email, password
    dispatch(registerAdmin({
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialRegister = (provider) => {
    alert(`Social registration with ${provider} not implemented yet.`);
  };

  const benefits = [
    { icon: FaGift, text: '50 bonus points on signup', color: 'text-red-500' },
    { icon: FaStar, text: 'Exclusive member offers', color: 'text-yellow-500' },
    { icon: FaUtensils, text: 'Free welcome meal', color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 pt-20">
      {success && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h2>
            <p className="text-gray-600 text-sm mb-4">Welcome! Redirecting to homepage...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
        <div className="flex-1 p-6 sm:p-8 lg:p-12">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <GiHamburger className="text-2xl text-red-600" />
            <span className="text-xl font-bold text-gray-800">FastFood</span>
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm">
              Join us and start earning rewards!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <button
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Google</span>
            </button>
            <button
              onClick={() => handleSocialRegister('Facebook')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <FaFacebook className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Facebook</span>
            </button>
            <button
              onClick={() => handleSocialRegister('Apple')}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <FaApple className="text-gray-700" />
              <span className="text-xs font-semibold text-gray-600 hidden sm:inline">Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all text-sm ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <FaTimes className="text-[10px]" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all text-sm ${
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

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all text-sm ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="Create a password (min 6 chars)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              <p className="mt-1 text-xs text-gray-400">
                Min 6 chars with uppercase, lowercase & number
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="w-4 h-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <div>
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-red-600 hover:underline font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-red-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FaTimes className="text-[10px]" />
                    {errors.agreeTerms}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                <FaTimes className="text-xs" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-700 hover:to-red-800 hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right side branding - unchanged */}
        <div className="hidden lg:flex lg:w-96 bg-gradient-to-br from-red-600 to-red-700 p-10 flex-col justify-between">
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400 rounded-full opacity-10"></div>
          </div>
          <div className="relative z-10">
            <div className="text-white/20 text-6xl mb-8">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Join the <br />
              <span className="text-yellow-300">FastFood</span> Family
            </h2>
            <p className="text-red-100 text-sm mb-8">
              Sign up today and enjoy exclusive benefits, rewards, and delicious deals!
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
                  Secure Signup
                </span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="flex items-center gap-1 text-xs">
                  <FaCheckCircle className="text-green-400" />
                  Free Membership
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
            Join the FastFood Family
          </h3>
          <p className="text-red-100 text-sm">
            Sign up and get 50 bonus points + free welcome meal!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;