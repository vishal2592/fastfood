// pages/OnlineOrder.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaTrash,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaUtensils,
  FaStar,
  FaHeart,
  FaTag,
  FaFire,
  FaPercent,
  FaGift,
  FaLeaf,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';

const OnlineOrder = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedItems, setLikedItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryInstructions: '',
    paymentMethod: ''
  });
  const sectionRef = useRef(null);

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

    const animatedElements = document.querySelectorAll('.menu-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory]);

  const menuItems = [
    // Burgers
    {
      id: 1,
      name: 'Classic Burger',
      category: 'Burgers',
      description: 'Juicy beef patty with fresh lettuce, tomatoes, and special sauce',
      price: 12.99,
      rating: 4.9,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      badge: '🔥 Best Seller',
      badgeColor: 'bg-red-500',
      vegetarian: false
    },
    {
      id: 2,
      name: 'Cheese Burger',
      category: 'Burgers',
      description: 'Classic burger with melted cheddar cheese and caramelized onions',
      price: 13.99,
      rating: 4.8,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop',
      badge: '⭐ Popular',
      badgeColor: 'bg-yellow-500',
      vegetarian: false
    },
    {
      id: 3,
      name: 'Chicken Burger',
      category: 'Burgers',
      description: 'Crispy chicken patty with fresh coleslaw and honey mustard sauce',
      price: 11.99,
      rating: 4.7,
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop',
      badge: '🍗 Chicken',
      badgeColor: 'bg-orange-500',
      vegetarian: false
    },
    // Pizza
    {
      id: 4,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'Classic Italian pizza with fresh basil, mozzarella, and tomato sauce',
      price: 14.99,
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop',
      badge: '🍕 Classic',
      badgeColor: 'bg-red-500',
      vegetarian: true
    },
    {
      id: 5,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
      price: 16.99,
      rating: 4.9,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
      badge: '⭐ Top Rated',
      badgeColor: 'bg-yellow-500',
      vegetarian: false
    },
    // Sides
    {
      id: 6,
      name: 'French Fries',
      category: 'Sides',
      description: 'Crispy golden fries served with ketchup and mayo',
      price: 5.99,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
      badge: '🍟 Crispy',
      badgeColor: 'bg-amber-500',
      vegetarian: true
    },
    {
      id: 7,
      name: 'Cheese Fries',
      category: 'Sides',
      description: 'Loaded fries with melted cheese and crispy bacon bits',
      price: 7.99,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1529290130-4ca3753203a3?w=400&h=400&fit=crop',
      badge: '🧀 Cheesy',
      badgeColor: 'bg-yellow-500',
      vegetarian: false
    },
    // Drinks
    {
      id: 8,
      name: 'Milkshake',
      category: 'Drinks',
      description: 'Creamy milkshakes in chocolate, strawberry, or vanilla',
      price: 6.99,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=400&fit=crop',
      badge: '🥤 Shake',
      badgeColor: 'bg-pink-500',
      vegetarian: true
    },
    {
      id: 9,
      name: 'Lemonade',
      category: 'Drinks',
      description: 'Freshly squeezed lemonade with mint leaves',
      price: 4.99,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
      badge: '🍋 Fresh',
      badgeColor: 'bg-yellow-500',
      vegetarian: true
    },
    // Desserts
    {
      id: 10,
      name: 'Chocolate Brownie',
      category: 'Desserts',
      description: 'Warm chocolate brownie with vanilla ice cream and chocolate sauce',
      price: 7.99,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop',
      badge: '🍫 Brownie',
      badgeColor: 'bg-amber-700',
      vegetarian: true
    },
    {
      id: 11,
      name: 'Cheesecake',
      category: 'Desserts',
      description: 'New York style cheesecake with berry topping',
      price: 8.99,
      rating: 4.9,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
      badge: '🍰 Cake',
      badgeColor: 'bg-red-700',
      vegetarian: true
    }
  ];

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = totalPrice > 20 ? 0 : 3.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + deliveryFee + tax;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Process order
    setOrderStep(3);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 animate-fadeInUp border border-white/20">
              <FaShoppingCart className="text-yellow-400" />
              Online Order
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Order Your <span className="text-yellow-300">Favorite</span> Food
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Browse our menu, customize your order, and get it delivered hot and fresh
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="menu-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    <div className={`absolute top-2 left-2 ${item.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1`}>
                      {item.badge}
                    </div>

                    {/* Veg/Non-Veg Indicator */}
                    <div className="absolute top-2 right-2">
                      <div className={`w-3 h-3 rounded-full border-2 ${item.vegetarian ? 'border-green-500' : 'border-red-500'} bg-white flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.vegetarian ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-all duration-300 ${
                        likedItems.includes(item.id) 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className={`text-xs ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 flex-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {renderStars(item.rating)}
                        <span className="text-[10px] font-bold text-gray-700 ml-0.5">{item.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5"
                      >
                        <FaPlus className="text-[10px]" />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No items found in this category.</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaShoppingCart className="text-red-600" />
                    Your Order
                  </h2>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">🛒</div>
                    <p className="text-gray-500 text-sm">Your cart is empty</p>
                    <p className="text-gray-400 text-xs">Add items from the menu</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
                            <p className="text-xs text-gray-600">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <FaMinus className="text-[10px] text-gray-600" />
                            </button>
                            <span className="text-sm font-bold text-gray-800 w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                            >
                              <FaPlus className="text-[10px] text-white" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-semibold">
                          {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-red-600">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => setOrderStep(2)}
                      className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      Proceed to Checkout
                      <FaArrowRight className="text-sm" />
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-3 flex justify-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaCheckCircle className="text-green-500 text-xs" />
                        Fresh Food
                      </span>
                      <span className="flex items-center gap-1">
                        <FaTruck className="text-blue-500 text-xs" />
                        Fast Delivery
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-orange-500 text-xs" />
                        30-40 min
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {orderStep === 2 && cart.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-fadeInUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
              <button onClick={() => setOrderStep(1)} className="text-gray-400 hover:text-gray-600">
                <FaArrowLeft className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {/* Delivery Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaUser className="text-red-600" />
                  Delivery Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-sm"
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-sm"
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-sm"
                  value={orderDetails.email}
                  onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                />
                <textarea
                  placeholder="Delivery Address *"
                  required
                  rows="2"
                  className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-sm resize-none"
                  value={orderDetails.address}
                  onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                />
                <textarea
                  placeholder="Delivery Instructions (optional)"
                  rows="2"
                  className="w-full mt-3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none text-sm resize-none"
                  value={orderDetails.deliveryInstructions}
                  onChange={(e) => setOrderDetails({...orderDetails, deliveryInstructions: e.target.value})}
                />
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaCreditCard className="text-red-600" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setOrderDetails({...orderDetails, paymentMethod: method})}
                      className={`p-3 border-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                        orderDetails.paymentMethod === method
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-red-600">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmation */}
      {orderStep === 3 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-fadeInUp">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
            <p className="text-gray-600 text-sm mb-6">
              Thank you for your order! We'll notify you when your food is on the way.
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>📦 Order #: <span className="font-semibold">FD-{Date.now().toString().slice(-6)}</span></p>
              <p>⏱️ Estimated Delivery: <span className="font-semibold">30-40 minutes</span></p>
              <p>📍 Delivery to: <span className="font-semibold">{orderDetails.address || 'Your address'}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/menu"
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Order More
              </Link>
              <Link
                to="/"
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button (Mobile) */}
      {cart.length > 0 && !showCart && (
        <button
          onClick={() => setShowCart(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce-slow z-40"
        >
          <FaShoppingCart />
          <span className="font-semibold">{totalItems}</span>
          <span className="text-xs opacity-80">${totalPrice.toFixed(2)}</span>
        </button>
      )}
    </div>
  );
};

export default OnlineOrder;