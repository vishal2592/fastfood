// components/TodaySpecial.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaArrowRight,
  FaFire,
  FaClock,
  FaTag,
  FaPercent
} from 'react-icons/fa';

const TodaySpecial = () => {
  const sectionRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Auto-slide for featured items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const featuredItems = [
    {
      id: 1,
      name: 'Double Cheese Burger',
      description: 'Two juicy beef patties with double cheese, crispy bacon, and special sauce',
      price: 14.99,
      originalPrice: 19.99,
      discount: '25% OFF',
      rating: 4.9,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
      badge: '🔥 Today\'s Special',
      badgeColor: 'bg-gradient-to-r from-red-500 to-orange-500',
      time: '15-20 min',
      category: 'Burgers',
      isVeg: false
    },
    {
      id: 2,
      name: 'Supreme Pizza',
      description: 'Loaded with pepperoni, mushrooms, bell peppers, olives, and extra cheese',
      price: 16.99,
      originalPrice: 22.99,
      discount: '30% OFF',
      rating: 4.8,
      reviews: 356,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      badge: '⭐ Chef\'s Choice',
      badgeColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      time: '20-25 min',
      category: 'Pizza',
      isVeg: false
    },
    {
      id: 3,
      name: 'Grilled Chicken Bowl',
      description: 'Grilled chicken with brown rice, fresh vegetables, and avocado dressing',
      price: 12.99,
      originalPrice: 15.99,
      discount: '20% OFF',
      rating: 4.7,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=400&fit=crop',
      badge: '🥗 Healthy Pick',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      time: '12-15 min',
      category: 'Healthy',
      isVeg: true
    }
  ];

  const specialItems = [
    {
      id: 4,
      name: 'Seafood Platter',
      description: 'Fresh shrimp, fish, and calamari with garlic butter sauce',
      price: 18.99,
      originalPrice: 24.99,
      discount: '25% OFF',
      rating: 4.9,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=400&fit=crop',
      badge: '🌊 Premium',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      time: '25-30 min',
      category: 'Seafood',
      isVeg: false
    },
    {
      id: 5,
      name: 'Spicy Ramen',
      description: 'Authentic Japanese ramen with spicy broth, pork, and soft-boiled egg',
      price: 13.99,
      originalPrice: 17.99,
      discount: '20% OFF',
      rating: 4.6,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
      badge: '🌶️ Spicy Special',
      badgeColor: 'bg-gradient-to-r from-red-600 to-red-700',
      time: '15-18 min',
      category: 'Noodles',
      isVeg: false
    },
    {
      id: 6,
      name: 'Veggie Delight Wrap',
      description: 'Fresh vegetables, hummus, and avocado in a whole wheat wrap',
      price: 9.99,
      originalPrice: 12.99,
      discount: '25% OFF',
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop',
      badge: '🥬 Healthy Choice',
      badgeColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
      time: '8-10 min',
      category: 'Healthy',
      isVeg: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-4 bg-gradient-to-b from-red-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full text-sm font-semibold mb-3 animate-fadeInUp shadow-lg">
            <FaFire className="text-yellow-300" />
            Today's Special
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Special</span> Offers Today
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
            Don't miss out on our daily specials! Limited time offers on your favorite dishes
          </p>
        </div>

        {/* Featured Items Carousel */}
        <div className="relative mb-6 overflow-hidden rounded-2xl shadow-2xl animate-fadeInUp animation-delay-600">
          <div className="relative bg-gradient-to-r from-red-600 to-orange-600 min-h-[300px] sm:min-h-[350px] md:min-h-[350px]">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image */}
                  <div className="md:w-1/2 h-48 sm:h-56 md:h-full relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <FaPercent className="text-red-600 text-xs" />
                      <span className="text-xs font-bold text-red-600">{item.discount}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center text-white">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${item.badgeColor}`}>
                      {item.badge}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-red-100 text-sm sm:text-base mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl sm:text-3xl font-bold">${item.price}</span>
                      <span className="text-lg sm:text-xl text-red-200 line-through">${item.originalPrice}</span>
                      <span className="bg-yellow-400 text-red-700 px-2 py-0.5 rounded text-xs font-bold">
                        {item.discount}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/menu/${item.id}`}
                        className="bg-white text-red-600 px-6 py-2.5 rounded-full font-semibold hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                      >
                        Order Now
                        <FaArrowRight className="text-sm" />
                      </Link>
                      <div className="flex items-center gap-1 text-yellow-300">
                        <FaStar />
                        <span className="text-sm font-semibold">{item.rating}</span>
                        <span className="text-red-200 text-sm">({item.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 h-2 bg-white rounded-full' 
                      : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Special Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {specialItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-2xl border-2 border-red-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden animate-on-scroll opacity-0 ${
                index === 0 ? 'animation-delay-100' :
                index === 1 ? 'animation-delay-200' :
                'animation-delay-300'
              } hover:-translate-y-2`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Special Banner */}
              <div className="absolute top-0 right-0 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-l from-yellow-400 to-orange-400 text-red-700 text-xs font-bold px-6 py-1.5 rotate-0 shadow-lg flex items-center gap-1">
                    <FaTag className="text-red-700" />
                    {item.discount}
                  </div>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleLike(item.id)}
                className={`absolute top-3 left-3 z-10 p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                  likedItems.includes(item.id) 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                    : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <FaHeart className={`text-[10px] sm:text-sm ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Product Image */}
              <div className="relative overflow-hidden h-48 sm:h-56 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Veg/Non-Veg Indicator */}
                <div className="absolute bottom-3 left-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} bg-white flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  hoveredItem === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  <button className="bg-white text-gray-800 px-4 py-2.5 rounded-full font-semibold text-sm shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <FaShoppingCart className="text-sm" />
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-gray-700">{item.rating}</span>
                    <span className="text-[10px] text-gray-500">({item.reviews})</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-800">
                      ${item.price}
                    </span>
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ${item.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                      {item.discount}
                    </span>
                    <Link
                      to={`/menu/${item.id}`}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaShoppingCart className="text-sm" />
                    </Link>
                  </div>
                </div>

                {/* Time Badge */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <FaClock className="text-gray-400" />
                  <span>Delivery in {item.time}</span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* View All Specials Button */}
        <div className="text-center mt-6 animate-fadeInUp animation-delay-1000">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 sm:px-10 py-2 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            View All Specials
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TodaySpecial;