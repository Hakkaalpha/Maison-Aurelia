export type MaisonCategory =
  | 'Horology'
  | 'Bespoke Leather'
  | 'Haute Parfumerie'
  | 'Eyewear & Pens'
  | 'Collector Objects'
  | 'Atelier Audio';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: MaisonCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  badge?: 'Collector First Edition' | 'Private Reserve' | 'Vault Selection' | 'Limited Atelier' | 'Numbered Run';
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
  edition: string;           // e.g. "Edition of 10"
  editionNumber: number;     // e.g. 10
  claimed: number;           // e.g. 8
  remaining: number;         // e.g. 2
  materials: string[];       // e.g. ["Swiss Manual-Wind Movement", "Curved Double-Dome Sapphire", "Grade-5 Titanium"]
  provenance: string;        // e.g. "Geneva, Switzerland"
  features: string[];
  specs: ProductSpec[];
  colors: { name: string; hex: string }[];
  exclusiveOnly: boolean;
  limitedEdition: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customInitials?: string;
}

export interface OrderAddress {
  type: 'Residence' | 'Private Office';
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
  total: number;
  savings: number;
  address: OrderAddress;
  couponCode?: string;
  otpCode: string;
}
