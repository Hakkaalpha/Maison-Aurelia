import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderSummaryData } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  originalSubtotal: number;
  totalSavings: number;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  lastOrder: OrderSummaryData | null;
  setLastOrder: (order: OrderSummaryData | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kinetix_cart_v1';
const WISHLIST_STORAGE_KEY = 'kinetix_wishlist_v1';
const LAST_ORDER_KEY = 'kinetix_last_order_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage or pre-populate with default product for immediate review
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    }
    // Default starter item: Roco Wireless Headphones
    const defaultProduct = PRODUCTS[0];
    return [
      {
        product: defaultProduct,
        quantity: 1,
        selectedColor: defaultProduct.colors[0]?.name || 'Default'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse wishlist', e);
    }
    return [PRODUCTS[0].id, PRODUCTS[2].id];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const [lastOrder, setLastOrder] = useState<OrderSummaryData | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse last order', e);
    }
    return null;
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist last order
  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(lastOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, [lastOrder]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: color }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (selectedColor && item.selectedColor !== selectedColor) return true;
        return false;
      })
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const originalSubtotal = cart.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );
  const totalSavings = Math.max(0, originalSubtotal - subtotal) + couponDiscount;

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'KINETIX10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponCode('KINETIX10');
      setCouponDiscount(discount);
      return { success: true, message: `Coupon KINETIX10 applied! 10% (₹${discount.toLocaleString('en-IN')}) saved.` };
    }
    return { success: false, message: 'Invalid coupon code. Try KINETIX10 for 10% off.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        originalSubtotal,
        totalSavings,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
