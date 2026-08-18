import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaCheckCircle,
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock product data (replace with API call)
const mockProduct = {
  id: 1,
  name: 'Classic Burger',
  price: 8.99,
  description:
    'Juicy beef patty with fresh lettuce, tomatoes, onions, and our secret sauce, served on a toasted sesame bun. A timeless favorite!',
  category: 'Burgers',
  availability: 'In Stock',
  rating: 4.8,
  reviewCount: 324,
  images: [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=top',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=bottom',
  ],
  reviews: [
    { id: 1, user: 'Rajesh K.', rating: 5, comment: 'Best burger ever! Juicy and full of flavor.', date: '2024-12-10' },
    { id: 2, user: 'Priya S.', rating: 4, comment: 'Good but a bit expensive.', date: '2024-12-05' },
    { id: 3, user: 'Amit P.', rating: 5, comment: 'Amazing taste, will order again!', date: '2024-11-28' },
  ],
  similarProducts: [
    { id: 2, name: 'Pepperoni Pizza', price: 12.49, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=150&fit=crop' },
    { id: 3, name: 'Fried Chicken', price: 9.99, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=150&h=150&fit=crop' },
    { id: 4, name: 'Seafood Platter', price: 15.99, image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=150&h=150&fit=crop' },
    { id: 5, name: 'Noodles Bowl', price: 6.99, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150&h=150&fit=crop' },
  ],
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For real API call
  const [product] = useState(mockProduct); // Replace with useEffect + API
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (amount) => `₹${amount.toFixed(2)}`;

  // Quantity handlers
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to cart
  const handleAddToCart = () => {
    toast.success(`🛒 Added ${quantity} x ${product.name} to cart!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? `💔 Removed from wishlist` : `❤️ Added to wishlist`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="text-yellow-400" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    return stars;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 mb-4"
          >
            <FaArrowLeft /> Back
          </button>

          {/* Product Main Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8">
              {/* Left: Image Gallery */}
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === img ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="lg:w-1/2 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-red-500 font-semibold uppercase tracking-wide">{product.category}</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
                  </div>
                  <button
                    onClick={toggleWishlist}
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors duration-200"
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-xl" />
                    )}
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-sm">
                    {renderStars(product.rating)}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
                </div>

                {/* Availability */}
                <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                  <FaCheckCircle /> {product.availability}
                </div>

                {/* Description */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">{product.description}</p>

                {/* Quantity & Add to Cart */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FaMinus className="text-xs text-gray-600" />
                    </button>
                    <span className="px-4 py-2 text-gray-800 font-semibold min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FaPlus className="text-xs text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>

                {/* Extra Info */}
                <div className="mt-6 grid grid-cols-2 gap-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1">
                    <FaTag className="text-red-400" /> Category: {product.category}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-red-400" /> Updated: Today
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                        {review.user.charAt(0)}
                      </span>
                      <span className="font-semibold text-gray-800">{review.user}</span>
                      <span className="flex items-center gap-0.5 text-sm ml-2">
                        {renderStars(review.rating)}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
            )}
          </div>

          {/* Similar Products */}
          {product.similarProducts && product.similarProducts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">You May Also Like</h2>
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {product.similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="min-w-[140px] sm:min-w-[160px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-800 truncate">{item.name}</h3>
                      <p className="text-red-600 font-semibold text-sm">{formatPrice(item.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetail;