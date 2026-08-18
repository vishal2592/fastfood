// pages/PartyBook.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaClock, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaUser,
  FaComment,
  FaGift,
  FaUtensils,
  FaMusic,
  FaCamera,
//   FaBalloon,
//   FaCake,
  FaGlassCheers,
  FaSnowflake,
  FaBirthdayCake,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

const PartyBook = () => {
  const [selectedPackage, setSelectedPackage] = useState('Standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partyDate: '',
    partyType: '',
    guests: '',
    package: '',
    message: '',
    specialRequests: ''
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

    const animatedElements = document.querySelectorAll('.party-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const partyPackages = [
    {
      id: 1,
      name: 'Silver Package',
      icon: FaStar,
      price: '$299',
      description: 'Perfect for small gatherings and intimate parties',
      features: [
        'Food for up to 20 guests',
        '2-course meal',
        'Basic decorations',
        'Standard table setup',
        '4 hours venue access'
      ],
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-600',
      delay: 'animation-delay-100',
      popular: false,
      maxGuests: 20
    },
    {
      id: 2,
      name: 'Gold Package',
      icon: FaStar,
      price: '$499',
      description: 'Ideal for birthdays, anniversaries, and celebrations',
      features: [
        'Food for up to 40 guests',
        '3-course meal',
        'Premium decorations',
        'Custom theme setup',
        '6 hours venue access',
        'Dedicated party host'
      ],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      delay: 'animation-delay-200',
      popular: true,
      maxGuests: 40
    },
    {
      id: 3,
      name: 'Platinum Package',
      icon: FaStar,
      price: '$799',
      description: 'Luxury party experience for special occasions',
      features: [
        'Food for up to 60 guests',
        '4-course gourmet meal',
        'Luxury decorations',
        'Custom theme & lighting',
        '8 hours venue access',
        'Dedicated party planner',
        'Professional photographer'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      delay: 'animation-delay-300',
      popular: false,
      maxGuests: 60
    },
    {
      id: 4,
      name: 'Diamond Package',
      icon: FaStar,
      price: '$1299',
      description: 'Ultimate party experience for unforgettable events',
      features: [
        'Food for up to 100 guests',
        '5-course premium menu',
        'Exclusive decorations',
        'Custom theme & entertainment',
        '10 hours venue access',
        'Event coordinator',
        'Photography & videography',
        'DJ & dance floor'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      delay: 'animation-delay-400',
      popular: false,
      maxGuests: 100
    }
  ];

  const partyTypes = [
    { name: 'Birthday Party', icon: FaBirthdayCake, color: 'text-pink-500' },
    { name: 'Anniversary', icon: FaGlassCheers, color: 'text-red-500' },
    { name: 'Baby Shower', icon: FaSnowflake, color: 'text-blue-400' },
    { name: 'Engagement', icon: FaGift, color: 'text-purple-500' },
    { name: 'Graduation', icon: FaStar, color: 'text-yellow-500' },
    { name: 'Corporate Event', icon: FaUsers, color: 'text-blue-600' },
    // { name: 'Holiday Party', icon: FaCake, color: 'text-red-600' },
    { name: 'Other', icon: FaUtensils, color: 'text-gray-500' }
  ];

  const features = [
    {
      id: 1,
      icon: FaUtensils,
      title: 'Delicious Food',
      description: 'Customized menus to suit your taste',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      icon: FaMusic,
      title: 'Entertainment',
      description: 'DJ, music, and dance arrangements',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      icon: FaCamera,
      title: 'Photography',
      description: 'Capture special moments forever',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    // {
    //   id: 4,
    //   icon: FaBalloon,
    //   title: 'Decorations',
    //   description: 'Custom themes and decorations',
    //   color: 'text-pink-600',
    //   bgColor: 'bg-pink-50'
    // }
  ];

  const stats = [
    { number: '500+', label: 'Parties Hosted', color: 'text-pink-600' },
    { number: '98%', label: 'Satisfaction Rate', color: 'text-green-600' },
    { number: '50+', label: 'Theme Options', color: 'text-blue-600' },
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
        message: 'Thank you for your party booking request! We will contact you within 24 hours.'
      });
      setFormData({ name: '', email: '', phone: '', partyDate: '', partyType: '', guests: '', package: '', message: '', specialRequests: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-700 via-pink-600 to-red-500 py-20 sm:py-24 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 animate-fadeInUp border border-white/20">
              <FaCalendarAlt className="text-yellow-400" />
              Party Booking
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Plan Your <span className="text-yellow-300">Perfect</span> Party
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Let us help you create unforgettable memories with our premium party planning services
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

      {/* Party Packages */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold mb-2">
              Our Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose Your <span className="text-pink-600">Party</span> Package
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Select the perfect package for your special occasion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partyPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`party-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${pkg.borderColor} hover:border-${pkg.textColor} hover:-translate-y-2 relative`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
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
                      <span className="text-sm text-gray-500">/event</span>
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
                      Up to {pkg.maxGuests} guests
                    </div>
                    <button className={`w-full bg-gradient-to-r ${pkg.color} text-white py-2.5 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg`}>
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Party Types */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-2">
              Event Types
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              We Plan <span className="text-purple-600">All</span> Types of Parties
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {partyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.name} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center border-2 border-gray-100 hover:border-purple-200 hover:-translate-y-1">
                  <Icon className={`${type.color} text-2xl mx-auto mb-2`} />
                  <p className="text-xs font-semibold text-gray-700">{type.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-2">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              We Make Your <span className="text-blue-600">Party</span> Special
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

      {/* Booking Form */}
      <section className="py-4 bg-gradient-to-r from-pink-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold mb-2">
              Book Your Party
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Request a <span className="text-pink-600">Booking</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Fill out the form below and we'll help you plan the perfect party
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Party Date *
                </label>
                <input
                  type="date"
                  name="partyDate"
                  value={formData.partyDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Party Type *
                </label>
                <select
                  name="partyType"
                  value={formData.partyType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
                >
                  <option value="">Select party type</option>
                  {partyTypes.map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Package
              </label>
              <select
                name="package"
                value={formData.package}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm"
              >
                <option value="">Select a package</option>
                {partyPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>{pkg.name} - {pkg.price}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm resize-none"
                placeholder="Any special requests, dietary restrictions, or additional details..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 outline-none transition-colors duration-300 text-sm resize-none"
                placeholder="Any additional information..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 bg-gradient-to-r from-pink-600 to-red-600 text-white py-3.5 rounded-xl font-semibold hover:from-pink-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Book Party
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
      <section className="py-4 bg-white">
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
            <div className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "Amazing party planning service! They took care of everything and our daughter's birthday party was perfect!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Birthday Party</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "The team went above and beyond for our anniversary party. The decorations and food were exceptional!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Michael & Emily</p>
                  <p className="text-xs text-gray-500">Anniversary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Ready to <span className="text-yellow-300">Book</span> Your Party?
          </h2>
          <p className="text-pink-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Let us make your special occasion unforgettable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-pink-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
              <FaArrowRight className="text-sm" />
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              <FaPhone className="text-sm" />
              Call Us: (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartyBook;