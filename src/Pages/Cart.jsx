import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaTag,
  FaRupeeSign, // added for Rupee icon
} from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';

// Mock cart data (replace with Redux state later)
const initialCartItems = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 8.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    price: 12.49,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Fried Chicken',
    price: 9.99,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100&fit=crop',
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  // Format price with Rupee symbol
  const formatPrice = (amount) => `₹${amount.toFixed(2)}`;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-20 pb-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-4xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Looks like you haven't added any items yet.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg"
          >
            <GiHamburger className="text-xl" />
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
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
            Your <span className="text-red-600">Cart</span>
          </h1>
          <span className="ml-auto bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            {cartItems.length} items
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex items-center gap-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-semibold text-sm sm:text-base">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-red-100 transition-colors duration-200"
                  >
                    <FaMinus className="text-xs text-gray-600" />
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-red-100 transition-colors duration-200"
                  >
                    <FaPlus className="text-xs text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaTruck className="text-red-500" /> Delivery Fee
                  </span>
                  <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                </div>
                {subtotal > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <FaTag /> Offer Discount
                    </span>
                    <span>₹0.00</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaCreditCard />
                Proceed to Checkout
              </button>

              <Link
                to="/menu"
                className="block text-center text-sm text-gray-500 hover:text-red-600 mt-4 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;