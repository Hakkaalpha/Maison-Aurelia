import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sheet,
  Copy,
  Check,
  Home,
  Briefcase
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GOOGLE_FORM_ACTION_URL, ENTRY_IDS, GOOGLE_FORM_CONFIG } from '../config/googleForm';
import { FALLBACK_IMAGE } from '../data/products';
import { OrderSummaryData } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    clearCart,
    setLastOrder
  } = useCart();

  const navigate = useNavigate();

  // Mode: standard 2-column checkout vs direct Google Form iframe
  const [activeTab, setActiveTab] = useState<'standard' | 'iframe'>('standard');

  // Form State matching Reference 2
  const [addressType, setAddressType] = useState<'Home' | 'Work'>('Home');
  const [fullName, setFullName] = useState('Arjun Mehta');
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('arjun.mehta@example.com');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560001');
  const [locality, setLocality] = useState('Indiranagar 100ft Road');
  const [fullAddress, setFullAddress] = useState('Flat 402, Oakwood Residency, 12th Main Road');

  // Schedule Delivery Toggle
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('2026-11-26');
  const [deliveryTime, setDeliveryTime] = useState('10:00 AM - 01:00 PM');
  const [orderNote, setOrderNote] = useState('');

  // Coupon Input State
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  // Submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Financial Breakdown calculations
  const convenienceFee = 29;
  const deliveryFee = subtotal >= 999 ? 0 : 49;
  const totalSavings = (couponDiscount > 0 ? couponDiscount : 0) + (subtotal >= 999 ? 49 : 0);
  const payableAmount = Math.max(0, subtotal - couponDiscount + convenienceFee + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      navigate('/shop');
      return;
    }

    if (!fullName || !mobile || !email || !pincode || !fullAddress) {
      alert('Please fill in all mandatory delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `KT-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsSummary = cart
      .map(
        (item) =>
          `${item.product.name} (x${item.quantity}${item.selectedColor ? `, ${item.selectedColor}` : ''}) - ₹${
            item.product.price * item.quantity
          }`
      )
      .join(' | ');

    const fullShippingAddress = `[${addressType}] ${fullAddress}, ${locality}, ${city}, ${state} - ${pincode} (Phone: ${mobile})`;

    // Prepare Google Forms submission data
    const formData = new FormData();
    formData.append(ENTRY_IDS.name, fullName);
    formData.append(ENTRY_IDS.email, email);
    formData.append(ENTRY_IDS.phone, mobile);
    formData.append(ENTRY_IDS.address, fullShippingAddress);
    formData.append(ENTRY_IDS.itemsSummary, itemsSummary);
    formData.append(ENTRY_IDS.totalAmount, `₹${payableAmount.toLocaleString('en-IN')}`);
    formData.append(
      ENTRY_IDS.note,
      `Order #${generatedOrderId}. Note: ${orderNote || 'None'}. Delivery: ${
        scheduleDelivery ? `${deliveryDate} at ${deliveryTime}` : 'Standard Express'
      }`
    );

    try {
      // Fire-and-forget directly to Google Forms endpoint
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (err) {
      console.warn('Google Form submission network ping completed:', err);
    }

    // Record order summary
    const orderData: OrderSummaryData = {
      orderId: generatedOrderId,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      items: [...cart],
      subtotal,
      discount: couponDiscount,
      deliveryFee,
      convenienceFee,
      total: payableAmount,
      savings: totalSavings,
      couponCode: couponCode || undefined,
      address: {
        type: addressType,
        fullName,
        mobile,
        email,
        city,
        state,
        pincode,
        locality,
        fullAddress,
        scheduleDelivery,
        deliveryDate: scheduleDelivery ? deliveryDate : undefined,
        deliveryTime: scheduleDelivery ? deliveryTime : undefined,
        orderNote: orderNote || undefined
      }
    };

    setLastOrder(orderData);
    clearCart();
    setIsSubmitting(false);

    // Navigate to Order Success Page
    navigate('/order-success');
  };

  const copyIframe = () => {
    navigator.clipboard.writeText(
      `<iframe src="${GOOGLE_FORM_CONFIG.IFRAME_URL}" width="100%" height="820" frameborder="0">Loading…</iframe>`
    );
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="w-full bg-[#F8F9FE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Backup Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Express Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live Google Sheets sync with automated instant Gmail dispatch
            </p>
          </div>

          {/* Backup Mode Toggle */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'standard'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2-Column Standard Checkout
            </button>
            <button
              onClick={() => setActiveTab('iframe')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'iframe'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prefer Google Form directly?
            </button>
          </div>
        </div>

        {/* Tab 2: Direct Google Form Iframe Backup */}
        {activeTab === 'iframe' ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Sheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Direct Embedded Google Form
                  </h3>
                  <p className="text-xs text-slate-400">
                    Use this view if you prefer completing the raw Google Form directly.
                  </p>
                </div>
              </div>
              <button
                onClick={copyIframe}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy Iframe Code'}</span>
              </button>
            </div>

            {/* Placeholder Container */}
            {/* ========================================================================= */}
            {/* TODO: PASTE GOOGLE FORM IFRAME HERE */}
            {/* ========================================================================= */}
            <div className="min-h-[750px] w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-[#F8F9FE]">
              <Sheet className="w-12 h-12 text-indigo-400 mb-3" />
              <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full mb-2">
                &lt;!-- PASTE GOOGLE FORM IFRAME HERE --&gt;
              </span>
              <h4 className="font-display font-bold text-lg text-slate-800 mb-1">
                Google Form Embed Container
              </h4>
              <p className="text-xs text-slate-500 max-w-md mb-6 leading-relaxed">
                To embed your raw form, paste your Google Form iframe inside <code className="bg-white px-1.5 py-0.5 rounded border text-indigo-600 font-bold">src/pages/CheckoutPage.tsx</code> or continue with our seamless native 2-column checkout below!
              </p>
              <button
                onClick={() => setActiveTab('standard')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Switch to Native 2-Column Checkout
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* Tab 1: Exact 2-Column Checkout UI matching Reference 2 */
          /* ========================================================================= */
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Address & Delivery Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6">
              
              {/* Address Type Toggle Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Select Address Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAddressType('Home')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      addressType === 'Home'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-button'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddressType('Work')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      addressType === 'Work'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-button'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Work</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mobile No. <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address (for instant receipt dispatch) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* City & State & Pin code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karnataka"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pin code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Locality / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Metro Station / 100ft Road"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Street Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat / House No., Building Name, Street"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Schedule Delivery Toggle Switch */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900">
                        Schedule Delivery
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        Pick preferred dispatch date and time slot
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScheduleDelivery(!scheduleDelivery)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      scheduleDelivery ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <motion.div
                      layout
                      className="bg-white w-4 h-4 rounded-full shadow-md"
                      animate={{ x: scheduleDelivery ? 24 : 0 }}
                    />
                  </button>
                </div>

                {/* Animated Date & Time Pickers */}
                <AnimatePresence>
                  {scheduleDelivery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Delivery Date
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                        >
                          <option>10:00 AM - 01:00 PM</option>
                          <option>02:00 PM - 05:00 PM</option>
                          <option>06:00 PM - 09:00 PM</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Order Note (Optional instructions)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave package with security guard"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Right Column: Live Cart & Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6">
              
              {/* Cart Items Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Items in the cart ({cart.reduce((t, i) => t + i.quantity, 0)})
                  </h3>
                </div>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </Link>
              </div>

              {/* Cart Items Scroll List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Your cart is empty. <Link to="/shop" className="text-indigo-600 font-bold underline">Add items</Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}`} className="pt-3 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          {item.selectedColor && <span>{item.selectedColor}</span>}
                          <span>•</span>
                          <span className="font-bold text-slate-700">₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (try KINETIX10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F8F9FE] border border-slate-200 text-xs font-semibold uppercase placeholder-normal focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponFeedback && (
                  <p
                    className={`text-[11px] font-bold mt-1.5 ${
                      couponFeedback.success ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {couponCode && (
                  <div className="mt-2 flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <span className="font-bold">Code applied: {couponCode} (-10%)</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-emerald-700 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Order Details Pricing Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Bag Total</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Convenience Fee</span>
                  <span className="font-bold text-slate-900">₹{convenienceFee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {/* Savings Banner */}
                {totalSavings > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center text-xs text-emerald-800 font-bold">
                    🎉 Your total savings on this order: ₹{totalSavings.toLocaleString('en-IN')}
                  </div>
                )}

                {/* Amount Payable */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm text-slate-900">
                    Amount Payable
                  </span>
                  <span className="font-display font-extrabold text-2xl text-slate-900">
                    ₹{payableAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Pitch-Black Full-Width Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-2xl bg-black hover:bg-slate-900 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Dispatching to Google Sheets...</span>
                ) : (
                  <>
                    <span>Place Order • ₹{payableAmount.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Instant Gmail Guarantee */}
              <div className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Instant automated invoice & Gmail confirmation on submission</span>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
