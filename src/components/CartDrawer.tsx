import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../data/products';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingThreshold = 999;
  const differenceToFreeShipping = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8F9FE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Your Cart</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="px-5 py-3 bg-indigo-50/60 border-b border-indigo-100/60">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">
                    {differenceToFreeShipping <= 0 ? (
                      <span className="text-emerald-700 font-bold">🎉 You qualify for FREE Express Shipping!</span>
                    ) : (
                      <span>
                        Add <span className="text-indigo-600 font-bold">₹{differenceToFreeShipping.toLocaleString('en-IN')}</span> more for FREE Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-indigo-600 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-400 mb-4">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-900 mb-1">Your cart is empty</h4>
                    <p className="text-sm text-slate-500 max-w-xs mb-6">
                      Explore our precision tactile keyboards, ANC headphones, and minimal desk accessories.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-display font-semibold text-sm text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.selectedColor && (
                            <span className="text-xs text-slate-400 font-medium">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-bold text-slate-900 text-sm">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-[#F8F9FE] space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-600">
                        {subtotal >= freeShippingThreshold ? 'FREE' : '₹49'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-button hover:shadow-lg transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <Link
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Or continue shopping →
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
