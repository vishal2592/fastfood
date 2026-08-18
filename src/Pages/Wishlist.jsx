import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaHeart,
  FaTrashAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock wishlist data
const initialWishlist = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Fried Chicken',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Seafood Platter',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'Noodles Bowl',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100&h=100&fit=crop',
  },
];

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id, name) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.error(`🗑️ ${name} removed from wishlist`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const addToCart = (item) => {
    toast.success(`🛒 ${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // In real app, dispatch to Redux cart action
    // Optionally remove from wishlist after adding
    // removeFromWishlist(item.id, item.name);
  };

  const formatPrice = (amount) => `₹${amount.toFixed(2)}`;

  // Empty state
  if (wishlist.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12 px-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-4xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Wishlist is empty</h2>
            <p className="text-gray-500 text-sm mb-6">Start saving your favorite meals!</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg"
            >
              <GiHamburger className="text-xl" />
              Browse Menu
            </Link>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200"
            >
              <FaArrowLeft className="text-xl text-red-600" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My <span className="text-red-600">Wishlist</span>
            </h1>
            <span className="ml-auto bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              {wishlist.length} items
            </span>
          </div>

          {/* Wishlist Items – rows exactly like Cart */}
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex items-center gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-semibold text-sm sm:text-base">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center gap-1"
                  >
                    <FaShoppingCart className="text-xs" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id, item.name)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Wishlist;