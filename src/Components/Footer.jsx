// components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaPaypal,
  FaCreditCard,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';

const Footer = () => {
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

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Offers', path: '/offers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const services = [
    { name: 'Online Order', path: 'onlineorder' },
    { name: 'Delivery Service', path: '/delivery' },
    { name: 'Catering', path: '/cater' },
    { name: 'Party Booking', path: '/party' },
    { name: 'Gift Cards', path: '/gift' },
    { name: 'Loyalty Program', path: '/loyalty' }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: '123 Food Street, New York, NY 10001' },
    { icon: FaPhone, text: '+1 (555) 123-4567' },
    { icon: FaEnvelope, text: 'info@fastfood.com' },
    { icon: FaClock, text: 'Mon-Sun: 10:00 AM - 11:00 PM' }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, url: '#', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, url: '#', color: 'hover:bg-pink-600' },
    { icon: FaYoutube, url: '#', color: 'hover:bg-red-600' },
    { icon: FaLinkedin, url: '#', color: 'hover:bg-blue-700' }
  ];

  const paymentMethods = [
    { icon: FaPaypal, name: 'PayPal' },
    { icon: FaCreditCard, name: 'Credit Card' },
    { icon: FaApplePay, name: 'Apple Pay' },
    { icon: FaGooglePay, name: 'Google Pay' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={sectionRef} className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1 - Brand Info */}
          <div className="animate-on-scroll opacity-0 animation-delay-100">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GiHamburger className="text-2xl text-yellow-400" />
              <span className="font-bold text-xl text-white">FastFood</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Delivering delicious, fresh food right to your doorstep. 
              We're passionate about good food and great service.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="animate-on-scroll opacity-0 animation-delay-200">
            <h3 className="text-white font-semibold text-base mb-4 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="animate-on-scroll opacity-0 animation-delay-300">
            <h3 className="text-white font-semibold text-base mb-4 relative">
              Our Services
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-2.5">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="animate-on-scroll opacity-0 animation-delay-400">
            <h3 className="text-white font-semibold text-base mb-4 relative">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-400">
                    <Icon className="text-yellow-400 text-sm mt-0.5 flex-shrink-0" />
                    <span>{info.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Middle Section - Newsletter & Payment */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Newsletter */}
            <div className="w-full md:w-auto flex-1">
              <h4 className="text-white font-semibold text-sm mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="w-full md:w-auto">
              <h4 className="text-white font-semibold text-sm mb-2 text-center md:text-right">
                We Accept
              </h4>
              <div className="flex gap-3 justify-center md:justify-end">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={index}
                      className="group relative"
                      title={method.name}
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300">
                        <Icon className="text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 text-lg" />
                      </div>
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {method.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              &copy; {currentYear} FastFood. All rights reserved. Made with ❤️
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;