// pages/DeliveryServices.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTruck, 
  FaClock, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaShieldAlt,
  FaLeaf,
  FaBox,
  FaUser,
  FaComment,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const DeliveryServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
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

    const animatedElements = document.querySelectorAll('.delivery-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const deliveryAreas = [
    'All',
    'Downtown',
    'Uptown',
    'East Side',
    'West Side',
    'Suburbs'
  ];

  const deliveryOptions = [
    {
      id: 1,
      name: 'Standard Delivery',
      icon: FaTruck,
      description: 'Reliable delivery service with real-time tracking',
      price: 3.99,
      time: '30-40 min',
      features: ['Real-time tracking', 'SMS notifications', 'Standard packaging'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      delay: 'animation-delay-100',
      popular: false
    },
    {
      id: 2,
      name: 'Express Delivery',
      icon: FaClock,
      description: 'Lightning-fast delivery for urgent orders',
      price: 5.99,
      time: '15-20 min',
      features: ['Priority routing', 'Live GPS tracking', 'Premium packaging', 'Priority support'],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      delay: 'animation-delay-200',
      popular: true
    },
    {
      id: 3,
      name: 'Eco-Friendly Delivery',
      icon: FaLeaf,
      description: 'Sustainable delivery using electric vehicles',
      price: 2.99,
      time: '35-45 min',
      features: ['Zero emissions', 'Recyclable packaging', 'Carbon offset', 'Green initiative'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      delay: 'animation-delay-300',
      popular: false
    },
    {
      id: 4,
      name: 'Premium Delivery',
      icon: FaShieldAlt,
      description: 'White-glove service with extra care',
      price: 7.99,
      time: '20-25 min',
      features: ['Temperature controlled', 'Premium packaging', 'Dedicated driver', 'Concierge service'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      delay: 'animation-delay-400',
      popular: false
    }
  ];

  const coverageAreas = [
    { name: 'Downtown', time: '15-20 min', icon: FaMapMarkerAlt },
    { name: 'Uptown', time: '20-25 min', icon: FaMapMarkerAlt },
    { name: 'East Side', time: '25-30 min', icon: FaMapMarkerAlt },
    { name: 'West Side', time: '20-25 min', icon: FaMapMarkerAlt },
    { name: 'Suburbs', time: '30-40 min', icon: FaMapMarkerAlt },
    { name: 'Business District', time: '15-20 min', icon: FaMapMarkerAlt }
  ];

  const features = [
    {
      id: 1,
      icon: FaClock,
      title: 'Fast Delivery',
      description: 'Average delivery time of 20-30 minutes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: FaMapMarkerAlt,
      title: 'Wide Coverage',
      description: 'Serving all major areas and suburbs',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'Contactless delivery with safety protocols',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 4,
      icon: FaCheckCircle,
      title: 'Real-time Tracking',
      description: 'Track your order from kitchen to door',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Deliveries Completed', color: 'text-blue-600' },
    { number: '4.9★', label: 'Average Rating', color: 'text-yellow-600' },
    { number: '98%', label: 'On-Time Delivery', color: 'text-green-600' },
    { number: '50+', label: 'Delivery Areas', color: 'text-red-600' }
  ];

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
              <FaTruck className="text-yellow-400" />
              Delivery Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Fast & Reliable <span className="text-yellow-300">Delivery</span>
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Get your favorite food delivered hot and fresh to your doorstep in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Choose Your Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Delivery <span className="text-red-600">Options</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Select the delivery option that best suits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {deliveryOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`delivery-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${option.borderColor} hover:border-${option.textColor} hover:-translate-y-2 relative`}
                >
                  {option.popular && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`w-14 h-14 rounded-full ${option.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-2xl ${option.textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-gray-800">
                        ${option.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaClock className="text-gray-400" />
                        {option.time}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {option.features.map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1.5">
                          <FaCheckCircle className="text-green-500 text-xs" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full bg-gradient-to-r ${option.color} text-white py-2.5 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg`}>
                      Select Option
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-2">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Delivery <span className="text-blue-600">Features</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="text-center group">
                  <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-xl ${feature.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">
              Coverage Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Where We <span className="text-green-600">Deliver</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              We're expanding our delivery zones to serve more customers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {coverageAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.name} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center border-2 border-gray-100 hover:border-green-200 hover:-translate-y-1">
                  <Icon className="text-green-600 text-lg mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-gray-800">{area.name}</h4>
                  <p className="text-xs text-gray-500">{area.time}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Simple <span className="text-red-600">Delivery</span> Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaBox className="text-white text-2xl" />
              </div>
              <div className="relative">
                <div className="hidden sm:block absolute top-8 left-full w-full h-0.5 bg-red-200"></div>
                <h4 className="text-base font-bold text-gray-800">1. Place Order</h4>
                <p className="text-sm text-gray-600">Select your food and choose delivery option</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaTruck className="text-white text-2xl" />
              </div>
              <div className="relative">
                <div className="hidden sm:block absolute top-8 left-full w-full h-0.5 bg-red-200"></div>
                <h4 className="text-base font-bold text-gray-800">2. Food Prepared</h4>
                <p className="text-sm text-gray-600">Our chefs prepare your meal with care</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h4 className="text-base font-bold text-gray-800">3. Delivered Hot</h4>
              <p className="text-sm text-gray-600">Get your food delivered hot and fresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold mb-2">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              What Our <span className="text-yellow-600">Customers</span> Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "Amazing delivery service! My food arrived hot and on time. The tracking feature is really helpful."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Regular Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "The express delivery is a lifesaver! Always on time and the food is always fresh and delicious."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Michael Chen</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Ready to <span className="text-yellow-300">Order</span>?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Experience fast, reliable delivery service today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Order Now
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Contact Us
              <FaPhone className="text-sm" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryServices;