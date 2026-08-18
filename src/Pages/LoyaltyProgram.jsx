// pages/LoyaltyProgram.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStar, 
  FaGift, 
  FaArrowRight,
  FaCheckCircle,
  FaUser,
  FaTrophy,
  FaMedal,
  FaCrown,
  FaGem,
  FaCoins,
  FaFire,
  FaChartLine,
  FaHeart,
  FaTruck,
  FaClock,
  FaShieldAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPercent,
  FaUtensils,
  FaCalendarAlt
} from 'react-icons/fa';

const LoyaltyProgram = () => {
  const [selectedTier, setSelectedTier] = useState('Silver');
  const [points, setPoints] = useState(450);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agree: false
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    const animatedElements = document.querySelectorAll('.loyalty-item');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const tiers = [
    {
      id: 1,
      name: 'Silver',
      icon: FaStar,
      points: '0 - 499',
      color: 'from-gray-400 to-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-600',
      benefits: [
        'Earn 1 point per $1 spent',
        'Birthday gift voucher',
        'Exclusive member offers'
      ],
      delay: 'animation-delay-100'
    },
    {
      id: 2,
      name: 'Gold',
      icon: FaTrophy,
      points: '500 - 999',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600',
      benefits: [
        'Earn 1.5 points per $1 spent',
        'Birthday gift voucher',
        'Free delivery on orders $20+',
        'Priority support'
      ],
      delay: 'animation-delay-200',
      popular: true
    },
    {
      id: 3,
      name: 'Platinum',
      icon: FaMedal,
      points: '1000 - 1999',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      benefits: [
        'Earn 2 points per $1 spent',
        'Birthday gift voucher',
        'Free delivery on all orders',
        'Priority support',
        'Exclusive event access'
      ],
      delay: 'animation-delay-300'
    },
    {
      id: 4,
      name: 'Diamond',
      icon: FaCrown,
      points: '2000+',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      benefits: [
        'Earn 3 points per $1 spent',
        'Birthday gift voucher',
        'Free delivery on all orders',
        'VIP priority support',
        'Exclusive event access',
        'Free birthday meal',
        'Personal account manager'
      ],
      delay: 'animation-delay-400'
    }
  ];

  const rewards = [
    {
      id: 1,
      name: 'Free Burger',
      points: 100,
      icon: FaUtensils,
      description: 'Free classic burger',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      name: 'Free Drink',
      points: 50,
      icon: FaGift,
      description: 'Free drink with any meal',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      name: 'Free Delivery',
      points: 75,
      icon: FaTruck,
      description: 'Free delivery on your next order',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      name: '20% Off Voucher',
      points: 200,
      icon: FaPercent,
      description: '20% off your next order',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 5,
      name: 'Free Meal',
      points: 300,
      icon: FaHeart,
      description: 'Free meal of your choice',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 6,
      name: 'Birthday Gift',
      points: 150,
      icon: FaGift,
      description: 'Special birthday surprise',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const features = [
    {
      id: 1,
      icon: FaCoins,
      title: 'Earn Points',
      description: 'Earn points on every purchase',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 2,
      icon: FaGift,
      title: 'Redeem Rewards',
      description: 'Exchange points for exclusive rewards',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 3,
      icon: FaChartLine,
      title: 'Tier Upgrades',
      description: 'Unlock better benefits as you earn more',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      icon: FaFire,
      title: 'Special Perks',
      description: 'Exclusive offers and birthday gifts',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Members', color: 'text-blue-600' },
    { number: '1M+', label: 'Points Earned', color: 'text-green-600' },
    { number: '10K+', label: 'Rewards Redeemed', color: 'text-red-600' },
    { number: '4.9★', label: 'Member Satisfaction', color: 'text-yellow-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Welcome to our Loyalty Program! You\'ve earned 50 bonus points for signing up.'
      });
      setFormData({ name: '', email: '', phone: '', agree: false });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus({ submitted: false, error: false, message: '' });
      }, 5000);
    }, 1500);
  };

  const progressPercentage = Math.min((points / 500) * 100, 100);

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
              <FaStar className="text-yellow-400" />
              Loyalty Program
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">
              Earn <span className="text-yellow-300">Rewards</span> Every Time You Order
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
              Join our loyalty program and get rewarded for your love of great food
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points Dashboard */}
      <section className="py-6 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-red-200 text-sm">Your Points Balance</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-white">{points}</span>
                  <span className="text-red-200 text-sm">points</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-white text-sm">Silver Member</span>
                </div>
              </div>
              <div className="flex-1 w-full sm:max-w-md">
                <div className="flex justify-between text-white text-xs mb-1">
                  <span>Silver</span>
                  <span>500 points to Gold</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-white text-[10px] mt-1">
                  <span>0</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Tiers */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold mb-2">
              Membership Tiers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Loyalty <span className="text-yellow-600">Tiers</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Unlock better rewards as you move up the tiers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`loyalty-item group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${tier.borderColor} hover:border-${tier.textColor} hover:-translate-y-2 relative`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`w-14 h-14 rounded-full ${tier.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-2xl ${tier.textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {tier.points} points
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-1.5">
                          <FaCheckCircle className="text-green-500 text-xs" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full bg-gradient-to-r ${tier.color} text-white py-2.5 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg`}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold mb-2">
              Available Rewards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Redeem Your <span className="text-green-600">Rewards</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Exchange your points for exclusive rewards and perks
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {rewards.map((reward) => {
              const Icon = reward.icon;
              return (
                <div
                  key={reward.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center border-2 border-gray-100 hover:border-red-200 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-full ${reward.bgColor} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-xl bg-gradient-to-r ${reward.color} bg-clip-text text-transparent`} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800">{reward.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{reward.description}</p>
                  <div className="mt-2 text-xs font-bold text-red-600">{reward.points} pts</div>
                  <button className="mt-2 w-full bg-red-600 text-white text-[10px] py-1.5 rounded-full hover:bg-red-700 transition-colors duration-300">
                    Redeem
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-2">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Program <span className="text-blue-600">Benefits</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="text-center group">
                  <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`text-xl ${feature.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold mb-2">
              Join Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Start Earning <span className="text-red-600">Rewards</span> Today
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Sign up for our loyalty program and get 50 bonus points instantly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 outline-none transition-colors duration-300 text-sm"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label className="text-sm text-gray-600">
                I agree to receive updates and promotions
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              } shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing Up...
                </>
              ) : (
                <>
                  Join Loyalty Program
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>

            {formStatus.submitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2 animate-fadeInUp">
                <FaCheckCircle className="text-green-500" />
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-semibold mb-2">
              Member Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              What Our <span className="text-yellow-600">Members</span> Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "I've earned so many free meals through this program! The rewards are amazing and the tiers are achievable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Gold Member</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                "The free delivery and priority support are game-changers. I love being a Platinum member!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Michael Chen</p>
                  <p className="text-xs text-gray-500">Platinum Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
            Start Earning <span className="text-yellow-300">Rewards</span> Now
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-6 animate-fadeInUp animation-delay-200">
            Join thousands of happy members and get rewarded for every order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <a
              href="#join"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-red-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join Now
              <FaArrowRight className="text-sm" />
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoyaltyProgram;