// pages/Offers.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTag, 
  FaGift, 
  FaUsers, 
  FaGraduationCap,
  FaCalendarWeek,
  FaShoppingBag,
  FaTruck,
  FaTicketAlt,
  FaCopy,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaFire,
  FaPercent,
  FaStar,
  FaHeart
} from 'react-icons/fa';

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [likedOffers, setLikedOffers] = useState([]);
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

    const animatedElements = document.querySelectorAll('.offer-card');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const toggleLike = (id) => {
    setLikedOffers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const offers = [
    {
      id: 1,
      title: 'Today\'s Deals',
      category: 'Today\'s Deals',
      description: 'Get up to 50% off on selected items. Limited time offer!',
      discount: '50% OFF',
      code: 'TODAY50',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      icon: FaFire,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      buttonColor: 'bg-red-600',
      validUntil: 'Today',
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      title: 'Family Combo Meals',
      category: 'Family Combo Meals',
      description: 'Perfect for 4-6 people. Includes 2 pizzas, 1 burger, fries, and drinks.',
      discount: '30% OFF',
      code: 'FAMILY30',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      icon: FaUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      buttonColor: 'bg-blue-600',
      validUntil: '3 days left',
      delay: 'animation-delay-200'
    },
    {
      id: 3,
      title: 'Student Offers',
      category: 'Student Offers',
      description: 'Show your student ID and get 25% off on all orders. Valid every day!',
      discount: '25% OFF',
      code: 'STUDENT25',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop',
      icon: FaGraduationCap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      buttonColor: 'bg-purple-600',
      validUntil: 'Always valid',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      title: 'Weekend Specials',
      category: 'Weekend Specials',
      description: 'Exclusive weekend offers on all combos. Friday to Sunday only!',
      discount: '40% OFF',
      code: 'WEEKEND40',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      icon: FaCalendarWeek,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      buttonColor: 'bg-green-600',
      validUntil: 'Weekends only',
      delay: 'animation-delay-400'
    },
    {
      id: 5,
      title: 'Buy 1 Get 1',
      category: 'Buy 1 Get 1',
      description: 'Buy any pizza and get another one absolutely free!',
      discount: 'BOGO',
      code: 'BOGO2024',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
      icon: FaShoppingBag,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      buttonColor: 'bg-yellow-500',
      validUntil: 'Limited time',
      delay: 'animation-delay-500'
    },
    {
      id: 6,
      title: 'Free Delivery',
      category: 'Free Delivery',
      description: 'Free delivery on all orders above $20. No minimum order requirement!',
      discount: 'FREE DELIVERY',
      code: 'FREEDEL',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop',
      icon: FaTruck,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-600',
      buttonColor: 'bg-teal-600',
      validUntil: 'Always',
      delay: 'animation-delay-600'
    },
    {
      id: 7,
      title: 'Coupon Codes',
      category: 'Coupon Codes',
      description: 'Use code SAVE20 for 20% off on your first order. New customers only.',
      discount: '20% OFF',
      code: 'SAVE20',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      icon: FaTicketAlt,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-600',
      buttonColor: 'bg-pink-600',
      validUntil: 'First order only',
      delay: 'animation-delay-700'
    },
    {
      id: 8,
      title: 'Summer Special',
      category: 'Today\'s Deals',
      description: 'Enjoy 15% off on all cold beverages and desserts. Beat the heat!',
      discount: '15% OFF',
      code: 'SUMMER15',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop',
      icon: FaStar,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-600',
      buttonColor: 'bg-cyan-600',
      validUntil: 'Summer season',
      delay: 'animation-delay-800'
    }
  ];

  const categories = ['All', ...new Set(offers.map(offer => offer.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredOffers = selectedCategory === 'All' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`text-xs ${i < count ? 'text-yellow-400' : 'text-gray-300'}`} />
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
              <FaTag className="text-yellow-400" />
              Special Offers
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Exclusive <span className="text-yellow-300">Offers</span> & <span className="text-yellow-300">Deals</span>
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Discover amazing deals, discounts, and special offers on your favorite food
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white shadow-md sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
      </section>

      {/* Offers Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredOffers.length}</span> offers
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaFire className="text-red-500" />
              <span>Hurry up! Limited time offers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredOffers.map((offer) => {
              const Icon = offer.icon;
              return (
                <div
                  key={offer.id}
                  className="offer-card group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Discount Badge */}
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${offer.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5`}>
                      <FaPercent className="text-white/80" />
                      {offer.discount}
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(offer.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-300 ${
                        likedOffers.includes(offer.id) 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className={`text-sm ${likedOffers.includes(offer.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Valid Until */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <FaClock className="text-yellow-400" />
                      <span>{offer.validUntil}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                          {offer.title}
                        </h3>
                        <p className="text-xs text-gray-500">{offer.category}</p>
                      </div>
                      <div className={`p-1.5 rounded-full ${offer.bgColor}`}>
                        <Icon className={`text-sm ${offer.textColor}`} />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {offer.description}
                    </p>

                    {/* Coupon Code */}
                    <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-xs font-bold text-gray-500">CODE:</span>
                      <span className="flex-1 text-sm font-bold text-gray-800 tracking-wider">
                        {offer.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(offer.code)}
                        className={`p-1.5 rounded-lg transition-all duration-300 ${
                          copiedCode === offer.code ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {copiedCode === offer.code ? (
                          <FaCheckCircle className="text-white text-xs" />
                        ) : (
                          <FaCopy className="text-gray-600 text-xs" />
                        )}
                      </button>
                    </div>

                    {/* Action Button */}
                    <button className={`w-full ${offer.buttonColor} text-white py-2.5 rounded-lg text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
                      <FaTag className="text-white/80" />
                      Grab Offer
                      <FaArrowRight className="text-xs" />
                    </button>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1">
                      {renderStars(4)}
                      <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              );
            })}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <p className="text-gray-500 text-lg">No offers found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Why Choose Our <span className="text-red-600">Offers</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              We bring you the best deals to make your dining experience even more enjoyable
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaTag className="text-red-600 text-xl" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Best Prices</h4>
              <p className="text-xs text-gray-500">Unbeatable deals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Daily Updates</h4>
              <p className="text-xs text-gray-500">New offers daily</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Verified Deals</h4>
              <p className="text-xs text-gray-500">100% authentic</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaGift className="text-yellow-600 text-xl" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Gift Cards</h4>
              <p className="text-xs text-gray-500">Treat yourself</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Don't Miss Out on <span className="text-yellow-300">Great Deals</span>!
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Subscribe to our newsletter and get notified about new offers and discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Menu
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;