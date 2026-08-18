// pages/AboutUs.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, 
  FaTruck, 
  FaLeaf, 
//   FaUserChef,
  FaStar, 
  FaClock,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHamburger,
//   FaKnifeKitchen
} from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('story');

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

  const stats = [
    { id: 1, icon: FaUsers, number: '10K+', label: 'Happy Customers', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-600', delay: 'animation-delay-100' },
    { id: 2, icon: FaUtensils, number: '50+', label: 'Menu Items', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-600', delay: 'animation-delay-200' },
    // { id: 3, icon: FaUserChef, number: '25+', label: 'Expert Chefs', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', textColor: 'text-orange-600', delay: 'animation-delay-300' },
    { id: 4, icon: FaAward, number: '15+', label: 'Awards Won', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', textColor: 'text-yellow-600', delay: 'animation-delay-400' }
  ];

  const features = [
    {
      id: 1,
      icon: FaLeaf,
      title: 'Fresh Ingredients',
      description: 'We source only the freshest, locally-sourced ingredients for all our dishes.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      hoverBorder: 'hover:border-green-400',
      delay: 'animation-delay-100'
    },
    // {
    //   id: 2,
    //   icon: FaUserChef,
    //   title: 'Expert Chefs',
    //   description: 'Our experienced chefs bring years of culinary expertise to every dish.',
    //   color: 'from-red-500 to-red-600',
    //   bgColor: 'bg-red-50',
    //   borderColor: 'border-red-200',
    //   textColor: 'text-red-600',
    //   hoverBorder: 'hover:border-red-400',
    //   delay: 'animation-delay-200'
    // },
    {
      id: 3,
      icon: FaTruck,
      title: 'Fast Delivery',
      description: 'Hot and fresh food delivered to your doorstep in 30 minutes or less.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      hoverBorder: 'hover:border-blue-400',
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      icon: FaStar,
      title: 'Quality Promise',
      description: 'We stand behind our quality with a 100% satisfaction guarantee.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      hoverBorder: 'hover:border-yellow-400',
      delay: 'animation-delay-400'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Executive Chef',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&h=300&fit=crop&crop=face',
      bio: '25 years of culinary experience, passionate about creating memorable dining experiences.',
      social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'Pastry Chef',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning pastry chef with a love for creating beautiful and delicious desserts.',
      social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Restaurant Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Ensuring exceptional service and memorable dining experiences for all our guests.',
      social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Head Bartender',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face',
      bio: 'Creative mixologist crafting unique and refreshing beverages for every occasion.',
      social: { facebook: '#', twitter: '#', instagram: '#', linkedin: '#' }
    }
  ];

  const whyChooseUs = [
    {
      id: 1,
      title: 'Quality Ingredients',
      description: 'We use only the finest, freshest ingredients in all our dishes.',
      icon: FaLeaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400'
    },
    // {
    //   id: 2,
    //   title: 'Expert Chefs',
    //   description: 'Our team of skilled chefs creates culinary masterpieces every day.',
    //   icon: FaUserChef,
    //   color: 'text-red-600',
    //   bgColor: 'bg-red-50',
    //   borderColor: 'border-red-200',
    //   hoverBorder: 'hover:border-red-400'
    // },
    {
      id: 3,
      title: 'Fast Delivery',
      description: 'Enjoy your favorite meals delivered hot and fresh to your door.',
      icon: FaTruck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400'
    },
    {
      id: 4,
      title: 'Great Value',
      description: 'Premium quality food at prices that won\'t break the bank.',
      icon: FaStar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400'
    },
    {
      id: 5,
      title: 'Family Friendly',
      description: 'A welcoming atmosphere for families and friends to enjoy together.',
      icon: FaUsers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400'
    },
    {
      id: 6,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go above and beyond.',
      icon: FaAward,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBorder: 'hover:border-orange-400'
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-500 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 animate-fadeInUp border border-white/20">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Welcome to <span className="text-yellow-300">FastFood</span>
            </h1>
            <p className="text-red-100 text-base sm:text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              We're passionate about creating delicious food experiences that bring people together.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-on-scroll opacity-0 animation-delay-100">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-3">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                A Journey of <span className="text-red-600">Flavor</span> and <span className="text-red-600">Passion</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                FastFood was founded in 2015 with a simple mission: to serve delicious, high-quality food 
                that brings joy to every plate. What started as a small family restaurant has grown into 
                a beloved brand known for its commitment to excellence.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Today, we continue to honor that legacy by using only the freshest ingredients, 
                employing skilled chefs, and ensuring every meal is crafted with care and passion.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>Est. 2015</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>10K+ Customers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>50+ Menu Items</span>
                </div>
              </div>
            </div>
            <div className="relative animate-on-scroll opacity-0 animation-delay-300">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"
                  alt="Our Story"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-semibold text-gray-800">Since 2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-6 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-3 animate-fadeInUp">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
              Our <span className="text-red-600">Mission</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
              We're committed to making great food accessible to everyone, every day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center animate-on-scroll opacity-0 ${stat.delay} hover:-translate-y-2 border-2 ${stat.borderColor}`}
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10 flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <Icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-3 animate-fadeInUp">
              What Makes Us Special
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
              Why Choose <span className="text-red-600">Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
              We go above and beyond to ensure every meal is perfect.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border-2 ${feature.borderColor} ${feature.hoverBorder} animate-on-scroll opacity-0 ${feature.delay} hover:-translate-y-2`}
                >
                  <div className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className={`text-2xl ${feature.textColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`mt-4 h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-full transition-all duration-500`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-3 animate-fadeInUp">
              Meet Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
              Our <span className="text-red-600">Expert</span> Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
              Passionate professionals dedicated to creating exceptional dining experiences.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-red-200 animate-on-scroll opacity-0 ${
                  index === 0 ? 'animation-delay-100' :
                  index === 1 ? 'animation-delay-200' :
                  index === 2 ? 'animation-delay-300' :
                  'animation-delay-400'
                } hover:-translate-y-2`}
              >
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-red-200 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                  <div className="flex gap-2">
                    <a href={member.social.facebook} className="p-1.5 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                      <FaFacebook className="text-sm" />
                    </a>
                    <a href={member.social.twitter} className="p-1.5 bg-gray-100 rounded-full hover:bg-sky-500 hover:text-white transition-colors duration-300">
                      <FaTwitter className="text-sm" />
                    </a>
                    <a href={member.social.instagram} className="p-1.5 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-300">
                      <FaInstagram className="text-sm" />
                    </a>
                    <a href={member.social.linkedin} className="p-1.5 bg-gray-100 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300">
                      <FaLinkedin className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-3 animate-fadeInUp">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 animate-fadeInUp animation-delay-200">
              Why Choose Our <span className="text-red-600">Restaurant</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base animate-fadeInUp animation-delay-400">
              Here's why thousands of customers trust us for their dining needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border-2 ${item.borderColor} ${item.hoverBorder} animate-on-scroll opacity-0 ${
                    index === 0 ? 'animation-delay-100' :
                    index === 1 ? 'animation-delay-200' :
                    index === 2 ? 'animation-delay-300' :
                    index === 3 ? 'animation-delay-400' :
                    index === 4 ? 'animation-delay-500' :
                    'animation-delay-600'
                  } hover:-translate-y-2`}
                >
                  <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className={`text-xl ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Ready to Experience <span className="text-yellow-300">Great Food</span>?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Join thousands of satisfied customers and order now!
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;