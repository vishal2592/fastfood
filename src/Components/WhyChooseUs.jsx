// components/WhyChooseUs.jsx
import React, { useEffect, useRef } from 'react';
import { 
  FaTruck, 
  FaClock, 
  FaLeaf, 
  FaUserFriends,
  FaMedal,
  FaMoneyBillWave,
  FaShieldAlt,
  FaSmile,
  FaArrowRight
} from 'react-icons/fa';

const WhyChooseUs = () => {
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

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: FaTruck,
      title: 'Fast Delivery',
      description: 'Hot and fresh food delivered to your doorstep in 30 minutes or less',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      icon: FaLeaf,
      title: 'Fresh Ingredients',
      description: 'We use only the freshest, locally sourced ingredients in all our dishes',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100',
      delay: 'animation-delay-200'
    },
    {
      id: 3,
      icon: FaMedal,
      title: 'Best Quality',
      description: 'Award-winning recipes and premium quality food that you can trust',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400',
      textColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Great value for money with competitive prices and daily deals',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-400',
      textColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      delay: 'animation-delay-400'
    },
    {
      id: 5,
      icon: FaUserFriends,
      title: 'Customer First',
      description: 'We put our customers first with 24/7 support and satisfaction guarantee',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
      textColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      delay: 'animation-delay-500'
    },
    {
      id: 6,
      icon: FaShieldAlt,
      title: 'Safe & Hygienic',
      description: 'Strict hygiene standards and safety protocols for your peace of mind',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverBorder: 'hover:border-red-400',
      textColor: 'text-red-600',
      iconBg: 'bg-red-100',
      delay: 'animation-delay-600'
    }
  ];

  return (
    <section ref={sectionRef} className="py-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full text-sm font-semibold mb-3 animate-fadeInUp shadow-lg">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Choose</span> Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
            We are committed to providing the best food experience with quality, speed, and service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group relative bg-white rounded-2xl border-2 ${feature.borderColor} ${feature.hoverBorder} shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden animate-on-scroll opacity-0 ${feature.delay} hover:-translate-y-2`}
              >
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Top Color Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color}`}></div>

                <div className="relative p-4">
                  {/* Icon Container with Gradient Background */}
                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 border-2 ${feature.borderColor}`}>
                    <Icon className={`text-2xl sm:text-3xl ${feature.textColor} group-hover:scale-110 transition-transform duration-300`} />
                    {/* Icon Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  </div>

                  {/* Title with Gradient on Hover */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-orange-500 transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-400 group-hover:text-red-600 transition-all duration-300">
                    Learn More
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Decorative Circle */}
                  <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full ${feature.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Trust Badge with Border */}
        <div className="mt-6 text-center animate-fadeInUp animation-delay-1000">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg px-6 sm:px-8 py-4 sm:py-5 hover:border-red-300 transition-all duration-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl animate-pulse">⭐</span>
              <span className="text-sm sm:text-base font-semibold text-gray-700">4.9/5.0 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl animate-bounce">🏆</span>
              <span className="text-sm sm:text-base font-semibold text-gray-700">Best Food 2024</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl animate-pulse">🚀</span>
              <span className="text-sm sm:text-base font-semibold text-gray-700">10K+ Customers</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 rounded-2xl p-4 text-center shadow-2xl border-2 border-red-400 animate-fadeInUp animation-delay-1000">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Ready to Order?
          </h3>
          <p className="text-red-100 mb-4 text-sm sm:text-base">
            Join thousands of satisfied customers and order now!
          </p>
          <button className="bg-white text-red-600 px-8 sm:px-10 py-3 rounded-full font-semibold hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white">
            Order Now 🍔
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;