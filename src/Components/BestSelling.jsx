// components/BestSelling.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaArrowRight,
  FaFire,
  FaClock
} from 'react-icons/fa';

const BestSelling = () => {
  const sectionRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

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

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const bestSellingItems = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh lettuce, tomatoes, and special sauce',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.9,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
      badge: '🔥 Best Seller',
      badgeColor: 'bg-red-500',
      time: '15-20 min',
      category: 'Burgers'
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
      price: 14.99,
      originalPrice: 18.99,
      rating: 4.8,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
      badge: '⭐ Top Rated',
      badgeColor: 'bg-yellow-500',
      time: '20-25 min',
      category: 'Pizza'
    },
    {
      id: 3,
      name: 'Crispy Chicken',
      description: 'Golden fried chicken with special herb seasoning',
      price: 10.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 215,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop',
      badge: '🍗 Popular',
      badgeColor: 'bg-orange-500',
      time: '12-15 min',
      category: 'Chicken'
    },
    {
      id: 4,
      name: 'Seafood Platter',
      description: 'Fresh shrimp, fish, and calamari with dipping sauce',
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=400&fit=crop',
      badge: '🌊 Premium',
      badgeColor: 'bg-blue-500',
      time: '25-30 min',
      category: 'Seafood'
    },
    {
      id: 5,
      name: 'Spicy Noodles',
      description: 'Authentic Asian noodles with vegetables and spicy sauce',
      price: 11.99,
      originalPrice: 13.99,
      rating: 4.6,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
      badge: '🌶️ Spicy',
      badgeColor: 'bg-red-600',
      time: '15-18 min',
      category: 'Noodles'
    },
    {
      id: 6,
      name: 'Taco Trio',
      description: 'Three delicious tacos with your choice of filling',
      price: 9.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 223,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=400&fit=crop',
      badge: '🌮 Special',
      badgeColor: 'bg-purple-500',
      time: '10-12 min',
      category: 'Tacos'
    },
    {
      id: 7,
      name: 'Chocolate Shake',
      description: 'Creamy chocolate shake topped with whipped cream and chocolate syrup',
      price: 6.99,
      originalPrice: 8.99,
      rating: 4.7,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
      badge: '🥤 Popular',
      badgeColor: 'bg-pink-500',
      time: '5-8 min',
      category: 'Beverages'
    },
    {
      id: 8,
      name: 'Cheesecake',
      description: 'New York style cheesecake with berry topping',
      price: 7.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
      badge: '🍰 Dessert',
      badgeColor: 'bg-rose-500',
      time: '5-10 min',
      category: 'Desserts'
    },
    // {
    //   id: 9,
    //   name: 'Veggie Wrap',
    //   description: 'Fresh vegetables with hummus in a whole wheat wrap',
    //   price: 8.99,
    //   originalPrice: 10.99,
    //   rating: 4.5,
    //   reviews: 134,
    //   image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop',
    //   badge: '🥬 Healthy',
    //   badgeColor: 'bg-green-500',
    //   time: '8-10 min',
    //   category: 'Healthy'
    // },
    // {
    //   id: 10,
    //   name: 'Mega Fries',
    //   description: 'Crispy golden fries with cheese, bacon, and special sauce',
    //   price: 5.99,
    //   originalPrice: 7.99,
    //   rating: 4.6,
    //   reviews: 278,
    //   image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
    //   badge: '🍟 Crispy',
    //   badgeColor: 'bg-amber-500',
    //   time: '5-7 min',
    //   category: 'Sides'
    // },
    // {
    //   id: 11,
    //   name: 'Chicken Wings',
    //   description: 'Spicy buffalo wings with ranch dressing and celery sticks',
    //   price: 13.99,
    //   originalPrice: 16.99,
    //   rating: 4.8,
    //   reviews: 245,
    //   image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=400&fit=crop',
    //   badge: '🌶️ Spicy',
    //   badgeColor: 'bg-red-700',
    //   time: '15-20 min',
    //   category: 'Chicken'
    // },
    // {
    //   id: 12,
    //   name: 'Margherita Pizza',
    //   description: 'Classic Italian pizza with fresh basil, mozzarella, and tomato',
    //   price: 13.99,
    //   originalPrice: null,
    //   rating: 4.7,
    //   reviews: 198,
    //   image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop',
    //   badge: '🍕 Classic',
    //   badgeColor: 'bg-red-400',
    //   time: '18-22 min',
    //   category: 'Pizza'
    // }
  ];

  return (
    <section ref={sectionRef} className="py-4 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 rounded-full text-sm font-semibold mb-3 animate-fadeInUp shadow-sm">
            <FaFire className="text-red-500" />
            Best Sellers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
            Our <span className="text-red-600">Best Selling</span> Items
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
            Most loved and highly rated dishes by our customers. Try them today!
          </p>
        </div>

        {/* Products Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {bestSellingItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)] transition-all duration-500 overflow-hidden animate-on-scroll opacity-0 ${
                index === 0 ? 'animation-delay-100' :
                index === 1 ? 'animation-delay-200' :
                index === 2 ? 'animation-delay-300' :
                index === 3 ? 'animation-delay-400' :
                index === 4 ? 'animation-delay-500' :
                index === 5 ? 'animation-delay-600' :
                index === 6 ? 'animation-delay-700' :
                index === 7 ? 'animation-delay-800' :
                index === 8 ? 'animation-delay-900' :
                index === 9 ? 'animation-delay-1000' :
                index === 10 ? 'animation-delay-1100' :
                'animation-delay-1200'
              } hover:-translate-y-2`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Badge */}
              <div className={`absolute top-3 left-3 z-10 ${item.badgeColor} text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                {item.badge}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleLike(item.id)}
                className={`absolute top-3 right-3 z-10 p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                  likedItems.includes(item.id) 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                    : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <FaHeart className={`text-[10px] sm:text-sm ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Product Image */}
              <div className="relative overflow-hidden h-44 sm:h-48 md:h-52 lg:h-56 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quick Action Buttons - Appear on Hover */}
                <div className={`absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500 ${
                  hoveredItem === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  <button className="bg-white text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full font-semibold text-[10px] sm:text-sm shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-1.5 sm:gap-2">
                    <FaShoppingCart className="text-[10px] sm:text-sm" />
                    Quick Add
                  </button>
                </div>

                {/* Time Badge */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5">
                  <FaClock className="text-yellow-400 text-[8px] sm:text-[10px]" />
                  {item.time}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 truncate max-w-[120px] sm:max-w-[150px]">
                      {item.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <FaStar className="text-yellow-400 text-[8px] sm:text-xs" />
                    <span className="text-[8px] sm:text-xs font-bold text-gray-700">{item.rating}</span>
                    <span className="text-[6px] sm:text-[10px] text-gray-500">({item.reviews})</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base sm:text-xl font-bold text-gray-800">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm text-gray-400 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/menu/${item.id}`}
                    className="bg-red-600 text-white p-2 sm:p-2.5 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaShoppingCart className="text-[10px] sm:text-sm" />
                  </Link>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-4 animate-fadeInUp animation-delay-1000">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-10 py-2 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-red-100 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-yellow-100 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default BestSelling;