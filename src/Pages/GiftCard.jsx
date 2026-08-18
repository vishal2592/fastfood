// pages/GiftCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGift, 
  FaStar, 
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaTruck,
  FaClock,
  FaShieldAlt
} from 'react-icons/fa';

const GiftCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    senderEmail: '',
    message: '',
    deliveryDate: ''
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

    const animatedElements = document.querySelectorAll('.gift-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const giftAmounts = [25, 50, 75, 100, 150, 200];
  const customAmounts = [25, 50, 100, 200, 500];

  const giftDesigns = [
    {
      id: 1,
      name: 'Classic Red',
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      icon: FaGift,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Gold Premium',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      icon: FaStar,
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Blue Elegance',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      icon: FaHeart,
      image: 'https://images.unsplash.com/photo-1532712937440-80d1c4f7b6ad?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Green Nature',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      icon: FaGift,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop'
    }
  ];

  const features = [
    {
      id: 1,
      icon: FaEnvelope,
      title: 'Email Delivery',
      description: 'Gift cards are delivered instantly via email',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: FaCalendarAlt,
      title: 'Schedule Delivery',
      description: 'Choose a future date for gift card delivery',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      icon: FaTruck,
      title: 'Free Shipping',
      description: 'Physical gift cards shipped for free',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      icon: FaShieldAlt,
      title: 'Secure Purchase',
      description: '100% secure payment processing',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Gift Cards Sold', color: 'text-blue-600' },
    { number: '4.9★', label: 'Average Rating', color: 'text-yellow-600' },
    { number: '98%', label: 'Customer Satisfaction', color: 'text-green-600' },
    { number: '24/7', label: 'Customer Support', color: 'text-red-600' }
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
        message: 'Thank you for your gift card purchase! Your gift card has been sent successfully.'
      });
      setFormData({ recipientName: '', recipientEmail: '', senderName: '', senderEmail: '', message: '', deliveryDate: '' });
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
              <FaGift className="text-yellow-400" />
              Gift Cards
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              The Perfect <span className="text-yellow-300">Gift</span> for Everyone
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Give the gift of delicious food with our digital and physical gift cards
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

      {/* Gift Card Selection */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Choose Your Gift Card
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Select <span className="text-red-600">Amount</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Choose the perfect amount for your gift card
            </p>
          </div>

          {/* Amount Selection */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
            {giftAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  selectedAmount === amount
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:shadow-md'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
            <span className="text-gray-600 font-semibold text-sm">Or enter custom amount:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-700">$</span>
              <input
                type="number"
                min="10"
                max="1000"
                placeholder="Custom"
                className="w-32 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-center"
                onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
              />
            </div>
            <span className="text-xs text-gray-500">(Min $10, Max $1000)</span>
          </div>

          {/* Gift Card Preview */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-white/70 text-sm">Gift Card</span>
                  <h3 className="text-2xl font-bold text-white">FastFood</h3>
                </div>
                <FaGift className="text-3xl text-yellow-400" />
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="text-4xl font-bold text-white">${selectedAmount}</p>
                <p className="text-red-200 text-sm mt-1">Valid for 1 year from purchase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card Designs */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-2">
              Designs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Choose a <span className="text-purple-600">Design</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Select from our beautiful gift card designs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {giftDesigns.map((design) => {
              const Icon = design.icon;
              return (
                <div
                  key={design.id}
                  className="gift-item group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                >
                  <div className={`h-32 bg-gradient-to-r ${design.color} flex items-center justify-center`}>
                    <Icon className="text-4xl text-white/80" />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-gray-800">{design.name}</h4>
                    <button className="mt-2 text-sm text-white bg-red-600 px-4 py-1.5 rounded-full hover:bg-red-700 transition-colors duration-300">
                      Select
                    </button>
                  </div>
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
              Why Gift Cards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Why Choose Our <span className="text-blue-600">Gift Cards</span>
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

      {/* Purchase Form */}
      <section className="py-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Purchase Gift Card
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Send a <span className="text-red-600">Gift Card</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Fill out the form below to send a gift card to your loved ones
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recipient Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Gift Card Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Amount *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-700">$</span>
                    <input
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
                      className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-center"
                      min="10"
                      max="1000"
                    />
                    <span className="text-xs text-gray-500">(Min $10, Max $1000)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank for immediate delivery</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Personal Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm resize-none"
                placeholder="Write a personal message to the recipient..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Purchase Gift Card
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
              What Our <span className="text-yellow-600">Customers</span> Say
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
                "The perfect gift for my food-loving friends! Easy to purchase and delivered instantly. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Happy Customer</p>
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
                "I love the design options and the ability to schedule delivery. The recipient loved it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Michael Chen</p>
                  <p className="text-xs text-gray-500">Frequent Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Give the Gift of <span className="text-yellow-300">Great Food</span>
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Purchase a gift card today and make someone's day special
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <a
              href="#purchase"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Buy Now
              <FaArrowRight className="text-sm" />
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftCard;