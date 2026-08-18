// components/CustomerReview.jsx
import React, { useEffect, useRef, useState } from 'react';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaQuoteLeft, 
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaCheckCircle
} from 'react-icons/fa';

const CustomerReview = () => {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      date: '2 days ago',
      review: 'Absolutely amazing food! The delivery was super fast and the food was still hot when it arrived. The burger was juicy and the fries were perfectly crispy. Will definitely order again!',
      image: 'https://images.unsplash.com/photo-1494790108379-be9c6b7ee2b8?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Classic Burger Combo'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      date: '3 days ago',
      review: 'Best pizza in town! The crust was perfect and the toppings were fresh. My family loved it. The delivery guy was very friendly too. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Pepperoni Pizza'
    },
    {
      id: 3,
      name: 'Emily Davis',
      location: 'London, UK',
      rating: 4,
      date: '5 days ago',
      review: 'The chicken was delicious and well-cooked. The portion size was generous. Only minor feedback is that the delivery took a bit longer than expected, but the food quality made up for it.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Crispy Chicken Meal'
    },
    {
      id: 4,
      name: 'James Wilson',
      location: 'Sydney, Australia',
      rating: 5,
      date: '1 week ago',
      review: 'Incredible seafood platter! Everything was fresh and beautifully presented. The garlic butter sauce was divine. This is my new go-to place for seafood.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Seafood Platter'
    },
    {
      id: 5,
      name: 'Maria Garcia',
      location: 'Madrid, Spain',
      rating: 5,
      date: '1 week ago',
      review: 'The tacos were authentic and packed with flavor. The salsa was perfect - not too spicy but full of taste. Will definitely order again! Fast delivery too.',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Taco Trio'
    },
    {
      id: 6,
      name: 'David Kim',
      location: 'Seoul, South Korea',
      rating: 4,
      date: '2 weeks ago',
      review: 'The noodles were delicious and authentic. The portion was huge - enough for two people. Would love to see more spicy options on the menu.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      order: 'Spicy Noodles'
    }
  ];

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

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  // Reset auto-play when user interacts
  const handleManualNavigation = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % reviews.length;
    handleManualNavigation(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + reviews.length) % reviews.length;
    handleManualNavigation(prevIndex);
  };

  // Get visible reviews - always shows 3 reviews
  const getVisibleReviews = () => {
    const visible = [];
    const total = reviews.length;
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % total;
      visible.push(reviews[index]);
    }
    return visible;
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchStartX - touchEndX < -50) {
      prevSlide();
    }
  };

  const visibleReviews = getVisibleReviews();

  const stats = {
    averageRating: 4.8,
    totalReviews: 1247,
    ratingDistribution: {
      5: 78,
      4: 15,
      3: 5,
      2: 1,
      1: 1
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-3 animate-fadeInUp shadow-sm">
            <FaStar className="text-yellow-500" />
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Customers</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
            Real reviews from real customers who love our food
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-fadeInUp animation-delay-600 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gray-800">{stats.averageRating}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {renderStars(stats.averageRating)}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-gray-200"></div>
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 w-6">{star}★</span>
                    <div className="w-32 sm:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                        style={{ width: `${stats.ratingDistribution[star]}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{stats.ratingDistribution[star]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-green-600">
                <FaCheckCircle />
                <span className="text-sm font-semibold">Verified Reviews</span>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-gray-200 hover:border-red-300 hover:scale-110"
          >
            <FaChevronLeft className="text-gray-600 text-sm" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 border border-gray-200 hover:border-red-300 hover:scale-110"
          >
            <FaChevronRight className="text-gray-600 text-sm" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${currentSlide}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 md:p-7 border border-gray-100 hover:border-red-200 hover:-translate-y-2"
              >
                <div className="text-3xl text-red-200 group-hover:text-red-400 transition-colors duration-300">
                  <FaQuoteLeft />
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3 mb-4 line-clamp-4">
                  {review.review}
                </p>

                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500 ml-2">{review.rating}.0</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 hover:border-red-300 transition-colors duration-300"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-800 truncate">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{review.location}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                      <span className="text-[10px] text-gray-300">•</span>
                      <span className="text-[10px] text-gray-400">Order: {review.order}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Verified Purchase</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar className="text-xs" />
                      <span className="text-xs font-semibold text-gray-700">{review.rating}.0</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6 lg:hidden">
            <button
              onClick={prevSlide}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300"
            >
              <FaChevronLeft className="text-gray-600 text-sm" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-red-600' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300"
            >
              <FaChevronRight className="text-gray-600 text-sm" />
            </button>
          </div>

          {/* Desktop Indicators */}
          <div className="hidden lg:flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-red-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 animate-fadeInUp animation-delay-1000">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <span className="text-xl">⭐</span>
            <span className="text-sm font-semibold text-gray-700">4.8 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <span className="text-xl">👥</span>
            <span className="text-sm font-semibold text-gray-700">1,247+ Reviews</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
            <span className="text-xl">✅</span>
            <span className="text-sm font-semibold text-gray-700">100% Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;