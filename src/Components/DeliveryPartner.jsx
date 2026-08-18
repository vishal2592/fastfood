// components/DeliveryPartner.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTruck, 
  FaClock, 
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaShoppingBag,
  FaUsers,
  FaAward,
  FaRocket
} from 'react-icons/fa';

const DeliveryPartner = () => {
  const sectionRef = useRef(null);
  const [hoveredPartner, setHoveredPartner] = useState(null);

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

  const partners = [
    {
      id: 1,
      name: 'FastTrack Logistics',
      logo: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=200&h=200&fit=crop',
      rating: 4.9,
      deliveries: '10K+',
      time: '15-20 min',
      coverage: '50+ Cities',
      experience: '5+ Years',
      description: 'Reliable and fastest delivery service with real-time tracking',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      name: 'Swift Delivery Co.',
      logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop',
      rating: 4.8,
      deliveries: '8K+',
      time: '20-25 min',
      coverage: '40+ Cities',
      experience: '3+ Years',
      description: 'Professional delivery team with excellent customer service',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      delay: 'animation-delay-200'
    },
    {
      id: 3,
      name: 'Food Express',
      logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop',
      rating: 4.7,
      deliveries: '12K+',
      time: '10-15 min',
      coverage: '60+ Cities',
      experience: '7+ Years',
      description: 'Specialized in food delivery with temperature-controlled packaging',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      name: 'Urban Rush',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      rating: 4.9,
      deliveries: '15K+',
      time: '12-18 min',
      coverage: '70+ Cities',
      experience: '4+ Years',
      description: 'Urban-focused delivery with high coverage and speed',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      delay: 'animation-delay-400'
    }
  ];

  const stats = [
    {
      id: 1,
      icon: FaUsers,
      number: '50+',
      label: 'Delivery Partners',
      color: 'from-blue-500 to-blue-600',
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      icon: FaRocket,
      number: '30min',
      label: 'Average Delivery',
      color: 'from-green-500 to-green-600',
      delay: 'animation-delay-200'
    },
    {
      id: 3,
      icon: FaAward,
      number: '4.9★',
      label: 'Average Rating',
      color: 'from-yellow-500 to-yellow-600',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      icon: FaGlobe,
      number: '100+',
      label: 'Cities Covered',
      color: 'from-purple-500 to-purple-600',
      delay: 'animation-delay-400'
    }
  ];

  const benefits = [
    {
      id: 1,
      icon: FaClock,
      title: 'Fast Delivery',
      description: 'Lightning-fast delivery with real-time tracking',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: FaCheckCircle,
      title: 'Quality Assured',
      description: 'Carefully packaged to maintain food quality',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      icon: FaMapMarkerAlt,
      title: 'Wide Coverage',
      description: 'Serving multiple cities with growing network',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 4,
      icon: FaUsers,
      title: 'Professional Team',
      description: 'Trained and experienced delivery professionals',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section ref={sectionRef} className="py-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-semibold mb-3 animate-fadeInUp shadow-sm">
            <FaTruck className="text-blue-500" />
            Delivery Partners
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
            Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Delivery</span> Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
            We partner with the best delivery services to ensure your food arrives hot and fresh
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 text-center animate-on-scroll opacity-0 ${stat.delay} hover:-translate-y-1 border border-gray-100 hover:border-blue-200`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10 flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`text-xl sm:text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
          {partners.map((partner) => {
            return (
              <div
                key={partner.id}
                className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${partner.borderColor} animate-on-scroll opacity-0 ${partner.delay} hover:-translate-y-2`}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Top Color Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${partner.color}`}></div>

                <div className="p-5 sm:p-6 md:p-7">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300"
                      />
                    </div>

                    {/* Partner Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {partner.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-sm font-semibold text-gray-700">{partner.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaShoppingBag className="text-gray-400" />
                          <span>{partner.deliveries} deliveries</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${partner.color} text-white text-xs font-semibold shadow-sm`}>
                      {partner.deliveries}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-300">
                      <FaClock className={`text-sm ${partner.textColor} mx-auto mb-1`} />
                      <div className="text-xs font-semibold text-gray-700">{partner.time}</div>
                      <div className="text-[10px] text-gray-500">Avg. Time</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-300">
                      <FaMapMarkerAlt className={`text-sm ${partner.textColor} mx-auto mb-1`} />
                      <div className="text-xs font-semibold text-gray-700">{partner.coverage}</div>
                      <div className="text-[10px] text-gray-500">Coverage</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-300">
                      <FaAward className={`text-sm ${partner.textColor} mx-auto mb-1`} />
                      <div className="text-xs font-semibold text-gray-700">{partner.experience}</div>
                      <div className="text-[10px] text-gray-500">Experience</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button className={`flex-1 bg-gradient-to-r ${partner.color} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      Partner With Us
                    </button>
                    <button className="flex-1 border-2 border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300 hover:border-blue-300">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${partner.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}></div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="text-center group animate-on-scroll opacity-0 animation-delay-200"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${benefit.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`text-xl sm:text-2xl ${benefit.color}`} />
                </div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-center shadow-2xl animate-fadeInUp animation-delay-1000">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            Become a Delivery Partner
          </h3>
          <p className="text-blue-100 mb-5 text-sm sm:text-base max-w-2xl mx-auto">
            Join our growing network of delivery partners and start earning today!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Register Now
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center gap-2"
            >
              <FaPhone className="text-sm" />
              Contact Us
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-300" />
              Free Registration
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-300" />
              Flexible Hours
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-green-300" />
              Weekly Payments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPartner;