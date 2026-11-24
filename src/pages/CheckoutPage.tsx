import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  Sheet,
  Copy,
  Check,
  Home,
  Briefcase,
  Lock,
  Navigation
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

  // Mode: standard 2-column checkout vs direct Google Form iframe backup
  const [activeTab, setActiveTab] = useState<'standard' | 'iframe'>('standard');

  // Address fields matching reference
  const [addressType, setAddressType] = useState<'Residence' | 'Private Office'>('Residence');
  const [fullName, setFullName] = useState('Devraj S. Rathore');
  const [mobile, setMobile] = useState('+91 98290 73910');
  const [email, setEmail] = useState('devraj.rathore@heritage-office.com');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');
  const [locality, setLocality] = useState('Civil Lines Enclave');
  const [fullAddress, setFullAddress] = useState('The Rathore Villa, 12 Jacob Road, Civil Lines');

  // Schedule White-Glove Handover Toggle
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('2026-11-26');
  const [deliveryTime, setDeliveryTime] = useState('11:00 AM - 01:00 PM');
  const [orderNote, setOrderNote] = useState('Security gate authorized for Mercedes-Maybach GLS • RJ-14-AU-0001');

  // Coupon Input State
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Financial Breakdown
  const deliveryFee = 0; // Complimentary white-glove armored handover
  const totalSavings = couponDiscount;
  const payableAmount = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your private bag is empty. Please select a creation before confirming allocation.');
      navigate('/shop');
      return;
    }

    if (!fullName || !mobile || !email || !pincode || !fullAddress) {
      alert('Please fill in all mandatory handover destination fields.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `AU-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsSummary = cart
      .map(
        (item) =>
          `${item.product.name} [${item.product.edition}] (x${item.quantity}${item.selectedColor ? `, ${item.selectedColor}` : ''}) - ₹${
            item.product.price * item.quantity
          }`
      )
      .join(' | ');

    const fullShippingAddress = `[${addressType}] ${fullAddress}, ${locality}, ${city}, ${state} - ${pincode} (Tel: ${mobile})`;

    // Prepare Google Forms submission payload
    const formData = new FormData();
    formData.append(ENTRY_IDS.name, fullName);
    formData.append(ENTRY_IDS.email, email);
    formData.append(ENTRY_IDS.phone, mobile);
    formData.append(ENTRY_IDS.address, fullShippingAddress);
    formData.append(ENTRY_IDS.itemsSummary, itemsSummary);
    formData.append(ENTRY_IDS.totalAmount, `₹${payableAmount.toLocaleString('en-IN')}`);
    formData.append(
      ENTRY_IDS.note,
      `Allocation Order #${generatedOrderId}. Concierge: ${orderNote || 'Standard Protocol'}. Schedule: ${
        scheduleDelivery ? `${deliveryDate} at ${deliveryTime}` : 'Immediate White-Glove Armored Dispatch'
      }`
    );

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (err) {
      console.warn('Google Form submission ping completed:', err);
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
      deliveryFee: 0,
      total: payableAmount,
      savings: totalSavings,
      couponCode: couponCode || undefined,
      otpCode: '7391',
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

    // CRITICAL REQUIREMENT: Immediately redirect to /track so the user sees their live delivery map right away!
    navigate('/track');
  };

  const copyIframe = () => {
    navigator.clipboard.writeText(
      `<iframe src="${GOOGLE_FORM_CONFIG.IFRAME_URL}" width="100%" height="820" frameborder="0">Loading…</iframe>`
    );
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-10 font-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusivity Golden Top Notice */}
        <div className="mb-6 rounded-lg bg-aurelia-obsidian border border-aurelia-gold/40 px-4 py-2 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-aurelia-gold" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-aurelia-gold">
              STRICTLY SOLD ONLY ON AURELIAPRIVE.COM • NEVER AVAILABLE ON ANY OTHER APP
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 text-[10px] uppercase tracking-widest font-mono">
            Vault Armored Handover Protocol
          </span>
        </div>

        {/* Top Header & Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-aurelia-obsidian tracking-tight">
              White-Glove Handover Desk
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Direct vault allocation with armored vehicle GPS tracking upon order confirmation
            </p>
          </div>

          <div className="inline-flex p-1 bg-stone-200/80 rounded-lg">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === 'standard'
                  ? 'bg-white text-aurelia-obsidian shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              2-Column Handover Form
            </button>
            <button
              onClick={() => setActiveTab('iframe')}
              className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === 'iframe'
                  ? 'bg-white text-aurelia-obsidian shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Direct Google Form Iframe
            </button>
          </div>
        </div>

        {/* Tab 2: Direct Google Form Backup */}
        {activeTab === 'iframe' ? (
          <div className="bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-aurelia-borderSubtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-aurelia-goldLight border border-aurelia-goldBorder flex items-center justify-center text-aurelia-goldDark">
                  <Sheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-aurelia-obsidian">
                    Direct Embedded Google Form
                  </h3>
                  <p className="text-xs text-stone-400">
                    Backup direct entry slot for Google Sheets & automated courier dispatch.
                  </p>
                </div>
              </div>
              <button
                onClick={copyIframe}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700 transition-colors"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy Iframe Code'}</span>
              </button>
            </div>

            {/* Placeholder Container */}
            <div className="min-h-[750px] w-full border-2 border-dashed border-aurelia-border rounded-xl flex flex-col items-center justify-center p-8 text-center bg-aurelia-alabaster">
              <Sheet className="w-12 h-12 text-aurelia-gold mb-3" />
              <span className="text-xs font-mono font-bold bg-aurelia-goldLight text-aurelia-goldDark px-3 py-1 rounded-full mb-2">
                &lt;!-- PASTE GOOGLE FORM IFRAME HERE --&gt;
              </span>
              <h4 className="font-serif font-bold text-xl text-aurelia-obsidian mb-1">
                Google Form Embed Container
              </h4>
              <p className="text-xs text-stone-500 max-w-md mb-6 leading-relaxed">
                Paste your Google Form embed URL here or use our seamless 2-column white-glove checkout.
              </p>
              <button
                onClick={() => setActiveTab('standard')}
                className="px-6 py-2.5 rounded bg-aurelia-obsidian text-aurelia-gold font-bold text-xs uppercase tracking-widest shadow-sm"
              >
                Switch to 2-Column Handover Form
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* Tab 1: Exact 2-Column Layout matching Reference 2 */
          /* ========================================================================= */
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Address & White-Glove Handover Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-8 space-y-6">
              
              {/* Address Type Toggle Pills */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                  Handover Location Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAddressType('Residence')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      addressType === 'Residence'
                        ? 'bg-aurelia-obsidian text-aurelia-gold border-aurelia-obsidian shadow-sm'
                        : 'bg-white text-stone-700 border-aurelia-border hover:border-stone-400'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Private Residence</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddressType('Private Office')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      addressType === 'Private Office'
                        ? 'bg-aurelia-obsidian text-aurelia-gold border-aurelia-obsidian shadow-sm'
                        : 'bg-white text-stone-700 border-aurelia-border hover:border-stone-400'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Private Office / Suite</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Patron Full Name <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Private Mobile (for OTP Handover) <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Private Office Email (for Certificate & Receipt) <span className="text-amber-700">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@private-domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                />
              </div>

              {/* City, State, Pin code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    City <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    State <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajasthan"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Pin code <span className="text-amber-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Locality / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Civil Lines / C-Scheme Enclave"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                />
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Detailed Street Address <span className="text-amber-700">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Villa / Bungalow Name, Street Gate, Estate Road"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Schedule Handover Toggle */}
              <div className="pt-2 border-t border-aurelia-borderSubtle">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-aurelia-goldLight flex items-center justify-center text-aurelia-goldDark">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-aurelia-obsidian">
                        Schedule White-Glove Handover
                      </span>
                      <span className="block text-[11px] text-stone-400">
                        Designate specific Maybach armored delivery window
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScheduleDelivery(!scheduleDelivery)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      scheduleDelivery ? 'bg-aurelia-gold' : 'bg-stone-300'
                    }`}
                  >
                    <motion.div
                      layout
                      className="bg-white w-4 h-4 rounded-full shadow-md"
                      animate={{ x: scheduleDelivery ? 24 : 0 }}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {scheduleDelivery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-aurelia-borderSubtle grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">
                          Delivery Date
                        </label>
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">
                          Time Window
                        </label>
                        <select
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold"
                        >
                          <option>10:00 AM - 01:00 PM (Morning Armored)</option>
                          <option>02:00 PM - 05:00 PM (Afternoon Armored)</option>
                          <option>06:00 PM - 09:00 PM (Evening Private)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Concierge Note */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Concierge Instructions (Security gate authorization, initials engraving)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gate security notified for Mercedes-Maybach GLS • RJ-14-AU-0001"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-medium text-aurelia-obsidian focus:outline-none focus:border-aurelia-gold focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Right Column: Live Bag & Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-aurelia-border shadow-luxury p-6 sm:p-8 space-y-6">
              
              {/* Bag Header */}
              <div className="flex items-center justify-between pb-4 border-b border-aurelia-borderSubtle">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-aurelia-gold" />
                  <h3 className="font-serif font-bold text-base text-aurelia-obsidian">
                    Items in Private Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
                  </h3>
                </div>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-aurelia-gold hover:text-aurelia-goldDark flex items-center gap-1 uppercase tracking-wider"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Creation</span>
                </Link>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-aurelia-borderSubtle">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    Your bag is empty. <Link to="/shop" className="text-aurelia-gold font-bold underline">Explore vault</Link>
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
                        className="w-14 h-14 rounded-lg object-cover bg-aurelia-alabaster border border-aurelia-border flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-aurelia-obsidian truncate font-serif">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-stone-400">
                          <span className="text-aurelia-gold font-bold">{item.product.edition}</span>
                          <span>•</span>
                          <span className="font-bold text-stone-700">₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-aurelia-border rounded bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-aurelia-obsidian">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-stone-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-stone-300 hover:text-rose-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-aurelia-borderSubtle">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Privilege Code (try AURELIA10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-aurelia-alabaster border border-aurelia-border text-xs font-semibold uppercase focus:outline-none focus:border-aurelia-gold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-aurelia-obsidian hover:bg-black text-aurelia-gold text-xs font-bold transition-colors"
                  >
                    Verify
                  </button>
                </div>

                {couponFeedback && (
                  <p
                    className={`text-[11px] font-bold mt-1.5 ${
                      couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {couponCode && (
                  <div className="mt-2 flex items-center justify-between text-xs bg-aurelia-goldLight text-aurelia-goldDark px-3 py-1.5 rounded border border-aurelia-goldBorder">
                    <span className="font-bold">Privilege verified: {couponCode} (-10%)</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-amber-800 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Order Details Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-aurelia-borderSubtle text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Bag Total</span>
                  <span className="font-serif font-bold text-aurelia-obsidian text-sm">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Member Privilege Credit</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 items-center">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-aurelia-gold" />
                    <span>Insured Armored Transit</span>
                  </span>
                  <span className="font-bold text-aurelia-goldDark uppercase text-[11px]">
                    Complimentary
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-aurelia-goldLight border border-aurelia-goldBorder rounded-lg p-2.5 text-center text-xs text-aurelia-goldDark font-bold">
                    Privilege Credit Applied: ₹{totalSavings.toLocaleString('en-IN')}
                  </div>
                )}

                {/* Amount Payable */}
                <div className="pt-3 border-t border-aurelia-borderSubtle flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-aurelia-obsidian">
                    Total Allocation Amount
                  </span>
                  <span className="font-serif font-bold text-2xl text-aurelia-obsidian">
                    ₹{payableAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Pitch-Black Full-Width Action Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-lg bg-aurelia-obsidian hover:bg-black text-white font-serif font-bold text-base tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Dispatching to Armored Fleet...</span>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 text-aurelia-gold animate-pulse" />
                    <span>Confirm & Track Live • ₹{payableAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-center text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-aurelia-gold" />
                <span>Redirects immediately to Live GPS Blinkit-Style Tracking Map</span>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
