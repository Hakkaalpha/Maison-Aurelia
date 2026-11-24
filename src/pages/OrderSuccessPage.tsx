import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  Home,
  Printer,
  ShoppingBag,
  ShieldCheck,
  Lock,
  Navigation,
  KeyRound,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../data/products';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, getActiveTrackingOrder } = useCart();
  const order = lastOrder || getActiveTrackingOrder();

  const orderId = order.orderId || `AU-${Math.floor(1000 + Math.random() * 9000)}`;
  const orderDate = order.orderDate || 'Today';
  const email = order.address?.email || 'collector@aureliaprive.com';
  const fullName = order.address?.fullName || 'Distinguished Member';
  const items = order.items || [];
  const total = order.total || 130500;
  const otpCode = order.otpCode || '7391';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-12 selection:bg-aurelia-gold selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusivity Notice Strip */}
        <div className="bg-[#0B0C10] text-[#D9C39B] rounded-2xl p-3.5 mb-8 border border-aurelia-gold/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
            <Lock className="w-4 h-4 text-aurelia-gold" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              EXCLUSIVE TO AURELIAPRIVE.COM • NEVER SOLD ON ANY OTHER APP OR MARKETPLACE
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono text-stone-400 hidden sm:inline">
            Direct Atelier Allocation
          </span>
        </div>

        {/* Animated Confirmation Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-8 sm:p-10 text-center mb-8 relative overflow-hidden"
        >
          {/* Decorative Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-aurelia-goldLight rounded-full blur-3xl pointer-events-none" />

          {/* Gold Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-aurelia-goldLight text-aurelia-gold border border-aurelia-goldBorder flex items-center justify-center mx-auto mb-6 shadow-soft"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-aurelia-goldLight text-aurelia-goldDark text-xs font-bold border border-aurelia-goldBorder mb-3 uppercase tracking-wider">
            Allocation Confirmed • Direct Atelier Release
          </span>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-aurelia-obsidian tracking-tight mb-2">
            Allocation Reserved, {fullName}
          </h1>

          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Your serialized creation has been locked on the private ledger. Dual-custody inspection is underway prior to armored dispatch.
          </p>

          <div className="inline-flex items-center gap-2 bg-stone-50 border border-aurelia-border px-4 py-2 rounded-xl text-xs font-bold text-aurelia-obsidian mb-6">
            <Mail className="w-4 h-4 text-aurelia-gold" />
            <span>Encrypted Atelier Dispatch Receipt sent to: {email}</span>
          </div>

          {/* Allocation Key Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-aurelia-borderSubtle text-xs">
            <div>
              <span className="text-stone-400 block font-medium">Allocation Reference</span>
              <span className="font-mono font-bold text-aurelia-obsidian text-sm">{orderId}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Ledger Date</span>
              <span className="font-bold text-aurelia-obsidian text-sm">{orderDate}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Acquisition Total</span>
              <span className="font-serif font-bold text-aurelia-obsidian text-sm">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Handover OTP</span>
              <span className="font-mono font-bold text-aurelia-gold text-sm tracking-widest">{otpCode}</span>
            </div>
          </div>
        </motion.div>

        {/* Live GPS Tracking Prompt Card */}
        <div className="bg-[#0B0C10] text-white rounded-3xl border border-aurelia-gold/40 p-6 sm:p-7 mb-8 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-aurelia-gold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE SATELLITE GPS ACTIVE</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Track Your White-Glove Handover
            </h3>
            <p className="text-xs text-stone-300 max-w-md">
              Watch Senior Concierge Devraj Singhania navigate towards your residence in the armored Mercedes-Maybach GLS in real time.
            </p>
          </div>

          <Link
            to="/track"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-aurelia-gold hover:bg-aurelia-goldDark text-aurelia-obsidian font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-button hover:shadow-lg transition-all flex-shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Live GPS Telemetry →</span>
          </Link>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl border border-aurelia-border shadow-luxury p-6 sm:p-8 space-y-6 mb-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-aurelia-borderSubtle">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-aurelia-gold" />
              <h2 className="font-serif font-bold text-base text-aurelia-obsidian">
                Allocated Creations
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-aurelia-obsidian transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-aurelia-gold" />
              <span>Print Atelier Certificate</span>
            </button>
          </div>

          {/* Items List */}
          {items.length > 0 ? (
            <div className="divide-y divide-aurelia-borderSubtle">
              {items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-14 h-14 rounded-xl object-cover bg-stone-50 border border-aurelia-border"
                    />
                    <div>
                      <span className="text-[10px] text-aurelia-gold font-bold uppercase tracking-wider block">
                        {item.product.edition}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-aurelia-obsidian line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-xs text-aurelia-obsidian">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-400">Maison Aurelia Tourbillon Squelette (x1) • ₹1,45,000</p>
          )}

          {/* Shipping & Delivery Schedule Information */}
          <div className="pt-4 border-t border-aurelia-borderSubtle grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-1.5 font-bold text-aurelia-obsidian mb-1">
                <Home className="w-3.5 h-3.5 text-aurelia-gold" />
                <span>Private Handover Destination</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                {order.address?.fullAddress || 'The Rathore Villa, Jacob Road, Civil Lines'}, {order.address?.city || 'Jaipur'}, {order.address?.state || 'Rajasthan'} - {order.address?.pincode || '302001'}
              </p>
              <p className="text-stone-400 text-[10px] mt-1">
                Authorized Recipient: {order.address?.fullName || 'Devraj S. Rathore'} ({order.address?.mobile || '+91 98290 73910'})
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-1.5 font-bold text-aurelia-obsidian mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-aurelia-gold" />
                <span>Handover Verification</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Armored Mercedes-Maybach GLS #01 with biometric lock and temperature-controlled casing.
              </p>
              <div className="flex items-center gap-1 mt-2 text-aurelia-gold font-bold text-[11px]">
                <KeyRound className="w-3 h-3" />
                <span>Verification OTP: {otpCode}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/track"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-aurelia-obsidian hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-luxury transition-all"
          >
            <Navigation className="w-4 h-4 text-aurelia-gold" />
            <span>Track Armored Delivery</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-aurelia-obsidian font-bold text-xs uppercase tracking-wider border border-aurelia-border shadow-soft transition-all text-center flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-aurelia-gold" />
            <span>Explore Private Vault</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;
