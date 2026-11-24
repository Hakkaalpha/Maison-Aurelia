import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderSummaryData, OrderAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, customInitials?: string) => void;
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
  getActiveTrackingOrder: () => OrderSummaryData;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_aurelia_cart_v3';
const WISHLIST_STORAGE_KEY = 'maison_aurelia_wishlist_v3';
const LAST_ORDER_KEY = 'maison_aurelia_last_order_v3';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-seed with flagship Tourbillon timepiece
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const flagship = PRODUCTS[0];
    return [
      {
        product: flagship,
        quantity: 1,
        selectedColor: flagship.colors[0]?.name || 'Titanium Slate & Platinum'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [PRODUCTS[0].id, PRODUCTS[1].id, PRODUCTS[4].id];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const [lastOrder, setLastOrder] = useState<OrderSummaryData | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(lastOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, [lastOrder]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, customInitials?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart((prev) => {
      const existing = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existing > -1) {
        const next = [...prev];
        next[existing] = {
          ...next[existing],
          quantity: next[existing].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color, customInitials }];
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
    if (clean === 'AURELIA10' || clean === 'PRIVE10') {
      const discount = Math.round(subtotal * 0.1);
      setCouponCode('AURELIA10');
      setCouponDiscount(discount);
      return {
        success: true,
        message: `Private Privilege Code AURELIA10 verified. 10% (₹${discount.toLocaleString('en-IN')}) allocation credit applied.`
      };
    }
    return {
      success: false,
      message: 'Exclusive allocation code invalid. Use "AURELIA10" for 10% member privilege.'
    };
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

  // Return active order for the Live GPS tracking page
  const getActiveTrackingOrder = (): OrderSummaryData => {
    if (lastOrder && lastOrder.items && lastOrder.items.length > 0) {
      return lastOrder;
    }

    const defaultProduct = PRODUCTS[0];
    const defaultAddress: OrderAddress = {
      type: 'Residence',
      fullName: 'Devraj S. Rathore',
      mobile: '+91 98290 73910',
      email: 'devraj.rathore@heritage-office.com',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      locality: 'Civil Lines Enclave',
      fullAddress: 'The Rathore Villa, 12 Jacob Road, Civil Lines',
      scheduleDelivery: true,
      deliveryDate: 'Today',
      deliveryTime: 'White-Glove Armored Handover',
      orderNote: 'Security gate authorized for Mercedes-Maybach GLS • RJ-14-AU-0001'
    };

    return {
      orderId: 'AU-8842',
      orderDate: 'Today',
      items: [
        {
          product: defaultProduct,
          quantity: 1,
          selectedColor: 'Titanium Slate & Platinum'
        }
      ],
      subtotal: 145000,
      discount: 14500,
      deliveryFee: 0,
      total: 130500,
      savings: 44500,
      couponCode: 'AURELIA10',
      address: defaultAddress,
      otpCode: '7391'
    };
  };

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
        setLastOrder,
        getActiveTrackingOrder
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
