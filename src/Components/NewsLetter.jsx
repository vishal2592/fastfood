// components/NewsLetter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaCheckCircle,
  FaTimes,
  FaBell,
  FaGift,
  FaMobile
} from 'react-icons/fa';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setIsError(true);
      setErrorMessage('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setErrorMessage('Enter a valid email');
      return;
    }

    setIsSubmitted(true);
    setIsError(false);
    setEmail('');
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsError(false);
    setErrorMessage('');
  };

  const benefits = [
    { id: 1, icon: FaGift, text: 'Exclusive Offers', color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 2, icon: FaBell, text: 'New Arrivals', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 3, icon: FaMobile, text: 'Mobile Alerts', color: 'text-green-500', bgColor: 'bg-green-50' }
  ];

  return (
    <section ref={sectionRef} className="py-4 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 rounded-full opacity-5 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 rounded-full opacity-5 blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-semibold mb-3 animate-fadeInUp border border-white/20">
            <FaEnvelope className="text-yellow-400 text-[10px]" />
            Newsletter
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 animate-fadeInUp animation-delay-200">
            Subscribe to Our <span className="text-yellow-400">Newsletter</span>
          </h2>

          {/* Description */}
          <p className="text-red-100 text-xs sm:text-sm max-w-xl mx-auto mb-4 animate-fadeInUp animation-delay-400">
            Get exclusive deals, new menu items, and special offers directly in your inbox.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 animate-fadeInUp animation-delay-600">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.id} className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-full ${benefit.bgColor}`}>
                    <Icon className={`text-[10px] sm:text-xs ${benefit.color}`} />
                  </div>
                  <span className="text-white text-[10px] sm:text-xs font-medium">
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Newsletter Form */}
          <div className="max-w-xl mx-auto animate-fadeInUp animation-delay-800">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsError(false);
                      setErrorMessage('');
                    }}
                    placeholder="Enter your email"
                    className={`w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border ${
                      isError ? 'border-red-400' : 'border-white/20 hover:border-white/40'
                    } focus:border-yellow-400 outline-none transition-all duration-300 text-xs sm:text-sm`}
                    disabled={isSubmitted}
                  />
                  {isError && (
                    <p className="absolute -bottom-5 left-3 text-red-300 text-[10px] sm:text-xs">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    isSubmitted 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'bg-yellow-400 text-red-700 hover:bg-yellow-300 hover:scale-105'
                  } shadow-lg hover:shadow-xl disabled:opacity-70`}
                >
                  {isSubmitted ? (
                    <>
                      <FaCheckCircle className="text-white text-xs" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <FaPaperPlane className="text-[10px] sm:text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-2.5 text-green-100 text-xs animate-fadeInUp flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-green-400 text-xs" />
                  <span>Thank you! Check your email for confirmation.</span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-green-200 hover:text-white transition-colors duration-300"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}
          </div>

          {/* Trust Indicator */}
          <div className="mt-3 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-white/60 text-[10px] sm:text-xs animate-fadeInUp animation-delay-1000">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">🔒</span>
              No spam, unsubscribe anytime
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">📧</span>
              10K+ subscribers
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              Trusted by food lovers
            </span>
          </div>

          {/* Decorative Bottom Line */}
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40 animate-pulse animation-delay-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/20 animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;