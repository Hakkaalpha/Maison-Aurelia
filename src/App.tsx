import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackingPage } from './pages/TrackingPage';

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated route transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:categoryName" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track" element={<TrackingPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FAFAFA] text-[#0B0C10] flex flex-col font-sans selection:bg-[#B89653] selection:text-white">
          {/* Sticky Navbar with Announcement Bar */}
          <Navbar />

          {/* Slide-over Global Cart Drawer */}
          <CartDrawer />

          {/* Main Routed Content Area */}
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Trust Badges Strip & Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
