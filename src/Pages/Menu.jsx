// pages/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart,
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

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
  }, [selectedCategory, searchTerm]);

  const menuItems = [
    // Burgers
    {
      id: 1,
      name: 'Classic Burger',
      category: 'Burgers',
      description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
      price: 12.99,
      rating: 4.9,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      badge: '🔥 Best Seller',
      badgeColor: 'bg-red-500'
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
      badgeColor: 'bg-yellow-500'
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
      badgeColor: 'bg-orange-500'
    },
    {
      id: 4,
      name: 'Double Patty Burger',
      category: 'Burgers',
      description: 'Two juicy beef patties with double cheese and special sauce',
      price: 15.99,
      rating: 4.9,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop',
      badge: '💪 Double',
      badgeColor: 'bg-red-600'
    },
    // Pizza
    {
      id: 5,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'Classic Italian pizza with fresh basil, mozzarella, and tomato sauce',
      price: 14.99,
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop',
      badge: '🍕 Classic',
      badgeColor: 'bg-red-500'
    },
    {
      id: 6,
      name: 'Veggie Pizza',
      category: 'Pizza',
      description: 'Loaded with bell peppers, mushrooms, onions, and olives',
      price: 13.99,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
      badge: '🥬 Veggie',
      badgeColor: 'bg-green-500'
    },
    {
      id: 7,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
      price: 16.99,
      rating: 4.9,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
      badge: '⭐ Top Rated',
      badgeColor: 'bg-yellow-500'
    },
    {
      id: 8,
      name: 'BBQ Chicken Pizza',
      category: 'Pizza',
      description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
      price: 17.99,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
      badge: '🔥 BBQ',
      badgeColor: 'bg-orange-500'
    },
    // Fries
    {
      id: 9,
      name: 'French Fries',
      category: 'Fries',
      description: 'Crispy golden fries served with ketchup and mayo',
      price: 5.99,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
      badge: '🍟 Crispy',
      badgeColor: 'bg-amber-500'
    },
    {
      id: 10,
      name: 'Peri-Peri Fries',
      category: 'Fries',
      description: 'Spicy peri-peri seasoned fries with garlic dipping sauce',
      price: 6.99,
      rating: 4.6,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1585109115969-5a6c2cc7a5b4?w=400&h=400&fit=crop',
      badge: '🌶️ Spicy',
      badgeColor: 'bg-red-600'
    },
    {
      id: 11,
      name: 'Cheese Fries',
      category: 'Fries',
      description: 'Loaded fries with melted cheese and crispy bacon bits',
      price: 7.99,
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1529290130-4ca3753203a3?w=400&h=400&fit=crop',
      badge: '🧀 Cheesy',
      badgeColor: 'bg-yellow-500'
    },
    // Wraps & Sandwiches
    {
      id: 12,
      name: 'Chicken Wrap',
      category: 'Wraps & Sandwiches',
      description: 'Grilled chicken with fresh vegetables and garlic sauce',
      price: 9.99,
      rating: 4.6,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop',
      badge: '🌯 Chicken',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 13,
      name: 'Veg Wrap',
      category: 'Wraps & Sandwiches',
      description: 'Fresh vegetables with hummus and avocado in a whole wheat wrap',
      price: 8.99,
      rating: 4.5,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1550304942-4f8f4a1c76df?w=400&h=400&fit=crop',
      badge: '🥬 Healthy',
      badgeColor: 'bg-green-500'
    },
    {
      id: 14,
      name: 'Grilled Sandwich',
      category: 'Wraps & Sandwiches',
      description: 'Grilled cheese sandwich with tomato and fresh basil',
      price: 7.99,
      rating: 4.4,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
      badge: '🥪 Grilled',
      badgeColor: 'bg-amber-500'
    },
    // Chicken
    {
      id: 15,
      name: 'Fried Chicken',
      category: 'Chicken',
      description: 'Crispy fried chicken with special seasoning and dipping sauce',
      price: 14.99,
      rating: 4.8,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop',
      badge: '🍗 Crispy',
      badgeColor: 'bg-red-500'
    },
    {
      id: 16,
      name: 'Chicken Wings',
      category: 'Chicken',
      description: 'Spicy buffalo wings with ranch dressing and celery sticks',
      price: 13.99,
      rating: 4.7,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=400&fit=crop',
      badge: '🌶️ Spicy',
      badgeColor: 'bg-red-600'
    },
    {
      id: 17,
      name: 'Nuggets',
      category: 'Chicken',
      description: 'Crispy chicken nuggets with your choice of dipping sauce',
      price: 8.99,
      rating: 4.5,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop',
      badge: '🍗 Nuggets',
      badgeColor: 'bg-orange-500'
    },
    // Drinks
    {
      id: 18,
      name: 'Coke',
      category: 'Drinks',
      description: 'Classic Coca-Cola served with ice',
      price: 3.99,
      rating: 4.4,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop',
      badge: '🥤 Drink',
      badgeColor: 'bg-red-600'
    },
    {
      id: 19,
      name: 'Pepsi',
      category: 'Drinks',
      description: 'Refreshing Pepsi served with ice',
      price: 3.99,
      rating: 4.3,
      reviews: 389,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop',
      badge: '🥤 Drink',
      badgeColor: 'bg-blue-600'
    },
    {
      id: 20,
      name: 'Lemonade',
      category: 'Drinks',
      description: 'Freshly squeezed lemonade with mint leaves',
      price: 4.99,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
      badge: '🍋 Fresh',
      badgeColor: 'bg-yellow-500'
    },
    {
      id: 21,
      name: 'Milkshakes',
      category: 'Drinks',
      description: 'Creamy milkshakes in chocolate, strawberry, or vanilla',
      price: 6.99,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=400&fit=crop',
      badge: '🥤 Shake',
      badgeColor: 'bg-pink-500'
    },
    // Desserts
    {
      id: 22,
      name: 'Brownie',
      category: 'Desserts',
      description: 'Warm chocolate brownie with vanilla ice cream and chocolate sauce',
      price: 7.99,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop',
      badge: '🍫 Brownie',
      badgeColor: 'bg-amber-700'
    },
    {
      id: 23,
      name: 'Ice Cream',
      category: 'Desserts',
      description: 'Creamy ice cream in chocolate, vanilla, or strawberry',
      price: 5.99,
      rating: 4.6,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
      badge: '🍦 Ice Cream',
      badgeColor: 'bg-blue-400'
    },
    {
      id: 24,
      name: 'Chocolate Cake',
      category: 'Desserts',
      description: 'Rich chocolate cake with chocolate ganache and berries',
      price: 8.99,
      rating: 4.9,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
      badge: '🎂 Cake',
      badgeColor: 'bg-red-700'
    }
  ];

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCartItems(prev => {
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
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={`text-xs ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset animation by forcing a re-render
    setSearchTerm(searchTerm);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
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

      {/* Search and Filter Section */}
      <section className="py-4 bg-white shadow-md sticky top-14 z-40">
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
          {/* Results Count */}
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
                  ${totalPrice.toFixed(2)}
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
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(item.id)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Grid - Removed animation classes that cause disappearing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="menu-item-card group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                style={{ opacity: 1 }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-48 sm:h-52 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 ${item.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                    {item.badge}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-300 ${
                      likedItems.includes(item.id) 
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                        : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <FaHeart className={`text-sm ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded-full">
                      {renderStars(item.rating)}
                      <span className="text-xs font-bold text-gray-700 ml-0.5">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">({item.reviews} reviews)</span>
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

                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>

          {/* No Results */}
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