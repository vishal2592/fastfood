// pages/FAQ.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaMinus, 
  FaSearch,
  FaUtensils,
  FaTruck,
  FaCreditCard,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaGift,
  FaShieldAlt,
  FaQuestionCircle,
  FaComments
} from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState([]);
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

    const animatedElements = document.querySelectorAll('.faq-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory, searchTerm]);

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const faqCategories = [
    { id: 'All', label: 'All Questions', icon: FaQuestionCircle, color: 'bg-gray-600' },
    { id: 'General', label: 'General', icon: FaUtensils, color: 'bg-red-600' },
    { id: 'Orders', label: 'Orders', icon: FaTruck, color: 'bg-blue-600' },
    { id: 'Payments', label: 'Payments', icon: FaCreditCard, color: 'bg-green-600' },
    { id: 'Delivery', label: 'Delivery', icon: FaClock, color: 'bg-orange-600' },
    { id: 'Contact', label: 'Contact', icon: FaPhone, color: 'bg-purple-600' }
  ];

  const faqData = [
    // General Questions
    {
      id: 1,
      category: 'General',
      question: 'What are your restaurant hours?',
      answer: 'We are open 7 days a week from 10:00 AM to 11:00 PM. On weekends, we extend our hours until midnight. We also offer delivery services during these hours.',
      icon: FaClock,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 2,
      category: 'General',
      question: 'Do you offer vegetarian/vegan options?',
      answer: 'Yes! We have a wide variety of vegetarian and vegan options on our menu. We also offer gluten-free options for our customers with dietary restrictions. Please check our menu for specific items or ask our staff for recommendations.',
      icon: FaUtensils,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 3,
      category: 'General',
      question: 'Do you offer catering services?',
      answer: 'Yes, we offer catering services for events, parties, and corporate gatherings. Please contact our events team at events@fastfood.com or call us at (555) 123-4567 for a customized quote.',
      icon: FaUsers,
      color: 'from-red-500 to-red-600'
    },
    // Orders
    {
      id: 4,
      category: 'Orders',
      question: 'How do I place an order?',
      answer: 'You can place an order through our website, mobile app, or by calling us directly. Simply browse our menu, select your items, add them to your cart, and proceed to checkout. You\'ll receive a confirmation email with your order details.',
      icon: FaTruck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 5,
      category: 'Orders',
      question: 'Can I modify my order after placing it?',
      answer: 'Orders can be modified within 5 minutes of placing them. Please contact our customer service team immediately at (555) 123-4567 if you need to make changes. After that, your order will be prepared and modifications may not be possible.',
      icon: FaTruck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 6,
      category: 'Orders',
      question: 'Do you accept bulk orders?',
      answer: 'Yes, we accept bulk orders for events and large gatherings. Please place your order at least 24 hours in advance. Contact our team at (555) 123-4567 or email bulkorders@fastfood.com for assistance.',
      icon: FaTruck,
      color: 'from-blue-500 to-blue-600'
    },
    // Payments
    {
      id: 7,
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery. All payments are secure and encrypted.',
      icon: FaCreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 8,
      category: 'Payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and secure payment gateways to protect your information. We never store your credit card details on our servers. Your security is our top priority.',
      icon: FaCreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 9,
      category: 'Payments',
      question: 'Do you offer gift cards?',
      answer: 'Yes, we offer digital and physical gift cards in various denominations. Gift cards can be purchased online or at our restaurant and are valid for one year from the date of purchase.',
      icon: FaGift,
      color: 'from-green-500 to-green-600'
    },
    // Delivery
    {
      id: 10,
      category: 'Delivery',
      question: 'How much does delivery cost?',
      answer: 'Delivery is free for orders above $20. For orders under $20, a delivery fee of $3.99 applies. During peak hours, delivery may take slightly longer, but we always strive to deliver as quickly as possible.',
      icon: FaClock,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 11,
      category: 'Delivery',
      question: 'How long does delivery take?',
      answer: 'Average delivery time is 20-30 minutes, depending on your location and order volume. You can track your order in real-time through our website or app. We\'ll also send you notifications about your delivery status.',
      icon: FaClock,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 12,
      category: 'Delivery',
      question: 'What areas do you deliver to?',
      answer: 'We currently deliver to all areas within a 10-mile radius of our restaurant. You can check if we deliver to your area by entering your zip code at checkout. We\'re constantly expanding our delivery zone.',
      icon: FaMapMarkerAlt,
      color: 'from-orange-500 to-orange-600'
    },
    // Contact
    {
      id: 13,
      category: 'Contact',
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team through multiple channels: Phone: (555) 123-4567, Email: support@fastfood.com, Live Chat: Available on our website, Social Media: @FastFood on all platforms. We\'re available 10 AM - 11 PM, 7 days a week.',
      icon: FaPhone,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 14,
      category: 'Contact',
      question: 'What is your complaint resolution process?',
      answer: 'We take all complaints seriously. You can submit complaints through our online form, email, or phone. Our team will respond within 24 hours and work to resolve the issue to your satisfaction. We follow up on all complaints to ensure resolution.',
      icon: FaComments,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 15,
      category: 'Contact',
      question: 'Do you have a physical location I can visit?',
      answer: 'Yes! Our restaurant is located at 123 Food Street, New York, NY 10001. We\'re open daily from 10:00 AM to 11:00 PM. You can also visit us for dine-in, takeout, and special events.',
      icon: FaMapMarkerAlt,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Quick stats
  const stats = [
    { icon: FaCheckCircle, number: '15+', label: 'FAQ Categories', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: FaUsers, number: '10K+', label: 'Happy Customers', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: FaClock, number: '24/7', label: 'Customer Support', color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: FaStar, number: '4.9', label: 'Satisfaction Rate', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
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
              <FaQuestionCircle className="text-yellow-400" />
              FAQ
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Frequently Asked <span className="text-yellow-300">Questions</span>
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Find answers to the most common questions about our restaurant, orders, delivery, and more
            </p>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-4 bg-white shadow-md sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-red-500 outline-none transition-colors duration-300 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="text-xs" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

         {/* Stats Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`text-lg ${stat.color}`} />
                  </div>
                  <div className="text-lg font-bold text-gray-800">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredFaqs.length}</span> answers
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((item, index) => {
              const isOpen = openItems.includes(item.id);
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`faq-item bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                    isOpen ? 'border-red-200' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 flex items-center justify-center mt-1`}>
                      <Icon className={`text-sm bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold bg-gradient-to-r ${item.color} bg-opacity-10 px-2 py-0.5 rounded-full text-gray-600`}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-800 mt-1">
                        {item.question}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-red-50 text-red-600' : 'hover:bg-gray-200'
                    }`}>
                      {isOpen ? (
                        <FaMinus className="text-xs" />
                      ) : (
                        <FaPlus className="text-xs" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t-2 border-gray-100 pt-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">No questions found.</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaComments className="text-3xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaPhone className="text-sm" />
                Contact Support
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200"
              >
                <FaEnvelope className="text-sm" />
                Email Us
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FaClock className="text-red-500" />
                Available 24/7
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheckCircle className="text-green-500" />
                Fast Response
              </span>
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="text-blue-500" />
                Friendly Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <FaPhone className="text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Phone</p>
              <p className="text-xs text-gray-500">(555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-2">
                <FaEnvelope className="text-green-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Email</p>
              <p className="text-xs text-gray-500">support@fastfood.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-2">
                <FaMapMarkerAlt className="text-red-600" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Location</p>
              <p className="text-xs text-gray-500">123 Food Street, NY</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Need <span className="text-yellow-300">Help</span>?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            We're here to assist you with any questions or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get In Touch
              <FaArrowRight className="text-sm" />
            </Link>
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

export default FAQ;