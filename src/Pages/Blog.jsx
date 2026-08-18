// pages/Blog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, 
  FaLeaf, 
  FaMagic, 
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaBullhorn,
  FaSearch,
  FaUser,
  FaClock,
  FaTag,
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaArrowRight,
  FaPlay,
  FaImage,
  FaQuoteLeft
} from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
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

    const animatedElements = document.querySelectorAll('.blog-post');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory, searchTerm]);

  const blogPosts = [
    // New Menu Launches
    {
      id: 1,
      title: 'Introducing Our Summer Menu 2024',
      category: 'New Menu Launches',
      excerpt: 'Discover our exciting new summer menu featuring fresh seasonal ingredients and innovative flavors.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop',
      author: 'Chef Maria Rodriguez',
      date: 'June 15, 2024',
      readTime: '5 min read',
      likes: 234,
      comments: 45,
      icon: FaUtensils,
      color: 'from-red-500 to-orange-500',
      featured: true
    },
    {
      id: 2,
      title: 'Plant-Based Menu Additions',
      category: 'New Menu Launches',
      excerpt: 'We\'re expanding our plant-based options with delicious new dishes that everyone will love.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop',
      author: 'Chef David Chen',
      date: 'June 10, 2024',
      readTime: '4 min read',
      likes: 189,
      comments: 32,
      icon: FaUtensils,
      color: 'from-green-500 to-green-600'
    },
    // Healthy Eating Tips
    {
      id: 3,
      title: '10 Tips for Healthy Eating',
      category: 'Healthy Eating Tips',
      excerpt: 'Practical tips to help you maintain a balanced diet while still enjoying delicious food.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop',
      author: 'Nutritionist Sarah Johnson',
      date: 'June 8, 2024',
      readTime: '7 min read',
      likes: 312,
      comments: 67,
      icon: FaLeaf,
      color: 'from-green-500 to-green-600',
      featured: true
    },
    {
      id: 4,
      title: 'Superfoods You Should Try',
      category: 'Healthy Eating Tips',
      excerpt: 'Discover the most nutrient-dense superfoods and how to incorporate them into your diet.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop',
      author: 'Nutritionist Sarah Johnson',
      date: 'June 5, 2024',
      readTime: '6 min read',
      likes: 245,
      comments: 43,
      icon: FaLeaf,
      color: 'from-green-500 to-green-600'
    },
    // Cooking Secrets
    {
      id: 5,
      title: 'Secrets of Perfect Pasta',
      category: 'Cooking Secrets',
      excerpt: 'Learn the tricks to making restaurant-quality pasta at home every time.',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=500&fit=crop',
      author: 'Chef Marco Rossi',
      date: 'June 3, 2024',
      readTime: '8 min read',
      likes: 278,
      comments: 56,
      icon: FaMagic,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 6,
      title: 'The Art of Seasoning',
      category: 'Cooking Secrets',
      excerpt: 'Master the art of seasoning to elevate any dish from good to extraordinary.',
      image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&h=500&fit=crop',
      author: 'Chef Marco Rossi',
      date: 'May 30, 2024',
      readTime: '6 min read',
      likes: 198,
      comments: 34,
      icon: FaMagic,
      color: 'from-purple-500 to-purple-600'
    },
    // Seasonal Specials
    {
      id: 7,
      title: 'Summer Fruit Delights',
      category: 'Seasonal Specials',
      excerpt: 'Celebrate summer with these refreshing fruit-based dishes and desserts.',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=500&fit=crop',
      author: 'Chef Maria Rodriguez',
      date: 'May 28, 2024',
      readTime: '5 min read',
      likes: 234,
      comments: 45,
      icon: FaCalendarAlt,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 8,
      title: 'Fall Flavors Preview',
      category: 'Seasonal Specials',
      excerpt: 'Get a sneak peek at our upcoming fall menu featuring warm, comforting flavors.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=500&fit=crop',
      author: 'Chef David Chen',
      date: 'May 25, 2024',
      readTime: '4 min read',
      likes: 167,
      comments: 28,
      icon: FaCalendarAlt,
      color: 'from-yellow-500 to-orange-500'
    },
    // Customer Stories
    {
      id: 9,
      title: 'A Love Story Over Pizza',
      category: 'Customer Stories',
      excerpt: 'How a simple pizza order brought two people together in the most unexpected way.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=500&fit=crop',
      author: 'Customer Relations Team',
      date: 'May 22, 2024',
      readTime: '6 min read',
      likes: 456,
      comments: 89,
      icon: FaUsers,
      color: 'from-pink-500 to-pink-600',
      featured: true
    },
    {
      id: 10,
      title: 'Our Regular Customer Spotlight',
      category: 'Customer Stories',
      excerpt: 'Meet our loyal customers and learn why they keep coming back for more.',
      image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=500&fit=crop',
      author: 'Customer Relations Team',
      date: 'May 20, 2024',
      readTime: '5 min read',
      likes: 345,
      comments: 67,
      icon: FaUsers,
      color: 'from-pink-500 to-pink-600'
    },
    // Food Trends
    {
      id: 11,
      title: 'Trending: Fusion Cuisine',
      category: 'Food Trends',
      excerpt: 'Explore the exciting world of fusion cuisine where culinary traditions blend beautifully.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop',
      author: 'Food Critic James Wilson',
      date: 'May 18, 2024',
      readTime: '7 min read',
      likes: 223,
      comments: 41,
      icon: FaChartLine,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 12,
      title: 'Sustainability in Food',
      category: 'Food Trends',
      excerpt: 'How restaurants are embracing sustainability and what it means for the future of food.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
      author: 'Food Critic James Wilson',
      date: 'May 15, 2024',
      readTime: '8 min read',
      likes: 289,
      comments: 54,
      icon: FaChartLine,
      color: 'from-blue-500 to-blue-600'
    },
    // Events & Announcements
    {
      id: 13,
      title: 'Our 10th Anniversary Celebration',
      category: 'Events & Announcements',
      excerpt: 'Join us as we celebrate a decade of serving delicious food to our community.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=500&fit=crop',
      author: 'Events Team',
      date: 'May 12, 2024',
      readTime: '4 min read',
      likes: 567,
      comments: 78,
      icon: FaBullhorn,
      color: 'from-red-600 to-red-700',
      featured: true
    },
    {
      id: 14,
      title: 'Charity Dinner Night',
      category: 'Events & Announcements',
      excerpt: 'Join us for a special charity dinner event to support local communities.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=500&fit=crop',
      author: 'Events Team',
      date: 'May 10, 2024',
      readTime: '3 min read',
      likes: 234,
      comments: 45,
      icon: FaBullhorn,
      color: 'from-red-600 to-red-700'
    },
    {
      id: 15,
      title: 'New Chef Introduction',
      category: 'Events & Announcements',
      excerpt: 'Meet our newest team member and learn about their culinary journey.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=500&fit=crop',
      author: 'HR Team',
      date: 'May 8, 2024',
      readTime: '4 min read',
      likes: 178,
      comments: 23,
      icon: FaBullhorn,
      color: 'from-red-600 to-red-700'
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const toggleBookmark = (id) => {
    setBookmarkedPosts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleLike = (id) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Our <span className="text-yellow-300">Blog</span> & Stories
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Discover the latest news, tips, and stories from our culinary world
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-white shadow-md sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-red-500 outline-none transition-colors duration-300 text-sm"
              />
            </div>
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
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'All' && searchTerm === '' && (
        <section className="py-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              {/* <FaStar className="text-yellow-400" /> */}
              <h2 className="text-xl font-bold text-gray-800">Featured Stories</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <div key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      {/* <FaStar className="text-yellow-300" /> */}
                      Featured
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent`}>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${post.color} text-white`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaUser className="text-gray-400" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-gray-400" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-red-600 font-semibold text-sm hover:gap-2 transition-all duration-300 flex items-center gap-1">
                        Read More
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{filteredPosts.length}</span> posts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <div
                  key={post.id}
                  className="blog-post group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${post.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5`}>
                      <Icon className="text-white/80 text-xs" />
                      {post.category}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`p-1.5 rounded-full transition-all duration-300 ${
                          likedPosts.includes(post.id) 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <FaHeart className={`text-xs ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-1.5 rounded-full transition-all duration-300 ${
                          bookmarkedPosts.includes(post.id) 
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' 
                            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                        }`}
                      >
                        <FaBookmark className={`text-xs ${bookmarkedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-gray-400" />
                        {post.author.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-gray-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Interaction Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaHeart className="text-red-400" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-400" />
                          {post.comments}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-red-600 font-semibold text-sm hover:gap-2 transition-all duration-300 flex items-center gap-1"
                      >
                        Read More
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${post.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}></div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No blog posts found.</p>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Explore by <span className="text-red-600">Category</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Find articles that interest you from our diverse categories
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(c => c !== 'All').map((category) => {
              const post = blogPosts.find(p => p.category === category);
              const Icon = post?.icon || FaTag;
              const count = blogPosts.filter(p => p.category === category).length;
              const color = post?.color || 'from-gray-500 to-gray-600';
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center hover:-translate-y-1 border-2 border-gray-100 hover:border-red-200"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${color} bg-opacity-10 flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`text-lg bg-gradient-to-r ${color} bg-clip-text text-transparent`} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                    {category}
                  </h4>
                  <p className="text-xs text-gray-500">{count} posts</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Subscribe to Our <span className="text-yellow-300">Blog</span>
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Get the latest posts and updates delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-yellow-400 outline-none transition-all duration-300 w-full sm:w-80"
            />
            <button className="bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;