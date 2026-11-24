import { Product, ProductCategory } from '../types';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

export const CATEGORIES: { name: ProductCategory; icon: string; count: number; description: string; image: string }[] = [
  {
    name: 'Audio',
    icon: 'Headphones',
    count: 3,
    description: 'Immersive sound, spatial drivers & studio ANC',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Keyboards & Mice',
    icon: 'Keyboard',
    count: 3,
    description: 'Tactile hot-swap boards & ergonomic pointing',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Gaming',
    icon: 'Gamepad2',
    count: 3,
    description: 'Low-latency controllers & surround audio headsets',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Smart Accessories',
    icon: 'Cpu',
    count: 4,
    description: 'Fast wireless chargers, USB hubs & NVMe storage',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Webcams & Speakers',
    icon: 'Camera',
    count: 4,
    description: '1080p 60fps streaming optics & studio soundbars',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Desk Setup',
    icon: 'LayoutGrid',
    count: 3,
    description: 'Monitor bars, felt mats, cable docks & aluminum risers',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=600&q=80'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'roco-wireless-anc-headphones',
    sku: 'KT-AUD-001',
    name: 'Roco Wireless ANC Headphones',
    subtitle: 'Hybrid Active Noise Cancelling with 40mm Beryllium Drivers',
    category: 'Audio',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 342,
    badge: 'Best Seller',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Experience pure sonic silence and high-fidelity acoustics. The Roco Wireless ANC features quad-microphone feedforward noise cancellation cutting out 96% of background ambient sound. Memory foam ear cushions wrapped in protein leather ensure 40+ hours of fatigue-free listening.',
    features: [
      'Advanced Active Noise Cancellation (-38dB reduction)',
      '40mm Custom Tuned Beryllium Dynamic Drivers',
      'Up to 45 Hours Battery Life on a single charge',
      'Fast Charge: 10 mins USB-C provides 5 hours playback',
      'Multi-point Bluetooth 5.3 connection (2 devices simultaneously)',
      'Built-in ENC quad microphones for ultra-clear voice calls'
    ],
    specs: [
      { label: 'Driver Size', value: '40mm Custom Tuned' },
      { label: 'Battery Life', value: '45h (ANC off) / 38h (ANC on)' },
      { label: 'Bluetooth Version', value: 'v5.3 with AAC / aptX HD' },
      { label: 'Weight', value: '248g ultra-lightweight' },
      { label: 'Charging Port', value: 'USB-C Fast Charging' },
      { label: 'Warranty', value: '1 Year Brand Replacement' }
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1E293B' },
      { name: 'Lunar Silver', hex: '#CBD5E1' },
      { name: 'Royal Indigo', hex: '#4F46E5' }
    ]
  },
  {
    id: 'rgb-mechanical-gaming-keyboard',
    sku: 'KT-KBD-002',
    name: 'RGB Mechanical Gaming Keyboard',
    subtitle: '75% Compact Layout with Hot-Swappable Pre-lubed Switches',
    category: 'Keyboards & Mice',
    price: 2499,
    originalPrice: 3124,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 219,
    badge: '20% OFF',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Precision mechanical engineering meets vibrant per-key dynamic RGB backlighting. Featuring factory-lubricated linear switches, solid aluminum top plate, and sound-dampening EVA silicone foam for an ultra-creamy, tactile typing experience.',
    features: [
      'Hot-swappable 5-pin PCB supports Cherry, Gateron, Kailh',
      'Pre-lubed linear switches for buttery smooth strokes',
      'PBT double-shot shine-through keycaps (zero fading)',
      '18 dynamic RGB backlight patterns with software customizer',
      'Detachable braided USB Type-C cable with routing channels'
    ],
    specs: [
      { label: 'Layout', value: '75% Compact (84 Keys)' },
      { label: 'Switches', value: 'Factory Pre-Lubed Linear 45g' },
      { label: 'Polling Rate', value: '1000Hz Ultra-Low Latency' },
      { label: 'Keycaps', value: 'Double-Shot PBT OEM Profile' },
      { label: 'Connectivity', value: 'Type-C Wired & 2.4G Wireless' }
    ],
    colors: [
      { name: 'Cyber Dark', hex: '#0F172A' },
      { name: 'Retro Cream', hex: '#F1F5F9' }
    ]
  },
  {
    id: 'pro-wireless-game-controller',
    sku: 'KT-GAM-003',
    name: 'Pro Wireless Game Controller',
    subtitle: 'Hall Effect Electromagnetic Sticks & Zero-Drift Triggers',
    category: 'Gaming',
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 412,
    badge: 'Best Seller',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592840496073-e70ba5797d51?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Designed for competitive gamers who demand zero stick drift. Hall-effect sensors deliver non-contact magnetic tracking, mechanical micro-switch face buttons, and textured laser-etched grips for total control across PC, iOS, Android, and consoles.',
    features: [
      'Hall Effect sensor thumbsticks with permanent zero drift',
      'Tactile microswitch D-pad & ABXY face buttons',
      '2 programmable rear paddle buttons for quick remap',
      'Asymmetric dual rumble motors with 4 intensity levels',
      'Up to 22 hours continuous play on 1000mAh battery'
    ],
    specs: [
      { label: 'Compatibility', value: 'Windows, Switch, iOS, Android' },
      { label: 'Connection', value: '2.4GHz Dongle, BT 5.2, USB-C' },
      { label: 'Latency', value: '< 2.5ms Wired / < 4ms Wireless' },
      { label: 'Battery Capacity', value: '1000mAh Li-ion Rechargeable' }
    ],
    colors: [
      { name: 'Cosmic Slate', hex: '#1E293B' },
      { name: 'Glacier White', hex: '#F8FAFC' }
    ]
  },
  {
    id: 'hd-1080p-streaming-webcam',
    sku: 'KT-CAM-004',
    name: 'HD 1080p Streaming Webcam',
    subtitle: 'FHD 60fps Glass Lens with AI Auto-Focus & Privacy Shutter',
    category: 'Webcams & Speakers',
    price: 3199,
    originalPrice: 3999,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 168,
    badge: 'New',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: true,
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Stream in breathtaking clarity. Equipped with a 6-element distortion-free optical glass lens, AI facial auto-exposure correction for low-light desk setups, dual noise-cancelling omnidirectional mics, and a magnetic physical privacy slider.',
    features: [
      'Full HD 1080p resolution at fluid 60 frames per second',
      'Intelligent Face Tracking and Rapid Auto-Focus',
      'Dual Stereo Mic Array with digital background noise reduction',
      'Integrated Magnetic Privacy Cover for instant security',
      'Universal 360° rotational monitor clamp + standard tripod thread'
    ],
    specs: [
      { label: 'Resolution', value: '1080p @ 60fps / 720p @ 60fps' },
      { label: 'Field of View', value: '90° Wide Angle' },
      { label: 'Focus Type', value: 'Laser-Assisted Auto Focus' },
      { label: 'Cable Length', value: '2.0m Braided USB-A to Type-C' }
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155' }
    ]
  },
  {
    id: 'studio-desktop-speaker-system',
    sku: 'KT-SPK-005',
    name: '2.1 Studio Desktop Speaker System',
    subtitle: 'Dual Acoustic Satellites with Down-Firing 4.5" Subwoofer',
    category: 'Webcams & Speakers',
    price: 4999,
    originalPrice: 5899,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 184,
    badge: '15% OFF',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Room-filling, cinematic desktop audio with true 2.1 channel separation. Silk-dome tweeters provide crystal-clear highs while the dedicated wooden subwoofer provides deep, resonant sub-bass for gaming and lossless music playback.',
    features: [
      '60W Peak Power (30W RMS clean continuous output)',
      'Dedicated Down-Firing 4.5" Wood Enclosure Subwoofer',
      'Bluetooth 5.3, Optical TOSLink, 3.5mm AUX, and USB inputs',
      'Desktop Rotary Control Pod with volume dial and headphone pass-thru'
    ],
    specs: [
      { label: 'Peak Power', value: '60 Watts' },
      { label: 'Frequency Response', value: '45Hz - 20,000Hz' },
      { label: 'Inputs', value: 'BT 5.3, AUX 3.5mm, USB DAC, Optical' },
      { label: 'Subwoofer Size', value: '4.5-inch Deep Bass Driver' }
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#0F172A' },
      { name: 'Walnut & Black', hex: '#78350F' }
    ]
  },
  {
    id: 'smart-bluetooth-mini-speaker',
    sku: 'KT-SPK-006',
    name: 'Smart Bluetooth Mini Speaker',
    subtitle: '360° Spatial Sound, IPX7 Waterproof with RGB Ring Indicator',
    category: 'Webcams & Speakers',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    rating: 4.6,
    reviewCount: 95,
    badge: 'New',
    inStock: true,
    featured: false,
    trending: false,
    newArrival: true,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Compact acoustic powerhouse designed to sit neatly under your monitor or travel in your tech backpack. Delivers 360-degree omni-directional audio with punchy dual passive radiators and 14 hours of playback.',
    features: [
      '360° Omni-directional acoustic tuning',
      'IPX7 Waterproof rated chassis',
      'TWS Dual-Pairing mode (link two speakers for stereo)',
      '14 Hours continuous wireless battery playback'
    ],
    specs: [
      { label: 'Output Power', value: '12W RMS' },
      { label: 'Battery Capacity', value: '2600mAh' },
      { label: 'Water Resistance', value: 'IPX7 Certified' },
      { label: 'Weight', value: '310g' }
    ],
    colors: [
      { name: 'Indigo Mist', hex: '#4F46E5' },
      { name: 'Dark Teal', hex: '#0F766E' }
    ]
  },
  {
    id: 'ergonomic-vertical-wireless-mouse',
    sku: 'KT-MOU-007',
    name: 'Ergonomic Vertical Wireless Mouse',
    subtitle: '57° Natural Handshake Angle with Silent Optical Switches',
    category: 'Keyboards & Mice',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 276,
    badge: 'Best Seller',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Eliminate wrist fatigue and repetitive strain injuries. Engineered at a scientifically validated 57° ergonomic handshake angle, with whisper-quiet 90% silent microswitches and smooth 4000 DPI multi-surface optical sensor.',
    features: [
      '57° biomechanically aligned handshake posture',
      'Silent-Click switches reduce 90% of click noise',
      'Tri-Mode Connectivity: Bluetooth 5.0 + Bluetooth 3.0 + 2.4GHz USB',
      'Thumb navigation forward/back buttons and DPI toggle',
      'Rechargeable 500mAh lithium battery via USB-C'
    ],
    specs: [
      { label: 'Sensor Resolution', value: '800 / 1200 / 1600 / 2400 / 4000 DPI' },
      { label: 'Angle', value: '57° Ergonomic' },
      { label: 'Battery Life', value: 'Up to 90 Days per charge' },
      { label: 'Weight', value: '115g' }
    ],
    colors: [
      { name: 'Matte Graphite', hex: '#1E293B' },
      { name: 'Off-White Gray', hex: '#E2E8F0' }
    ]
  },
  {
    id: 'surround-sound-gaming-headset',
    sku: 'KT-GAM-008',
    name: 'Surround Sound Gaming Headset',
    subtitle: '7.1 Virtual Spatial Audio with Detachable Broadcast Mic',
    category: 'Gaming',
    price: 2799,
    originalPrice: 3099,
    discountPercent: 10,
    rating: 4.7,
    reviewCount: 198,
    badge: '10% OFF',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pinpoint competitive footsteps and directional audio cues with extreme accuracy. Features custom 50mm neodymium acoustic drivers, cooling-gel infused ear pads, and a broadcast-quality cardioid boom microphone.',
    features: [
      'Hardware-tuned 7.1 Virtual Spatial Sound engine',
      '50mm Custom Neodymium high-density drivers',
      'Cooling gel-infused breathable memory foam ear cushions',
      'Detachable noise-cancelling cardioid broadcast mic',
      'On-ear quick mute toggle & precision aluminum volume wheel'
    ],
    specs: [
      { label: 'Drivers', value: '50mm Neodymium' },
      { label: 'Frequency Range', value: '20Hz - 28kHz' },
      { label: 'Microphone', value: 'Detachable 6mm Cardioid' },
      { label: 'Connection', value: 'USB & 3.5mm Gold-Plated Jack' }
    ],
    colors: [
      { name: 'Midnight Violet', hex: '#4338CA' },
      { name: 'Carbon Black', hex: '#0F172A' }
    ]
  },
  {
    id: 'dual-vibration-wireless-gamepad',
    sku: 'KT-GAM-009',
    name: 'Dual-Vibration Wireless Gamepad',
    subtitle: 'Anti-Slip Textured Ergonomic Shell with Linear Triggers',
    category: 'Gaming',
    price: 2199,
    originalPrice: 2799,
    discountPercent: 21,
    rating: 4.6,
    reviewCount: 112,
    badge: 'New',
    inStock: true,
    featured: false,
    trending: false,
    newArrival: true,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Responsive precision wireless gamepad with progressive Hall effect trigger switches for ultimate racing and FPS accuracy. Enhanced dual asymmetric vibration feedback puts every engine rev and blast straight into your hands.',
    features: [
      'Progressive Hall-sensing linear triggers',
      'Dual asymmetric dynamic vibration motors',
      'Turbo auto-fire function with 3 speed settings',
      'Low latency 2.4G wireless dongle included'
    ],
    specs: [
      { label: 'Battery', value: '800mAh (16 hrs playback)' },
      { label: 'Platforms', value: 'PC, Steam Deck, Android, Switch' },
      { label: 'Wireless Range', value: 'Up to 10 meters' }
    ],
    colors: [
      { name: 'Polar White', hex: '#FFFFFF' },
      { name: 'Stealth Black', hex: '#1E293B' }
    ]
  },
  {
    id: 'kinetix-3-key-programmable-macro-pad',
    sku: 'KT-MAC-010',
    name: 'Kinetix 3-Key Programmable Macro Pad',
    subtitle: 'CNC Aluminum Case, Hot-Swap Sockets & Heavy Brass Dial',
    category: 'Keyboards & Mice',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 389,
    badge: 'Best Seller',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The ultimate tactile productivity accessory. Solid CNC anodized aluminum enclosure housing 3 programmable mechanical keys and a knurled rotary knob for instant volume, timeline scrub, zoom, or Photoshop brush sizing.',
    features: [
      'Anodized 6063 CNC Aluminum block chassis',
      'Stepped knurled rotary encoder with click button',
      'Hot-swappable Kailh switch sockets with factory lubed yellows',
      'QMK / VIA web browser firmware configurable (zero bloatware)',
      'Underglow RGB mood lighting with diffused acrylic base'
    ],
    specs: [
      { label: 'Body Material', value: 'CNC Anodized 6063 Aluminum' },
      { label: 'Knob', value: 'Continuous Rotary with Click' },
      { label: 'Firmware', value: 'VIA / QMK Web-Configurable' },
      { label: 'Cable', value: 'Type-C Coiled Cable Included' }
    ],
    colors: [
      { name: 'Anodized Indigo', hex: '#4F46E5' },
      { name: 'Matte Space Gray', hex: '#334155' }
    ]
  },
  {
    id: 'ultra-slim-aluminum-laptop-stand',
    sku: 'KT-DSK-011',
    name: 'Ultra-Slim Aluminum Laptop Stand',
    subtitle: 'Ergonomic Eye-Level Elevation with Cable Pass-Through',
    category: 'Desk Setup',
    price: 1299,
    originalPrice: 1699,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 245,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Elevates your notebook screen by 6 inches to correct posture and relieve neck strain. Crafted from a single piece of sandblasted aircraft-grade aluminum that acts as a natural heat sink to cool your laptop during heavy workloads.',
    features: [
      'Single-piece CNC sculpted aircraft-grade aluminum',
      'Elevates laptop screen to optimal 15° eye level',
      'Open design promotes 360° unrestricted thermal airflow',
      'Anti-slip silicone pads prevent scratches and desk sliding',
      'Integrated rear cable management cutout'
    ],
    specs: [
      { label: 'Compatibility', value: 'All 11" to 17" Laptops & MacBooks' },
      { label: 'Material', value: '4mm Sandblasted Aluminum' },
      { label: 'Elevation Height', value: '150mm (6 inches)' },
      { label: 'Weight Capacity', value: 'Up to 10kg' }
    ],
    colors: [
      { name: 'Space Gray', hex: '#475569' },
      { name: 'Silver Mist', hex: '#CBD5E1' }
    ]
  },
  {
    id: '7-in-1-usb-c-4k-hdmi-hub',
    sku: 'KT-ACC-012',
    name: '7-in-1 USB-C 4K HDMI Hub',
    subtitle: '100W Power Delivery, 4K@60Hz HDMI & UHS-I SD Card Reader',
    category: 'Smart Accessories',
    price: 1799,
    originalPrice: 2119,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 156,
    badge: '15% OFF',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Expand one USB-C port into a complete workstation hub. Delivers crisp 4K@60Hz video to external monitors, ultra-fast 100W Power Delivery pass-through charging, 5Gbps USB 3.0 data transfers, and simultaneous SD/TF card reading.',
    features: [
      'HDMI 2.0 port supports crisp 4K @ 60Hz video output',
      'USB-C 100W Power Delivery input keeps laptop charged',
      '3x USB-A 3.0 ports with up to 5Gbps transfer rate',
      'SD & MicroSD card slots supporting simultaneous reads',
      'Compact heat-dissipating anodized aluminum casing'
    ],
    specs: [
      { label: 'Ports', value: 'HDMI 4K@60Hz, 3x USB 3.0, PD 100W, SD, TF' },
      { label: 'Transfer Speed', value: 'Up to 5 Gbps' },
      { label: 'Charging', value: 'Pass-through up to 100W' }
    ],
    colors: [
      { name: 'Deep Titanium', hex: '#334155' }
    ]
  },
  {
    id: 'magnetic-wireless-charging-pad-15w',
    sku: 'KT-ACC-013',
    name: 'Magnetic Wireless Charging Pad 15W',
    subtitle: 'Qi2-Certified Fast Magnetic Snap with Braided Nylon Cord',
    category: 'Smart Accessories',
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 312,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1622445262464-84b150777731?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b150777731?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Instant snap-and-charge convenience for iPhone, Samsung, and Qi-compatible earbuds. Strong N52 neodymium magnetic ring self-aligns perfectly to maximize charging speed without generating excess heat.',
    features: [
      '15W Fast Magnetic Wireless charging output',
      'N52 Neodymium magnetic array ensures instant lock',
      'Ultra-slim 6mm profile with matte silicone anti-scratch face',
      'Intelligent thermal management and foreign object detection'
    ],
    specs: [
      { label: 'Max Output', value: '15W (7.5W iPhone / 10W-15W Android)' },
      { label: 'Cable Length', value: '1.5m Braided USB-C' },
      { label: 'Thickness', value: '6.2mm Ultra-Thin' }
    ],
    colors: [
      { name: 'Pure White', hex: '#F8FAFC' },
      { name: 'Matte Indigo', hex: '#4F46E5' }
    ]
  },
  {
    id: 'active-noise-cancelling-earbuds-pro',
    sku: 'KT-AUD-014',
    name: 'Active Noise Cancelling Earbuds Pro',
    subtitle: 'Lossless LDAC Audio, Transparency Mode & Wireless Charging',
    category: 'Audio',
    price: 2699,
    originalPrice: 3374,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 289,
    badge: '20% OFF',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pocket-sized studio acoustics. Featuring high-res LDAC audio decoding, 35dB active hybrid noise cancellation, dual-microphone beamforming for crystal clear phone calls, and seamless Qi wireless charging case.',
    features: [
      'Hybrid ANC with ambient Transparency Pass-Through mode',
      '11mm Titanium diaphragm dynamic drivers',
      '32 Hours total battery playtime with charging case',
      'IPX5 sweat and splash resistance for gym workouts',
      'Qi wireless charging and USB Type-C fast charge'
    ],
    specs: [
      { label: 'Playtime', value: '7.5h per earbud / 32h with case' },
      { label: 'Drivers', value: '11mm Titanium Coated' },
      { label: 'Bluetooth', value: 'v5.3 with LDAC / AAC' },
      { label: 'Waterproof', value: 'IPX5 Sweatproof' }
    ],
    colors: [
      { name: 'Ceramic White', hex: '#FFFFFF' },
      { name: 'Matte Onyx', hex: '#1E293B' }
    ]
  },
  {
    id: 'extended-felt-leather-desk-mat',
    sku: 'KT-DSK-015',
    name: 'Extended Felt & Leather Desk Mat',
    subtitle: 'Dual-Sided Reversible Vegan Leather & Merino Wool Blend',
    category: 'Desk Setup',
    price: 799,
    originalPrice: 1199,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 421,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Transform your desktop aesthetics instantly. Premium dual-sided design with water-resistant vegan PU leather on one side and cozy, high-density felt wool on the other. Spacious 900x400mm area fits full-size keyboard and mouse.',
    features: [
      'Spacious 900 x 400 mm oversized coverage',
      'Dual-sided reversible (Waterproof Leather + Warm Felt)',
      'Precision mouse tracking surface with zero snagging',
      'Stitched anti-fray perimeter edges for lifelong durability',
      'Includes roll-up leather travel strap'
    ],
    specs: [
      { label: 'Dimensions', value: '90cm x 40cm x 3mm' },
      { label: 'Material', value: 'Eco PU Leather & Merino Wool Felt' },
      { label: 'Cleaning', value: 'Wipe Clean with damp cloth' }
    ],
    colors: [
      { name: 'Navy & Charcoal', hex: '#1E293B' },
      { name: 'Cognac Brown', hex: '#78350F' }
    ]
  },
  {
    id: 'led-monitor-light-bar-dimmer',
    sku: 'KT-DSK-016',
    name: 'LED Monitor Light Bar with Dimmer',
    subtitle: 'Asymmetric Optical Design Zero Screen Glare & Wireless Dial',
    category: 'Desk Setup',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 310,
    badge: 'New',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: true,
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Save desk space and protect your eyes during late-night coding or gaming sessions. Mounts securely on top of any flat or curved monitor with patented asymmetric optics that light up your desk without casting any glare on the screen.',
    features: [
      'Patented asymmetric light path illuminates desk, not screen',
      'Stepless brightness and color temperature (2700K - 6500K)',
      'High Color Rendering Index (Ra > 95) for true color accuracy',
      'Gravity-counterweight clamp fits curved and flat displays',
      'USB-powered directly from monitor or computer port'
    ],
    specs: [
      { label: 'Color Temperature', value: '2700K - 6500K Stepless' },
      { label: 'Power Input', value: '5V 1A USB-C (5W)' },
      { label: 'Length', value: '45cm Full Monitor Coverage' },
      { label: 'CRI', value: 'Ra > 95 True Spectrum' }
    ],
    colors: [
      { name: 'Anodized Black', hex: '#0F172A' }
    ]
  },
  {
    id: 'portable-1tb-nvme-external-ssd',
    sku: 'KT-ACC-017',
    name: 'Portable 1TB NVMe External SSD',
    subtitle: 'Blazing 1050MB/s Read Speeds with Rugged Aluminum Enclosure',
    category: 'Smart Accessories',
    price: 6499,
    originalPrice: 8499,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 147,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pocket-sized speed for content creators and power users. Transfer a 50GB 4K video file in under 60 seconds with read/write speeds up to 1050MB/s. Built into an IP55 drop-resistant aluminum chassis with rubber bumper.',
    features: [
      'Blazing fast NVMe performance up to 1,050 MB/s',
      'USB 3.2 Gen 2 Type-C interface',
      'Drop-resistant up to 2 meters with IP55 water and dust resistance',
      'Hardware 256-bit AES encryption support',
      'Includes USB-C to USB-C and USB-C to USB-A cables'
    ],
    specs: [
      { label: 'Capacity', value: '1TB High-Performance 3D NAND' },
      { label: 'Sequential Read', value: 'Up to 1050 MB/s' },
      { label: 'Sequential Write', value: 'Up to 1000 MB/s' },
      { label: 'Interface', value: 'USB 3.2 Gen 2 (10Gbps)' }
    ],
    colors: [
      { name: 'Indigo Armor', hex: '#4F46E5' },
      { name: 'Slate Gray', hex: '#334155' }
    ]
  },
  {
    id: 'studio-condenser-usb-microphone',
    sku: 'KT-MIC-018',
    name: 'Studio Condenser USB Microphone',
    subtitle: '192kHz/24bit Broadcast Capsule with Tap-to-Mute & RGB',
    category: 'Webcams & Speakers',
    price: 3299,
    originalPrice: 3665,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 223,
    badge: '10% OFF',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520523839898-507127054976?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Sound like a veteran studio broadcaster. High-resolution 192kHz/24bit sampling rate captures natural vocal warmth and clarity. Features an instant capacitive tap-to-mute sensor on top, gain knob, and headphone monitor jack.',
    features: [
      'Pro 192kHz / 24-bit studio sampling rate',
      'Cardioid polar pattern rejects background keyboard clatter',
      'Capacitive instant tap-to-mute with LED status ring',
      'Built-in pop filter and anti-vibration shock mount',
      '3.5mm real-time latency-free audio monitoring jack'
    ],
    specs: [
      { label: 'Sample Rate', value: '192kHz / 24bit' },
      { label: 'Polar Pattern', value: 'Cardioid Directional' },
      { label: 'Frequency Response', value: '20Hz - 20kHz' },
      { label: 'Mounting', value: 'Desk Stand & Boom Arm 5/8" Thread' }
    ],
    colors: [
      { name: 'Matte Black', hex: '#0F172A' },
      { name: 'Frost White', hex: '#F8FAFC' }
    ]
  },
  {
    id: 'smart-fitness-notification-watch',
    sku: 'KT-WAT-019',
    name: 'Smart Fitness & Notification Watch',
    subtitle: '1.43" AMOLED Display, Always-On Mode, SpO2 & 12-Day Battery',
    category: 'Smart Accessories',
    price: 3999,
    originalPrice: 5499,
    discountPercent: 27,
    rating: 4.7,
    reviewCount: 382,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: true,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1579586317279-335b0fd826b6?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579586317279-335b0fd826b6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Keep notifications and productivity metrics right at your wrist. Vivid 1.43-inch 466x466 AMOLED screen with 600 nits brightness, 100+ sport modes, 24/7 heart rate and blood oxygen tracking, and 12 days of battery life.',
    features: [
      '1.43" HD AMOLED display with 60Hz smooth refresh rate',
      'Always-On Display (AOD) with 100+ customizable watch faces',
      'Bluetooth Calling with noise-suppressed speaker and microphone',
      'All-day Heart Rate, SpO2, Sleep, and Stress Tracking',
      '12-Day battery endurance on typical usage'
    ],
    specs: [
      { label: 'Screen', value: '1.43" AMOLED 466x466 (600 nits)' },
      { label: 'Battery', value: 'Up to 12 days (typical) / 5 days (heavy)' },
      { label: 'Water Rating', value: '5 ATM (50m Swimproof)' },
      { label: 'Strap', value: 'Quick-Release 22mm Liquid Silicone' }
    ],
    colors: [
      { name: 'Space Black', hex: '#1E293B' },
      { name: 'Silver Storm', hex: '#94A3B8' }
    ]
  },
  {
    id: 'maglock-under-desk-cable-organizer',
    sku: 'KT-DSK-020',
    name: 'MagLock Under-Desk Cable Organizer',
    subtitle: 'Magnetic Quick-Drop Wire Channel with Heavy Clamps',
    category: 'Desk Setup',
    price: 549,
    originalPrice: 899,
    discountPercent: 39,
    rating: 4.8,
    reviewCount: 195,
    badge: undefined,
    inStock: true,
    featured: false,
    trending: false,
    newArrival: false,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Transform tangled, messy power strips and hanging wires into a clean, invisible wire raceway under your desk. No drilling required—heavy-duty desk clamp locks securely to any table up to 50mm thick with magnetic snap covers.',
    features: [
      'No-drill heavy duty C-clamp mounting mechanism',
      'Magnetic flip-open cover for effortless wire routing',
      'Spacious steel basket holds power strip and large adapters',
      'Ventilated grid design prevents heat buildup'
    ],
    specs: [
      { label: 'Length', value: '43cm / 17 inches' },
      { label: 'Desk Thickness Supported', value: '10mm to 55mm' },
      { label: 'Material', value: 'Powder-Coated Cold Rolled Steel' },
      { label: 'Max Load', value: '7.5kg' }
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0F172A' },
      { name: 'Clean White', hex: '#F1F5F9' }
    ]
  }
];

export const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    rating: 5,
    date: '2 days ago',
    comment: 'Exceptional build quality! I was skeptical at first, but the ergonomics and sound precision exceeded my expectations. Fast delivery to Bengaluru.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Priya Mehta',
    rating: 5,
    date: '1 week ago',
    comment: 'The packaging and attention to detail are Apple-tier. Clean lavender aesthetic on the store too, very pleasant checkout flow.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Rohan Deshmukh',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Solid value for money in Indian Rupees. Highly recommended for desk setup enthusiasts looking for minimalistic gear.',
    verified: true
  }
];
