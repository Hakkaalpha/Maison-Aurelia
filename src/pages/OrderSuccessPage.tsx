import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  Truck,
  Package,
  Home,
  Printer,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FALLBACK_IMAGE } from '../data/products';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder } = useCart();

  // If no order data exists, fallback to placeholder details
  const orderId = lastOrder?.orderId || `KT-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = lastOrder?.orderDate || 'Today';
  const email = lastOrder?.address?.email || 'your.email@example.com';
  const fullName = lastOrder?.address?.fullName || 'Valued Customer';
  const items = lastOrder?.items || [];
  const total = lastOrder?.total || 3499;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#F8F9FE] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Confirmation Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 sm:p-10 text-center mb-8 relative overflow-hidden"
        >
          {/* Decorative Background Blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Green Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
            Order Confirmed • Synced to Google Sheets
          </span>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-2">
            Thank You, {fullName}!
          </h1>

          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Your order has been recorded into our fulfillment pipeline. An automated itemized invoice has been dispatched to:
          </p>

          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 mb-6">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Instant Gmail Receipt Sent to: {email}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Order Reference</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{orderId}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Order Date</span>
              <span className="font-bold text-slate-800 text-sm">{orderDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Total Paid</span>
              <span className="font-bold text-indigo-600 text-sm">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </motion.div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6 mb-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              <h2 className="font-display font-bold text-sm text-slate-900">
                Ordered Hardware
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Items List */}
          {items.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-xs text-slate-900">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Roco Wireless ANC Headphones (x1) • ₹3,499</p>
          )}

          {/* Shipping & Delivery Schedule Information */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                <Home className="w-3.5 h-3.5 text-indigo-600" />
                <span>Shipping Destination</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {lastOrder?.address?.fullAddress || 'Indiranagar 100ft Road'}, {lastOrder?.address?.city || 'Bengaluru'}, {lastOrder?.address?.state || 'Karnataka'} - {lastOrder?.address?.pincode || '560001'}
              </p>
              <p className="text-slate-400 text-[10px] mt-1">
                Contact: {lastOrder?.address?.mobile || '9876543210'}
              </p>
            </div>

            <div className="bg-[#F8F9FE] p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Dispatch Mode</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {lastOrder?.address?.scheduleDelivery
                  ? `Scheduled on ${lastOrder.address.deliveryDate} (${lastOrder.address.deliveryTime})`
                  : 'Kinetix Express 2-Day Priority Delivery'}
              </p>
              <p className="text-emerald-600 text-[10px] font-bold mt-1">
                Tracking code will be mailed once package is handed to courier.
              </p>
            </div>
          </div>

        </div>

        {/* Action Button Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-button hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-soft transition-all text-center"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};
