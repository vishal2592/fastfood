// components/FoodCategories.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getCategories } from '../redux/slicer/categorySlice';

const FoodCategories = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const { categories, loading, error } = useSelector((state) => state.category);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Auto-scroll for mobile (unchanged)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isAutoScrolling || !categories || categories.length === 0) return;

    let scrollInterval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 160, behavior: 'smooth' });
      }
    }, 3000);

    const pauseAutoScroll = () => setIsAutoScrolling(false);
    const resumeAutoScroll = () => setIsAutoScrolling(true);

    container.addEventListener('mouseenter', pauseAutoScroll);
    container.addEventListener('mouseleave', resumeAutoScroll);
    container.addEventListener('touchstart', pauseAutoScroll);
    container.addEventListener('touchend', () => {
      setTimeout(resumeAutoScroll, 5000);
    });

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('mouseenter', pauseAutoScroll);
      container.removeEventListener('mouseleave', resumeAutoScroll);
      container.removeEventListener('touchstart', pauseAutoScroll);
      container.removeEventListener('touchend', resumeAutoScroll);
    };
  }, [isAutoScrolling, categories]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(container.scrollLeft < maxScroll - 10);
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -160, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 160, behavior: 'smooth' });
  };

  const fallbackImage = 'https://via.placeholder.com/200x200/ff6b6b/ffffff?text=Food';

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
          <p className="text-gray-500 mt-4">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load categories: {error}</p>
          <button
            onClick={() => dispatch(getCategories())}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">No categories available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 rounded-full text-sm font-semibold mb-3 shadow-sm">
            🍽️ Our Categories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Explore Our <span className="text-red-600">Food</span> Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover delicious meals from our carefully curated categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="relative">
          {/* Desktop: Grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {categories.map((category, index) => (
              <Link
                key={category._id || category.id || index}
                to={`/menu?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="group relative bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-2 ring-2 ring-gray-100 group-hover:ring-red-400 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <img
                      src={category.image || fallbackImage}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = fallbackImage; }}
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {category.itemCount ? `${category.itemCount}+ Items` : 'Explore'}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Mobile: Horizontal scroll with auto-slide */}
          <div className="sm:hidden relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="overflow-x-auto pb-4 scrollbar-hide flex gap-3 px-1 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {categories.map((category, index) => (
                <Link
                  key={category._id || category.id || index}
                  to={`/menu?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="group relative bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-300 overflow-hidden flex-shrink-0 w-28 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 ring-2 ring-gray-100 group-hover:ring-red-400 transition-all duration-300 shadow-md group-hover:shadow-lg">
                      <img
                        src={category.image || fallbackImage}
                        alt={category.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = fallbackImage; }}
                      />
                    </div>
                    <h3 className="text-xs font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 truncate">
                      {category.name}
                    </h3>
                    <p className="text-[10px] text-gray-500">
                      {category.itemCount ? `${category.itemCount}+ Items` : 'Explore'}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
              ))}
            </div>

            {/* Navigation Arrows for Mobile */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-1.5 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10 border border-gray-200"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-xs" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-1.5 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10 border border-gray-200"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-xs" />
              </button>
            )}

            {/* Indicator dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {categories.map((_, idx) => (
                <div
                  key={idx}
                  className="w-1.5 h-1.5 rounded-full bg-gray-300 transition-all duration-300"
                  style={{
                    backgroundColor: idx === 0 ? '#dc2626' : '#d1d5db',
                    width: idx === 0 ? '12px' : '6px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-6">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Categories
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-red-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-yellow-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default FoodCategories;