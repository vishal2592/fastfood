// pages/Contact.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaArrowRight,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaPaperPlane,
  FaQuestionCircle,
  FaTruck,
  FaUtensils,
  FaStar
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

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

    const animatedElements = document.querySelectorAll('.contact-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      id: 1,
      icon: FaPhone,
      title: 'Phone Number',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      icon: FaEnvelope,
      title: 'Email Address',
      details: ['info@fastfood.com', 'support@fastfood.com'],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      delay: 'animation-delay-200'
    },
    {
      id: 3,
      icon: FaMapMarkerAlt,
      title: 'Restaurant Location',
      details: ['123 Food Street', 'New York, NY 10001', 'United States'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      icon: FaClock,
      title: 'Opening Hours',
      details: ['Monday - Friday: 10:00 AM - 11:00 PM', 'Saturday - Sunday: 10:00 AM - 12:00 AM'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      delay: 'animation-delay-400'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', color: 'hover:bg-blue-600', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { icon: FaTwitter, url: '#', color: 'hover:bg-sky-500', bgColor: 'bg-sky-100', textColor: 'text-sky-600' },
    { icon: FaInstagram, url: '#', color: 'hover:bg-pink-600', bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
    { icon: FaYoutube, url: '#', color: 'hover:bg-red-600', bgColor: 'bg-red-100', textColor: 'text-red-600' },
    { icon: FaLinkedin, url: '#', color: 'hover:bg-blue-700', bgColor: 'bg-blue-100', textColor: 'text-blue-700' }
  ];

  const quickLinks = [
    { icon: FaQuestionCircle, label: 'FAQ', path: '/faq', color: 'text-purple-600' },
    { icon: FaTruck, label: 'Delivery Info', path: '/delivery', color: 'text-blue-600' },
    { icon: FaUtensils, label: 'Menu', path: '/menu', color: 'text-red-600' },
    { icon: FaStar, label: 'Reviews', path: '/reviews', color: 'text-yellow-600' }
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
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Get In <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              We'd love to hear from you! Reach out to us for any questions, feedback, or inquiries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.id}
                  className={`contact-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 border-2 border-gray-100 hover:border-${info.textColor} hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-full ${info.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-xl ${info.textColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
                  Send a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  We'd Love to <span className="text-red-600">Hear</span> From You
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm resize-none"
                    placeholder="Write your message here..."
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </button>

                {formStatus.submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-fadeInUp">
                    <FaCheckCircle className="text-green-500" />
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* Google Map */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">
                  Find Us
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Our <span className="text-green-600">Location</span>
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Visit us at our restaurant and enjoy the best food experience
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 h-80 sm:h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7fe57%3A0xb8a1c7ac8a6ebf2!2sNew%20York%20City!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Restaurant Location"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-600" />
                    123 Food Street, New York, NY 10001
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links & Social Media */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-red-600" />
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-red-200"
                    >
                      <Icon className={`text-sm ${link.color}`} />
                      <span className="text-sm font-semibold text-gray-700">{link.label}</span>
                      <FaArrowRight className="text-xs text-gray-400 ml-auto" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Connect With Us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Follow us on social media for updates, promotions, and more!
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-full ${social.bgColor} ${social.textColor} flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg`}
                    >
                      <Icon className="text-xl" />
                    </a>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-white rounded-xl shadow-md border-2 border-gray-100">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-red-500">📱</span>
                  Download our app for exclusive offers and faster ordering!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-3">
            Quick Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-gray-600 text-sm mb-6 max-w-xl mx-auto">
            Find quick answers to the most common questions our customers ask
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                What are your delivery hours?
              </h4>
              <p className="text-sm text-gray-600">
                We deliver 10:00 AM - 11:00 PM daily
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                Do you offer gift cards?
              </h4>
              <p className="text-sm text-gray-600">
                Yes! Available online and in-store
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                Can I make a reservation?
              </h4>
              <p className="text-sm text-gray-600">
                Yes, call us or book online
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                Do you offer catering?
              </h4>
              <p className="text-sm text-gray-600">
                Yes, for events and parties
              </p>
            </div>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 mt-6 text-red-600 font-semibold hover:gap-3 transition-all duration-300"
          >
            View All FAQs
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Ready to <span className="text-yellow-300">Order</span>?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Browse our menu and place your order now for fast delivery
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
              Call Us: (555) 123-4567
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;