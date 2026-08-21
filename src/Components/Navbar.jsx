// components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { logoutUser } from '../redux/slicer/userSlice'; // ✅ changed from adminSlice

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Changed from state.admin to state.user
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown & sidebar on route change
  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  }, [location]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const handleLogout = () => {
    dispatch(logoutUser());          // ✅ logoutUser from userSlice
    navigate('/login');
    setUserDropdownOpen(false);
  };

  const navLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/menu', label: 'Menu' },
    { path: '/offers', label: 'Offers' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`text-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-red-700 shadow-2xl' : 'bg-red-600'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <GiHamburger className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold text-xl group-hover:text-yellow-300 transition-colors duration-200">
                FastFood
              </span>
            </Link>

            {/* Desktop Center - Nav Links */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex space-x-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium hover:text-yellow-300 transition-colors duration-200 relative ${
                        isActive ? 'text-yellow-300' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 animate-pulse"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Desktop Right - Icons & User */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <Link to="/cart" className="relative hover:text-yellow-300 transition-colors duration-200">
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/wishlist" className="hover:text-yellow-300 transition-colors duration-200">
                <FaHeart className="text-xl" />
              </Link>

              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-1 text-gray-800 z-10 border border-gray-100">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaUserCircle className="mr-2 text-red-600" />
                        Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaShoppingCart className="mr-2 text-red-600" />
                        Cart
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaHeart className="mr-2 text-red-600" />
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                      >
                        <FaSignOutAlt className="mr-2 text-red-600" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-yellow-400 text-red-600 px-4 py-1.5 rounded-full font-semibold hover:bg-yellow-300 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Right - Icons & Hamburger */}
            <div className="lg:hidden flex items-center space-x-3">
              <Link to="/cart" className="relative hover:text-yellow-300 transition-colors duration-200">
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/wishlist" className="hover:text-yellow-300 transition-colors duration-200">
                <FaHeart className="text-xl" />
              </Link>
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-1 text-gray-800 z-10 border border-gray-100">
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200" onClick={() => setUserDropdownOpen(false)}>
                        <FaUserCircle className="mr-2 text-red-600" />
                        Profile
                      </Link>
                      <Link to="/cart" className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200" onClick={() => setUserDropdownOpen(false)}>
                        <FaShoppingCart className="mr-2 text-red-600" />
                        Cart
                      </Link>
                      <Link to="/wishlist" className="flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-200" onClick={() => setUserDropdownOpen(false)}>
                        <FaHeart className="mr-2 text-red-600" />
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                      >
                        <FaSignOutAlt className="mr-2 text-red-600" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-yellow-400 text-red-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-yellow-300 hover:scale-105 transition-all duration-200 shadow-lg">
                    Login
                  </button>
                </Link>
              )}
              <button
                onClick={toggleSidebar}
                className="text-2xl focus:outline-none hover:text-yellow-300 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fadeIn"
          onClick={closeSidebar}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-red-600 to-red-700 text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-red-500">
          <Link to="/" className="flex items-center space-x-2" onClick={closeSidebar}>
            <GiHamburger className="text-2xl" />
            <span className="font-bold text-xl">FastFood</span>
          </Link>
        </div>
        <div className="flex flex-col p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200 flex items-center space-x-2 ${
                  isActive ? 'bg-red-500 shadow-lg' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`w-1 h-8 rounded-full transition-all duration-200 ${isActive ? 'bg-yellow-300' : 'bg-transparent'}`}></span>
                  <span>{link.label}</span>
                  {isActive && <span className="ml-auto text-yellow-300">→</span>}
                </>
              )}
            </NavLink>
          ))}
          <div className="mt-4 pt-4 border-t border-red-500 space-y-2">
            <Link to="/cart" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200">
              <FaShoppingCart className="mr-2" /> Cart
            </Link>
            <Link to="/wishlist" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200">
              <FaHeart className="mr-2" /> Wishlist
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200">
                  <FaUserCircle className="mr-2" /> Profile
                </Link>
                <button onClick={() => { handleLogout(); closeSidebar(); }} className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-red-500 transition-colors duration-200">
                <FaUser className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-500">
          <div className="flex justify-center space-x-4 text-sm text-red-300">
            <span>© 2024 FastFood</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
    </>
  );
};

export default Navbar;