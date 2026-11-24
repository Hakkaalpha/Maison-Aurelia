import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-ui">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-aurelia-border"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-aurelia-border flex items-center justify-between bg-aurelia-obsidian text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-stone-900 border border-aurelia-gold/40 flex items-center justify-center text-aurelia-gold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg tracking-wide text-white">Maison Aurelia Private Bag</h3>
                    <p className="text-[10px] uppercase tracking-widest text-aurelia-gold">
                      {cartCount} {cartCount === 1 ? 'Creation' : 'Creations'} Selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Exclusivity Notice Strip */}
              <div className="px-5 py-2.5 bg-[#0B0C0E] border-b border-white/10 flex items-center gap-2 text-[10px] text-[#C6A45E] font-mono font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-[#C6A45E]" />
                <span>STRICTLY SOLD ONLY ON AURELIAPRIVE.COM • NEVER AVAILABLE ON ANY OTHER APP</span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-aurelia-borderSubtle">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-aurelia-alabaster border border-aurelia-border flex items-center justify-center text-aurelia-gold mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif font-bold text-xl text-aurelia-obsidian mb-1">Your Bag is Empty</h4>
                    <p className="text-xs text-stone-400 max-w-xs mb-6 leading-relaxed">
                      Explore our Swiss tourbillon timepieces, Tuscan leather luggage, and aged Assam oud extraits.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="px-6 py-2.5 rounded bg-aurelia-obsidian text-aurelia-gold text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors"
                    >
                      View All Creations
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-20 rounded bg-aurelia-alabaster flex-shrink-0 border border-aurelia-border overflow-hidden p-2"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif font-bold text-sm text-aurelia-obsidian hover:text-aurelia-gold transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                              className="text-stone-300 hover:text-rose-500 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-aurelia-gold font-bold block uppercase tracking-wider mt-0.5">
                            {item.product.edition} • {item.product.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-serif font-bold text-aurelia-obsidian text-base">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center border border-aurelia-border rounded bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-aurelia-obsidian">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                            >
                              <Plus className="w-3 h-3" />
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
                <div className="p-6 border-t border-aurelia-border bg-aurelia-alabaster space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-stone-500">
                      <span>Total Allocation Value</span>
                      <span className="font-serif font-bold text-aurelia-obsidian text-sm">
                        ₹{subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-500 items-center">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-aurelia-gold" />
                        <span>Insured Armored Handover</span>
                      </span>
                      <span className="text-aurelia-goldDark font-bold uppercase tracking-wider text-[11px]">
                        Complimentary
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 rounded bg-aurelia-obsidian hover:bg-black text-white font-ui font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-obsidian-glow transition-all"
                  >
                    <span>Proceed to White-Glove Checkout</span>
                    <ArrowRight className="w-4 h-4 text-aurelia-gold" />
                  </button>

                  <p className="text-center text-[10px] uppercase tracking-widest text-stone-400">
                    Never distributed via retail apps or third-party marketplaces
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
