// pages/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slicer/productSlice';
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';

// Helper: safely get string from field (handles objects)
const getStringValue = (field, fallback = '') => {
  if (!field) return fallback;
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && field.name) return field.name;
  if (typeof field === 'object' && field.toString) return field.toString();
  return fallback;
};

// Helper: safely get number
const getNumber = (value, fallback = 0) => {
  const num = parseFloat(value);
  return isNaN(num) ? fallback : num;
};

const Menu = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const sectionRef = useRef(null);

  // Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Observer animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideUp');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.menu-item-card');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory, searchTerm, products]);

  // Build categories – safely extract string
  const categories = products && products.length > 0
    ? ['All', ...new Set(products.map(item => getStringValue(item.category, 'Uncategorized')))]
    : ['All'];

  // Filter products
  const filteredItems = products && products.length > 0
    ? products.filter(item => {
        const name = getStringValue(item.name, '');
        const desc = getStringValue(item.description, '');
        const category = getStringValue(item.category, '');
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  const toggleLike = (id) => {
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Helper to get effective price (discounted or original)
  const getEffectivePrice = (item) => {
    const price = getNumber(item.price, 0);
    const discount = getNumber(item.discount, 0);
    const discountPrice = getNumber(item.discountPrice, 0);
    // If discountPrice is provided, use it; else compute from percentage
    if (discountPrice > 0) return discountPrice;
    if (discount > 0) return price * (1 - discount / 100);
    return price;
  };

  // Add to cart – store effective price
  const addToCart = (item) => {
    const itemId = item._id || item.id;
    const effectivePrice = getEffectivePrice(item);
    setCartItems(prev => {
      const existing = prev.find(i => (i._id || i.id) === itemId);
      if (existing) {
        return prev.map(i =>
          (i._id || i.id) === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [{ ...item, quantity: 1, effectivePrice }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const existing = prev.find(i => (i._id || i.id) === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i =>
          (i._id || i.id) === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => (i._id || i.id) !== id);
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.effectivePrice || 0) * (item.quantity || 0), 0);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={`text-xs ${i <= fullStars ? 'text-yellow-400' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Loading
  if (loading && (!products || products.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700">Failed to load menu: {error}</p>
          <button
            onClick={() => dispatch(getProducts())}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No products
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No products available.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-500 py-20 sm:py-24 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 animate-fadeInUp border border-white/20">
              Our Menu
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Explore Our <span className="text-yellow-300">Delicious</span> Menu
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Discover our wide range of delicious dishes made with love and fresh ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-2 bg-white shadow-md sticky top-12 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-red-500 outline-none transition-colors duration-300 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> items
            </p>
            {cartItems.length > 0 && (
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <FaShoppingCart />
                <span>Cart ({totalItems})</span>
                <span className="bg-yellow-400 text-red-700 px-2 py-0.5 rounded-full text-xs">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </button>
            )}
          </div>

          {/* Cart Sidebar */}
          {showCart && cartItems.length > 0 && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
              <div className="bg-white w-full sm:w-96 h-full overflow-y-auto p-6 animate-slideInRight">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                    <FaTimes />
                  </button>
                </div>
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemId = item._id || item.id;
                    const effectivePrice = item.effectivePrice || 0;
                    return (
                      <div key={itemId} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <img src={item.image || 'https://via.placeholder.com/400x400?text=No+Image'} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{getStringValue(item.name, 'Unnamed')}</h4>
                          <p className="text-sm text-gray-600">₹{effectivePrice.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeFromCart(itemId)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                          <span className="font-semibold">{item.quantity || 0}</span>
                          <button onClick={() => addToCart(item)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const itemId = item._id || item.id;
              const name = getStringValue(item.name, 'Unnamed Product');
              const description = getStringValue(item.description, 'Delicious food item');
              const category = getStringValue(item.category, 'Uncategorized');
              const badge = getStringValue(item.badge, '⭐ Popular');
              const badgeColor = item.badgeColor || 'bg-red-500';
              const price = getNumber(item.Price, 0);
              const discount = getNumber(item.discount, 0);
              const discountPrice = getNumber(item.discountPrice, 0);
              const effectivePrice = discountPrice > 0 ? discountPrice : (discount > 0 ? price * (1 - discount/100) : price);
              const rating = getNumber(item.rating, 0);
              const reviews = getNumber(item.reviews, 0);
              const image = item.image || 'https://via.placeholder.com/400x400?text=No+Image';

              const hasDiscount = discount > 0 || discountPrice > 0;

              return (
                <div
                  key={itemId}
                  className="menu-item-card group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                  style={{ opacity: 1 }}
                >
                  <div className="relative overflow-hidden h-48 sm:h-52 bg-gray-100">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    <div className={`absolute top-3 left-3 ${badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                      {badge}
                    </div>
                    {hasDiscount && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                        {discount > 0 ? `${discount}% OFF` : 'Sale'}
                      </div>
                    )}
                    <button
                      onClick={() => toggleLike(itemId)}
                      className={`absolute bottom-3 right-3 p-1.5 rounded-full transition-all duration-300 ${
                        likedItems.includes(itemId)
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className={`text-sm ${likedItems.includes(itemId) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                        {name}
                      </h3>
                      <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded-full">
                        {renderStars(rating)}
                        <span className="text-xs font-bold text-gray-700 ml-0.5">{rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{category}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        {hasDiscount ? (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xl font-bold text-red-600">₹{effectivePrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-400 line-through">₹{price.toFixed(2)}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                              {discount > 0 ? `${discount}% OFF` : 'Sale'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-gray-800">₹{price.toFixed(2)}</span>
                        )}
                        <span className="text-xs text-gray-500 ml-1">({reviews} reviews)</span>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 text-white p-2.5 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <FaShoppingCart className="text-sm" />
                        <span className="hidden sm:inline text-xs font-semibold">Add</span>
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Ready to <span className="text-yellow-300">Order</span>?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Choose your favorite dishes and get them delivered fresh to your doorstep
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Order Now
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Menu;