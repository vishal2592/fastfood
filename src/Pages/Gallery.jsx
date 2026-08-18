// pages/Gallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, 
//   FaKitchen, 
  FaUsers, 
  FaBuilding,
  FaCamera,
  FaVideo,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaHeart,
  FaShare,
  FaDownload,
  FaThumbsUp,
  FaComment,
  FaEye
} from 'react-icons/fa';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState([]);
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

    const animatedElements = document.querySelectorAll('.gallery-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  const galleryItems = [
    // Signature Dishes
    {
      id: 1,
      title: 'Signature Burger',
      category: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      description: 'Our famous double cheese burger with secret sauce',
      icon: FaUtensils,
      color: 'from-red-500 to-orange-500',
      likes: 234,
      comments: 45,
      views: 1234
    },
    {
      id: 2,
      title: 'Pizza Margherita',
      category: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&h=600&fit=crop',
      description: 'Classic Italian pizza with fresh basil and mozzarella',
      icon: FaUtensils,
      color: 'from-red-500 to-orange-500',
      likes: 189,
      comments: 32,
      views: 987
    },
    {
      id: 3,
      title: 'Grilled Salmon',
      category: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop',
      description: 'Perfectly grilled salmon with lemon butter sauce',
      icon: FaUtensils,
      color: 'from-red-500 to-orange-500',
      likes: 156,
      comments: 28,
      views: 876
    },
    // Kitchen Behind the Scenes
    // {
    //   id: 4,
    //   title: 'Chef at Work',
    //   category: 'Kitchen Behind the Scenes',
    //   image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&h=600&fit=crop',
    //   description: 'Our expert chefs preparing fresh ingredients daily',
    //   icon: FaKitchen,
    //   color: 'from-blue-500 to-blue-600',
    //   likes: 167,
    //   comments: 23,
    //   views: 654
    // },
    // {
    //   id: 5,
    //   title: 'Food Preparation',
    //   category: 'Kitchen Behind the Scenes',
    //   image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop',
    //   description: 'Fresh ingredients being prepared with care',
    //   icon: FaKitchen,
    //   color: 'from-blue-500 to-blue-600',
    //   likes: 145,
    //   comments: 19,
    //   views: 543
    // },
    // {
    //   id: 6,
    //   title: 'Cooking Process',
    //   category: 'Kitchen Behind the Scenes',
    //   image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&h=600&fit=crop',
    //   description: 'The art of cooking our signature dishes',
    //   icon: FaKitchen,
    //   color: 'from-blue-500 to-blue-600',
    //   likes: 198,
    //   comments: 31,
    //   views: 765
    // },
    // Customer Moments
    {
      id: 7,
      title: 'Happy Customers',
      category: 'Customer Moments',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
      description: 'Customers enjoying their meals with friends and family',
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      likes: 278,
      comments: 56,
      views: 1432
    },
    {
      id: 8,
      title: 'Celebration Time',
      category: 'Customer Moments',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=600&fit=crop',
      description: 'Special moments celebrated at our restaurant',
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      likes: 223,
      comments: 42,
      views: 1123
    },
    {
      id: 9,
      title: 'Family Dinner',
      category: 'Customer Moments',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      description: 'Families creating beautiful memories over delicious food',
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      likes: 312,
      comments: 67,
      views: 1567
    },
    // Restaurant Interior
    {
      id: 10,
      title: 'Dining Area',
      category: 'Restaurant Interior',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      description: 'Elegant and comfortable dining space',
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
      likes: 189,
      comments: 34,
      views: 876
    },
    {
      id: 11,
      title: 'Bar Area',
      category: 'Restaurant Interior',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
      description: 'Stylish bar with a wide selection of beverages',
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
      likes: 167,
      comments: 28,
      views: 765
    },
    {
      id: 12,
      title: 'Outdoor Seating',
      category: 'Restaurant Interior',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
      description: 'Beautiful outdoor seating area for al fresco dining',
      icon: FaBuilding,
      color: 'from-purple-500 to-purple-600',
      likes: 234,
      comments: 45,
      views: 1098
    },
    // Food Photography
    {
      id: 13,
      title: 'Plated Perfection',
      category: 'Food Photography',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
      description: 'Beautifully plated signature dishes',
      icon: FaCamera,
      color: 'from-pink-500 to-pink-600',
      likes: 345,
      comments: 67,
      views: 1876
    },
    {
      id: 14,
      title: 'Colorful Cuisine',
      category: 'Food Photography',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
      description: 'Vibrant and colorful food presentation',
      icon: FaCamera,
      color: 'from-pink-500 to-pink-600',
      likes: 289,
      comments: 54,
      views: 1543
    },
    {
      id: 15,
      title: 'Dessert Art',
      category: 'Food Photography',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop',
      description: 'Artistic dessert creations that taste as good as they look',
      icon: FaCamera,
      color: 'from-pink-500 to-pink-600',
      likes: 312,
      comments: 61,
      views: 1678
    },
    // Video Gallery
    {
      id: 16,
      title: 'Cooking Tutorial',
      category: 'Video Gallery',
      image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&h=600&fit=crop',
      description: 'Step-by-step cooking tutorial by our head chef',
      icon: FaVideo,
      color: 'from-cyan-500 to-cyan-600',
      isVideo: true,
      likes: 456,
      comments: 89,
      views: 2345
    },
    {
      id: 17,
      title: 'Restaurant Tour',
      category: 'Video Gallery',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      description: 'Virtual tour of our restaurant and kitchen',
      icon: FaVideo,
      color: 'from-cyan-500 to-cyan-600',
      isVideo: true,
      likes: 345,
      comments: 67,
      views: 1987
    },
    {
      id: 18,
      title: 'Customer Stories',
      category: 'Video Gallery',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
      description: 'Heartwarming stories from our valued customers',
      icon: FaVideo,
      color: 'from-cyan-500 to-cyan-600',
      isVideo: true,
      likes: 234,
      comments: 56,
      views: 1654
    }
  ];

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openLightbox = (item, index) => {
    setCurrentImage(item);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setCurrentImage(filteredItems[prevIndex]);
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
              <FaCamera className="text-yellow-400" />
              Gallery
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Our <span className="text-yellow-300">Visual</span> Story
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Explore our collection of memorable moments, delicious food, and beautiful spaces
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 bg-white shadow-md sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="gallery-item group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                  onClick={() => openLightbox(item, index)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56 sm:h-64 lg:h-72">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${item.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                      <Icon className="text-white/80 text-xs" />
                      {item.category}
                    </div>

                    {/* Video Badge */}
                    {item.isVideo && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                          <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-300 ${
                        likedItems.includes(item.id) 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                      } opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    >
                      <FaHeart className={`text-sm ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-500" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment className="text-blue-500" />
                        {item.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-green-500" />
                        {item.views}
                      </span>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}></div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-300 z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Video Badge on Lightbox */}
              {currentImage.isVideo && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse cursor-pointer hover:scale-110 transition-transform duration-300">
                    <FaPlay className="text-white text-3xl ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold">{currentImage.title}</h3>
              <p className="text-gray-400 text-sm">{currentImage.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FaHeart className="text-red-500" />
                  {currentImage.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FaComment className="text-blue-500" />
                  {currentImage.comments}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye className="text-green-500" />
                  {currentImage.views}
                </span>
                <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${currentImage.color} text-white text-xs`}>
                  {currentImage.category}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <FaArrowLeft className="text-xl" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <FaArrowRight className="text-xl" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Want to <span className="text-yellow-300">Share</span> Your Moments?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Tag us on social media and get featured in our gallery!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Share Your Story
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

export default Gallery;