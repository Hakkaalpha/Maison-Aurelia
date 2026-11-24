export type ProductCategory = 
  | 'Audio'
  | 'Keyboards & Mice'
  | 'Gaming'
  | 'Smart Accessories'
  | 'Webcams & Speakers'
  | 'Desk Setup';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  badge?: 'Best Seller' | '20% OFF' | '15% OFF' | '10% OFF' | 'New' | 'Trending' | 'Popular';
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  features: string[];
  specs: ProductSpec[];
  colors: { name: string; hex: string }[];
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderAddress {
  type: 'Home' | 'Work';
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  locality: string;
  fullAddress: string;
  scheduleDelivery: boolean;
  deliveryDate?: string;
  deliveryTime?: string;
  orderNote?: string;
}

export interface OrderSummaryData {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  convenienceFee: number;
  total: number;
  savings: number;
  address: OrderAddress;
  couponCode?: string;
}
