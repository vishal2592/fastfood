// pages/Cater.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, 
  FaUsers, 
  FaClock, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaCalendarAlt,
  FaUser,
  FaComment,
  FaGift,
  FaTruck,
  FaLeaf,
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';

const Cater = () => {
  const [selectedPackage, setSelectedPackage] = useState('Standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    const animatedElements = document.querySelectorAll('.cater-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const packages = [
    {
      id: 1,
      name: 'Standard',
      icon: FaUtensils,
      price: '$25',
      perPerson: true,
      description: 'Perfect for small gatherings and corporate lunches',
      features: [
        'Choice of 3 main dishes',
        '2 side dishes',
        'Beverages included',
        'Paper plates & cutlery',
        'Free delivery within 5 miles'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      delay: 'animation-delay-100',
      popular: false,
      minGuests: 10,
      maxGuests: 50
    },
    {
      id: 2,
      name: 'Premium',
      icon: GiKnifeFork,
      price: '$40',
      perPerson: true,
      description: 'Ideal for weddings, parties, and special events',
      features: [
        'Choice of 5 main dishes',
        '4 side dishes',
        'Premium beverages & desserts',
        'Elegant table settings',
        'Free delivery within 10 miles',
        'Dedicated event coordinator'
      ],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      delay: 'animation-delay-200',
      popular: true,
      minGuests: 20,
      maxGuests: 200
    },
    {
      id: 3,
      name: 'Platinum',
      icon: FaStar,
      price: '$65',
      perPerson: true,
      description: 'Our most exclusive package for unforgettable events',
      features: [
        'Choice of 7 main dishes',
        '6 side dishes',
        'Premium bar & desserts',
        'Custom menu creation',
        'Unlimited delivery radius',
        'Personal chef & wait staff',
        'Event decoration included'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      delay: 'animation-delay-300',
      popular: false,
      minGuests: 50,
      maxGuests: 500
    },
    {
      id: 4,
      name: 'Corporate',
      icon: FaUsers,
      price: 'Custom',
      perPerson: false,
      description: 'Tailored solutions for corporate events and meetings',
      features: [
        'Custom menu design',
        'Corporate branding options',
        'Flexible scheduling',
        'VIP service',
        'Audio-visual setup',
        'Team building options'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      delay: 'animation-delay-400',
      popular: false,
      minGuests: 15,
      maxGuests: 300
    }
  ];

  const menuOptions = [
    { name: 'Appetizers', items: ['Bruschetta', 'Stuffed Mushrooms', 'Spring Rolls', 'Mini Tacos'] },
    { name: 'Main Courses', items: ['Grilled Salmon', 'Chicken Marsala', 'Beef Tenderloin', 'Vegetarian Pasta'] },
    { name: 'Sides', items: ['Roasted Vegetables', 'Garlic Mashed Potatoes', 'Wild Rice Pilaf', 'Caesar Salad'] },
    { name: 'Desserts', items: ['Tiramisu', 'Chocolate Mousse', 'Cheesecake', 'Fruit Tart'] }
  ];

  const eventTypes = [
    { name: 'Wedding', icon: FaHeart },
    { name: 'Birthday', icon: FaGift },
    { name: 'Corporate', icon: FaUsers },
    { name: 'Anniversary', icon: FaCalendarAlt },
    { name: 'Holiday Party', icon: FaStar },
    { name: 'Other', icon: FaUtensils }
  ];

  const stats = [
    { number: '500+', label: 'Events Catered', color: 'text-blue-600' },
    { number: '98%', label: 'Satisfaction Rate', color: 'text-green-600' },
    { number: '50+', label: 'Menu Options', color: 'text-red-600' },
    { number: '4.9★', label: 'Average Rating', color: 'text-yellow-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your catering inquiry! We will contact you within 24 hours.'
      });
      setFormData({ name: '', email: '', phone: '', eventDate: '', eventType: '', guests: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    }, 1500);
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
              <GiKnifeFork className="text-yellow-400" />
              Catering Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Elevate Your <span className="text-yellow-300">Event</span> with Our Catering
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              From intimate gatherings to large corporate events, we create unforgettable dining experiences
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-white border-b border-gray-100">
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

      {/* Packages Section */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Our Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose Your <span className="text-red-600">Package</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Select the perfect catering package for your event
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`cater-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${pkg.borderColor} hover:border-${pkg.textColor} hover:-translate-y-2 relative`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`w-14 h-14 rounded-full ${pkg.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-2xl ${pkg.textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-2xl font-bold text-gray-800">{pkg.price}</span>
                      {pkg.perPerson && <span className="text-sm text-gray-500">/person</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {pkg.description}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1.5">
                          <FaCheckCircle className="text-green-500 text-xs" />
                          {feature}
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-xs text-gray-500">+ {pkg.features.length - 4} more features</li>
                      )}
                    </ul>
                    <div className="text-xs text-gray-500 mb-3">
                      {pkg.minGuests} - {pkg.maxGuests} guests
                    </div>
                    <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-2.5 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg`}>
                      Select Package
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Options */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">
              Menu Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Our <span className="text-green-600">Catering</span> Menu
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Choose from our wide selection of delicious options
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuOptions.map((category) => (
              <div key={category.name} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-2 border-gray-100 hover:border-green-200">
                <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaUtensils className="text-green-600 text-sm" />
                  {category.name}
                </h4>
                <ul className="space-y-1.5">
                  {category.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-2">
              Event Types
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              We Cater for <span className="text-purple-600">All</span> Events
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {eventTypes.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.name} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center border-2 border-gray-100 hover:border-purple-200 hover:-translate-y-1">
                  <Icon className="text-purple-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">{event.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Why <span className="text-red-600">Choose</span> Us?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 border-gray-100 hover:border-red-200">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUtensils className="text-red-600 text-2xl" />
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-2">Fresh Ingredients</h4>
              <p className="text-sm text-gray-600">We use only the freshest, locally sourced ingredients</p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 border-gray-100 hover:border-red-200">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-red-600 text-2xl" />
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-2">Expert Team</h4>
              <p className="text-sm text-gray-600">Professional chefs and experienced event staff</p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 border-gray-100 hover:border-red-200">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaClock className="text-red-600 text-2xl" />
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-2">On-Time Delivery</h4>
              <p className="text-sm text-gray-600">We ensure your food arrives hot and on schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-2">
              Get a Quote
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Request <span className="text-blue-600">Catering</span> Quote
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you with a personalized quote
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-100">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((event) => (
                    <option key={event.name} value={event.name}>{event.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors duration-300 text-sm resize-none"
                placeholder="Any special requests, dietary restrictions, or additional details..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Get Quote
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>

            {formStatus.submitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-fadeInUp">
                <FaCheckCircle className="text-green-500" />
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold mb-2">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              What Our <span className="text-yellow-600">Clients</span> Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "Amazing catering service! They made our wedding reception unforgettable. The food was delicious and the presentation was stunning."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Emily & Michael</p>
                  <p className="text-xs text-gray-500">Wedding Reception</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "Our corporate event was a huge success thanks to FastFood Catering. Professional service and exceptional food quality."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">James Wilson</p>
                  <p className="text-xs text-gray-500">Corporate Event</p>
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
            Ready to <span className="text-yellow-300">Cater</span> Your Event?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Let us make your next event unforgettable with our exceptional catering services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <Link
              to="#quote"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Quote
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

export default Cater;