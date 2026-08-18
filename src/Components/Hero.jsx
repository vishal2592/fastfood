// components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaClock, FaTruck } from 'react-icons/fa';

const Hero = () => {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const textRefs = useRef([]);

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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative md:min-h-screen bg-gradient-to-br from-red-800 via-red-700 to-red-600 overflow-y-auto"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-400 rounded-full opacity-15 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-400 rounded-full opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500 rounded-full opacity-10 animate-blob animation-delay-4000"></div>
        
        {/* Floating Food Items with bounce animation */}
        {/* <div className="absolute top-10 left-5 text-7xl animate-float opacity-60 hover:scale-125 transition-transform duration-300 cursor-pointer">
          🍔
        </div> */}
        <div className="absolute bottom-20 right-10 text-7xl animate-float animation-delay-1000 opacity-60 hover:scale-125 transition-transform duration-300 cursor-pointer">
          🍟
        </div>
        <div className="absolute top-1/3 right-10 text-6xl animate-float animation-delay-2000 opacity-60 hover:scale-125 transition-transform duration-300 cursor-pointer">
          🥤
        </div>
        <div className="absolute bottom-1/3 left-10 text-6xl animate-float animation-delay-3000 opacity-60 hover:scale-125 transition-transform duration-300 cursor-pointer">
          🍕
        </div>

        {/* Particle Effects */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-particle"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-particle animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-yellow-400 rounded-full animate-particle animation-delay-2000"></div>
        <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-particle animation-delay-3000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:min-h-screen flex items-center py-32 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-2.5 sm:space-y-3.5 md:space-y-4">
            {/* Badge with typing animation */}
            <div className="inline-block animate-fadeInUp">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold border border-white/10 animate-pulse-slow">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-yellow-400"></span>
                </span>
                <span className="animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-yellow-400">
                  Now Serving Fresh & Fast
                </span>
              </span>
            </div>

            {/* Heading with slide animation */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05]">
              <span className="block animate-slideLeft opacity-0 animate-on-scroll">
                Delicious Food
              </span>
              <span className="block text-yellow-300 animate-slideRight opacity-0 animate-on-scroll animation-delay-300">
                Delivered Fast
              </span>
            </h1>

            {/* Description with fade animation */}
            <p className="text-sm sm:text-base md:text-lg text-red-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeIn opacity-0 animate-on-scroll animation-delay-600">
              Craving something tasty? Get your favorite fast food delivered to your doorstep in minutes. Fresh, hot, and made with love!
            </p>

            {/* Stats with stagger animation */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2.5">
              <div className="flex items-center gap-1 sm:gap-2 text-white bg-white/10 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-200">
                <FaStar className="text-yellow-400 text-sm sm:text-base animate-spin-slow" />
                <div className="flex items-center">
                  <span className="font-bold text-sm sm:text-base animate-count">4.9</span>
                  <span className="text-red-200/80 text-[10px] sm:text-xs ml-0.5 sm:ml-1">(500+)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-white bg-white/10 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-400">
                <FaClock className="text-yellow-400 text-sm sm:text-base animate-pulse-slow" />
                <div className="flex items-center">
                  <span className="font-bold text-sm sm:text-base">15-20</span>
                  <span className="text-red-200/80 text-[10px] sm:text-xs ml-0.5 sm:ml-1">min</span>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-white bg-white/10 backdrop-blur-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-600">
                <FaTruck className="text-yellow-400 text-sm sm:text-base animate-bounce-slow" />
                <div className="flex items-center">
                  <span className="font-bold text-sm sm:text-base">Free</span>
                  <span className="text-red-200/80 text-[10px] sm:text-xs ml-0.5 sm:ml-1">delivery</span>
                </div>
              </div>
            </div>

            {/* Buttons with hover animations */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start animate-fadeInUp pt-0.5">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center bg-yellow-400 text-red-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl gap-2 whitespace-nowrap relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative flex items-center gap-2">
                  Order Now
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40 hover:scale-105 whitespace-nowrap relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative">View Menu</span>
              </Link>
            </div>

            {/* Trusted Brands with stagger */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
              <span className="bg-white/10 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white/90 text-[10px] sm:text-xs border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-800 hover:scale-110 transition-transform duration-300 cursor-pointer">
                ⭐⭐⭐⭐⭐
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white/90 text-[10px] sm:text-xs border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-1000 hover:scale-110 transition-transform duration-300 cursor-pointer">
                🏆 Best Food 2024
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white/90 text-[10px] sm:text-xs border border-white/5 animate-scaleIn opacity-0 animate-on-scroll animation-delay-1200 hover:scale-110 transition-transform duration-300 cursor-pointer">
                🚀 Fast Delivery
              </span>
            </div>
          </div>

          {/* Right Content - Hero Image with enhanced animations */}
          <div className="relative hidden lg:block">
            <div className="relative flex justify-center">
              {/* Main Image with rotate animation */}
              <div className="relative z-10 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
                  alt="Delicious Burger"
                  className="rounded-full w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] object-cover shadow-2xl border-4 border-white/20 hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer"
                />
                
                {/* Floating Badges with bounce */}
                <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-2 animate-bounce-slow">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl animate-pulse-slow">🔥</span>
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-gray-500">Popular</p>
                      <p className="font-bold text-[10px] sm:text-xs text-red-700">#1 Burger</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-2 animate-bounce-slow animation-delay-1000">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl animate-spin-slow">⭐</span>
                    <div>
                      <p className="text-[8px] sm:text-[10px] text-gray-500">Rating</p>
                      <p className="font-bold text-[10px] sm:text-xs text-red-700">4.9/5.0</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Rings with pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] border-4 border-yellow-400/10 rounded-full animate-spin-slow"></div>
                <div className="absolute w-[400px] h-[400px] lg:w-[460px] lg:h-[460px] border-4 border-white/5 rounded-full animate-spin-slow animation-delay-1000"></div>
                <div className="absolute w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] border border-yellow-400/5 rounded-full animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider with animation */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full animate-wave">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;