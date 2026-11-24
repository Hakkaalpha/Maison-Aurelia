import { Product, MaisonCategory } from '../types';

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85';

export const MAISON_CATEGORIES: {
  name: MaisonCategory;
  icon: string;
  count: number;
  tagline: string;
  image: string;
}[] = [
  {
    name: 'Horology',
    icon: 'Watch',
    count: 4,
    tagline: 'Swiss Tourbillons, Moonphase Calibres & Hand-Engineered Dials',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85'
  },
  {
    name: 'Bespoke Leather',
    icon: 'Briefcase',
    count: 4,
    tagline: 'Tuscan Full-Grain Weekenders, Briefcases & Suede Watch Vaults',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85'
  },
  {
    name: 'Haute Parfumerie',
    icon: 'Sparkles',
    count: 3,
    tagline: 'Aged Assam Oud Extraits, Pure Ambergris & Crystal Flacons',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85'
  },
  {
    name: 'Eyewear & Pens',
    icon: 'Glasses',
    count: 3,
    tagline: 'Japanese Beta-Titanium Frames & 18K Hand-Engraved Gold Nibs',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85'
  },
  {
    name: 'Collector Objects',
    icon: 'Compass',
    count: 3,
    tagline: 'Calacatta Marble Chess Sets, Brass Espresso & Celestial Orreries',
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=800&q=85'
  },
  {
    name: 'Atelier Audio',
    icon: 'Headphones',
    count: 3,
    tagline: 'Planar Beryllium Transducers & Solid CZ121 Brass Acoustics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'aurelia-tourbillon-skeleton-chronometer',
    sku: 'AU-HOR-001',
    name: 'Aurelia Tourbillon Skeleton Chronometer',
    subtitle: 'Swiss Flying Tourbillon with Hand-Polished Bridges & Double-Dome Sapphire',
    category: 'Horology',
    price: 145000,
    originalPrice: 175000,
    rating: 5.0,
    reviewCount: 14,
    badge: 'Collector First Edition',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 10',
    editionNumber: 10,
    claimed: 8,
    remaining: 2,
    materials: ['Grade-5 Titanium & 18K White Gold', 'Curved Sapphire Crystals', 'Hand-Stitched Alligator'],
    provenance: 'La Chaux-de-Fonds, Switzerland',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The pinnacle of independent Swiss horology. Engineered with an openworked flying tourbillon cage completing one rotation per 60 seconds. Every bridge is hand-beveled with inward anglages by master watchmakers.',
    features: [
      'Manual-wind 3Hz flying tourbillon caliber with 72-hour power reserve',
      'Double-domed anti-reflective scratchproof sapphire crystal front & exhibition back',
      'Grade-5 Titanium case with hand-satin brushed flanks and mirror-polished bezels',
      'Hand-stitched Mississippiensis alligator leather strap with 18K gold deployant clasp'
    ],
    specs: [
      { label: 'Movement', value: 'Calibre AU-01 Manual Tourbillon (21,600 vph)' },
      { label: 'Power Reserve', value: '72 Hours Twin-Barrel' },
      { label: 'Case Diameter', value: '41.5mm • 10.8mm Ultra-Thin' },
      { label: 'Provenance', value: 'Handmade in La Chaux-de-Fonds' },
      { label: 'Exclusivity', value: 'Strictly 10 Numbered Pieces Worldwide' }
    ],
    colors: [
      { name: 'Titanium Slate & Platinum', hex: '#64748B' },
      { name: 'Obsidian Rose', hex: '#B89653' }
    ]
  },
  {
    id: 'palazzo-full-grain-tuscan-weekender',
    sku: 'AU-LTH-002',
    name: 'Palazzo Full-Grain Tuscan Weekender Bag',
    subtitle: 'Hand-Stitched Full-Grain Vegetable-Tanned Leather with Solid Brass Lock',
    category: 'Bespoke Leather',
    price: 64500,
    originalPrice: 78000,
    rating: 4.9,
    reviewCount: 22,
    badge: 'Vault Selection',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 20',
    editionNumber: 20,
    claimed: 17,
    remaining: 3,
    materials: ['Tuscan Full-Grain Vachetta Leather', 'Solid CZ121 Brass Hardware', 'Herringbone Canvas Lining'],
    provenance: 'Florence, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Cut from pristine Tuscan cowhides tanned with chestnut and mimosa barks over 40 days. Features solid machined brass hardware that ages into a deep warm golden patina.',
    features: [
      'Master saddler hand-stitched double leather handles with reinforced brass rivets',
      'Heavy-gauge YKK Excella gold-teeth zip with lockable brass padlock',
      'Removable padded shoulder strap and dedicated shoe compartment lined in water-repellent silk'
    ],
    specs: [
      { label: 'Dimensions', value: '52cm x 28cm x 30cm (Approved Cabin Size)' },
      { label: 'Weight', value: '2.4 kg of Pure Unsplit Calfskin' },
      { label: 'Tannery', value: 'Pelle Conciata al Vegetale, Tuscany' }
    ],
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#8B4513' },
      { name: 'Midnight Obsidian', hex: '#0B0C10' }
    ]
  },
  {
    id: 'oud-royale-extrait-de-parfum',
    sku: 'AU-PRF-003',
    name: 'Oud Royale Extrait de Parfum (100ml)',
    subtitle: '30-Year Aged Wild Assam Agarwood, Taif Rose & Hand-Cut Crystal Flacon',
    category: 'Haute Parfumerie',
    price: 28900,
    originalPrice: 35000,
    rating: 5.0,
    reviewCount: 31,
    badge: 'Private Reserve',
    inStock: true,
    featured: true,
    trending: false,
    edition: 'Edition of 30',
    editionNumber: 30,
    claimed: 26,
    remaining: 4,
    materials: ['Vintage 1994 Assam Oud Oil', 'Heavy Hand-Cut Crystal', 'Solid Brass Dip-Stick Cap'],
    provenance: 'Grasse, France & Assam, India',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An uncompromising 40% concentration pure extrait. Formulated around wild harvested agarwood aged for 3 decades, opening with fresh bergamot and blooming into velvet Taif rose, ambergris, and smoky resin.',
    features: [
      '40% Extrait de Parfum concentration (lasts 36+ hours on skin)',
      'Heavy 650g optical crystal flacon faceted like an emerald diamond',
      'Solid brass cap sealed with red beeswax and numbered authenticity emblem'
    ],
    specs: [
      { label: 'Volume', value: '100ml / 3.4 fl. oz. Extrait' },
      { label: 'Key Notes', value: 'Assam Oud, Taif Rose, Royal Ambergris, Sandalwood' },
      { label: 'Maceration', value: '18 Months in French Oak Barrels' }
    ],
    colors: [
      { name: 'Amber Crystal', hex: '#D97706' }
    ]
  },
  {
    id: 'kyoto-japanese-titanium-aviator-frames',
    sku: 'AU-EYE-004',
    name: 'Kyoto Japanese Titanium Aviator Frames',
    subtitle: 'Laser-Sculpted Beta-Titanium with Carl Zeiss Polarized Glass Lenses',
    category: 'Eyewear & Pens',
    price: 34500,
    originalPrice: 42000,
    rating: 4.9,
    reviewCount: 19,
    badge: 'Limited Atelier',
    inStock: true,
    featured: true,
    trending: false,
    edition: 'Edition of 25',
    editionNumber: 25,
    claimed: 21,
    remaining: 4,
    materials: ['Japanese Beta-Titanium', 'Mineral Glass Zeiss Polarized', 'Ceramic Nose Pads'],
    provenance: 'Fukui Prefecture, Japan',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Weighing a mere 14 grams, hand-finished in the historic eyewear capital of Sabae, Japan. The beta-titanium alloy flexes effortlessly to adapt to any facial structure while retaining permanent shape memory.',
    features: [
      'Ultralight 14g aerospace beta-titanium chassis',
      'Carl Zeiss mineral glass lenses with 10-layer anti-reflective & polarization coating',
      'Medical-grade hypollergenic polished ceramic nose pads'
    ],
    specs: [
      { label: 'Frame Weight', value: '14.2 grams' },
      { label: 'Lens Material', value: 'Optically Pure Polarized Mineral Glass' },
      { label: 'Origin', value: 'Sabae, Fukui, Japan' }
    ],
    colors: [
      { name: 'Brushed Champagne Gold', hex: '#B89653' },
      { name: 'Matte Titanium Smoke', hex: '#475569' }
    ]
  },
  {
    id: 'calacatta-marble-brass-chess-set',
    sku: 'AU-OBJ-005',
    name: 'Calacatta Marble & Brass Chess Set',
    subtitle: 'Monolithic Italian Calacatta Gold & Marquina Black Stone with Solid Brass Pieces',
    category: 'Collector Objects',
    price: 78000,
    originalPrice: 95000,
    rating: 5.0,
    reviewCount: 16,
    badge: 'Collector First Edition',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 15',
    editionNumber: 15,
    claimed: 13,
    remaining: 2,
    materials: ['Italian Calacatta Gold Marble', 'Nero Marquina Marble', 'Solid Lathed CZ121 Brass'],
    provenance: 'Carrara, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A monument of architectural sculpture and intellectual pursuit. The 16kg board is water-jet sculpted from book-matched Italian marble slabs, paired with 32 hand-lathed solid brass and black chrome pieces.',
    features: [
      '16 Kilogram solid dual-stone marble chessboard with chamfered perimeter',
      'Solid brass chess pieces each weighted with lead cores and felt base pads',
      'Handmade leather velvet storage casket with personalized brass serial plaque'
    ],
    specs: [
      { label: 'Board Size', value: '45cm x 45cm x 3.5cm Solid Stone' },
      { label: 'King Height & Weight', value: '98mm • 140 grams per piece' },
      { label: 'Total Weight', value: '18.5 kg Complete Heirloom Set' }
    ],
    colors: [
      { name: 'Calacatta White & Nero Gold', hex: '#E2E8F0' }
    ]
  },
  {
    id: 'aurelia-reference-planar-magnetic-headphones',
    sku: 'AU-AUD-006',
    name: 'Aurelia Reference Planar Magnetic Headphones',
    subtitle: 'Grade-5 Titanium Gimbal, Planar-Magnetic Drivers & Italian Nappa Leather',
    category: 'Atelier Audio',
    price: 68500,
    originalPrice: 85000,
    rating: 5.0,
    reviewCount: 38,
    badge: 'Vault Selection',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 25',
    editionNumber: 25,
    claimed: 23,
    remaining: 2,
    materials: ['Grade-5 Titanium Billets', 'Tuscan Full-Grain Nappa', 'Beryllium Planar Drivers'],
    provenance: 'London & Geneva',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The definitive acoustic statement for private listening rooms. Machined from solid Grade-5 titanium billets with diamond-cut acoustic grilles, housing 50mm ultra-thin planar-magnetic transducers calibrated to ±0.25dB studio tolerance.',
    features: [
      'Custom 50mm Planar-Magnetic Diaphragms with sub-1ms transient response',
      'Solid Grade-5 Titanium articulated headband and bespoke CNC gimbals',
      'Hand-stitched Tuscan vegetable-tanned leather headband with memory core',
      'Quad-microphone hybrid active noise cancellation (-42dB isolation)'
    ],
    specs: [
      { label: 'Transducer', value: '50mm Planar Magnetic with Neo-N54' },
      { label: 'Frequency Response', value: '5Hz – 52,000Hz Ultra-Wide' },
      { label: 'Total Harmonic Distortion', value: '< 0.03% @ 1kHz' }
    ],
    colors: [
      { name: 'Brushed Raw Titanium', hex: '#87868A' },
      { name: 'Obsidian Black DLC', hex: '#0B0C10' }
    ]
  },
  {
    id: 'heritage-moonphase-rose-gold-watch',
    sku: 'AU-HOR-007',
    name: 'Heritage Moonphase Rose-Gold Dress Watch',
    subtitle: '18K Rose Gold Plated Case with Lapis Lazuli Astronomical Moonphase Disc',
    category: 'Horology',
    price: 118000,
    originalPrice: 140000,
    rating: 4.9,
    reviewCount: 18,
    badge: 'Numbered Run',
    inStock: true,
    featured: true,
    trending: false,
    edition: 'Edition of 12',
    editionNumber: 12,
    claimed: 10,
    remaining: 2,
    materials: ['18K Rose-Gold over 316L Steel', 'Natural Lapis Lazuli Dial', 'Cognac Alligator Leather'],
    provenance: 'Glashütte, Germany',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A poetic celebration of celestial mechanics. An astronomical moonphase disk crafted from genuine royal lapis lazuli stone with laser-etched gold celestial stars, accurate for 122 years without adjustment.',
    features: [
      'Precision automatic caliber with 28,800 vibrations/hour and 48H reserve',
      'Astronomical true-moonphase display utilizing genuine Afghan lapis lazuli stone',
      'Guilloché silver opaline dial with blued steel Breguet hands'
    ],
    specs: [
      { label: 'Movement', value: 'Calibre AU-Moon Automatic (Glashütte)' },
      { label: 'Case Diameter', value: '39.5mm Classic Dress Profile' },
      { label: 'Water Resistance', value: '5 ATM (50m Splashproof)' }
    ],
    colors: [
      { name: 'Rose Gold & Lapis Blue', hex: '#B89653' }
    ]
  },
  {
    id: 'florence-structured-leather-briefcase',
    sku: 'AU-LTH-008',
    name: 'Florence Structured Leather Briefcase',
    subtitle: 'Reinforced English Bridle Leather with Solid Brass Sentry Lock',
    category: 'Bespoke Leather',
    price: 52000,
    originalPrice: 62000,
    rating: 4.8,
    reviewCount: 25,
    badge: 'Vault Selection',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 25',
    editionNumber: 25,
    claimed: 21,
    remaining: 4,
    materials: ['English Bridle Leather (Wax-Stuffed)', 'Hand-Forged Brass Lock', 'Burgundy Suede'],
    provenance: 'Florence, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Engineered for counsel chambers and boardrooms. Traditional bridle leather infused with natural oils and waxes, producing self-healing properties that brush away surface scuffs.',
    features: [
      'Three partitioned main compartments holding 16" laptop and legal dossiers',
      'Solid brass 3-digit combination sentry lock with satisfying mechanical click',
      'Beveled and burnished hand-stained edges sealed with natural beeswax'
    ],
    specs: [
      { label: 'Capacity', value: '16" MacBook Pro & Legal Folios' },
      { label: 'Leather Origin', value: 'Tuscan Vegetable Tannery' }
    ],
    colors: [
      { name: 'British Tan', hex: '#9A3412' },
      { name: 'Onyx Noir', hex: '#0B0C10' }
    ]
  },
  {
    id: 'ambre-nocturne-private-reserve-scent',
    sku: 'AU-PRF-009',
    name: 'Ambre Nocturne Private Reserve Scent',
    subtitle: 'Rare White Ambergris, Bulgarian Damask Rose & Aged Madagascar Vanilla',
    category: 'Haute Parfumerie',
    price: 24500,
    originalPrice: 30000,
    rating: 4.9,
    reviewCount: 29,
    badge: 'Private Reserve',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 35',
    editionNumber: 35,
    claimed: 30,
    remaining: 5,
    materials: ['Ethically Sourced White Ambergris', 'Cold-Pressed Damask Rose', 'Smoky Flacon Glass'],
    provenance: 'Grasse, France',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An intoxicating evening formulation built on vintage natural ambergris, providing a salty, skin-warm sensuality wrapped in velvety rose absolute and smoked resins.',
    features: [
      'Concentrated 35% pure perfume oils providing extraordinary sillage',
      'Heavy midnight smoked glass bottle with magnetic gold cap'
    ],
    specs: [
      { label: 'Volume', value: '100ml / 3.4 oz' },
      { label: 'Longevity', value: '24+ Hours Sillage' }
    ],
    colors: [
      { name: 'Smoked Obsidian Flacon', hex: '#1C1917' }
    ]
  },
  {
    id: 'mont-blanc-obsidian-fountain-pen',
    sku: 'AU-EYE-010',
    name: 'Mont-Blanc Obsidian & 18K Nib Fountain Pen',
    subtitle: 'Deep Precious Resin with Hand-Chased 18K Solid Gold Nib & Piston Filler',
    category: 'Eyewear & Pens',
    price: 39900,
    originalPrice: 48000,
    rating: 5.0,
    reviewCount: 34,
    badge: 'Collector First Edition',
    inStock: true,
    featured: true,
    trending: false,
    edition: 'Edition of 20',
    editionNumber: 20,
    claimed: 18,
    remaining: 2,
    materials: ['Deep Obsidian Precious Resin', '18K Two-Tone Solid Gold Nib', 'Platinum Plated Accents'],
    provenance: 'Hamburg, Germany',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'For treaties, deeds, and personal letters. The 18K hand-tuned nib yields with delicate elasticity under the hand, laying down ink with effortless glide.',
    features: [
      'Hand-ground 18K gold nib with iridium tip (available in Fine or Medium)',
      'Internal brass piston mechanism holding 1.8ml of fountain pen ink',
      'Screw-on airtight cap preventing nib drying even when stored for months'
    ],
    specs: [
      { label: 'Nib', value: '18K Solid Gold Hand-Chased' },
      { label: 'Weight', value: '42 grams Balanced Brass Core' }
    ],
    colors: [
      { name: 'Obsidian Black & Gold', hex: '#B89653' }
    ]
  },
  {
    id: 'barista-pro-solid-brass-espresso-machine',
    sku: 'AU-OBJ-011',
    name: 'Barista Pro Solid Brass Lever Espresso Machine',
    subtitle: 'Direct-Lever Manual Extraction Machine in Hand-Polished CZ121 Brass',
    category: 'Collector Objects',
    price: 112000,
    originalPrice: 130000,
    rating: 4.9,
    reviewCount: 15,
    badge: 'Vault Selection',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 15',
    editionNumber: 15,
    claimed: 12,
    remaining: 3,
    materials: ['Solid CZ121 Forged Brass', 'Walnut Wood Handles', 'Dual Pressure Manometers'],
    provenance: 'Milan, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A sculptural direct-piston lever espresso machine that commands any kitchen or executive boardroom. Delivers velvety, 9-bar artisanal crema through manual lever modulation.',
    features: [
      'Solid forged brass boiler with 1.6 liter capacity and thermal PID stabilization',
      'American walnut hand-carved pull lever and portafilter handles',
      'Dual pressure gauges monitoring boiler temperature and real-time puck extraction'
    ],
    specs: [
      { label: 'Boiler', value: '1.6L Solid Heavy Brass' },
      { label: 'Weight', value: '14.5 kg Countertop Anchor' }
    ],
    colors: [
      { name: 'Mirrored Brass & Walnut', hex: '#B89653' }
    ]
  },
  {
    id: 'sculpted-titanium-atelier-speaker',
    sku: 'AU-AUD-012',
    name: 'Sculpted Titanium 360° Atelier Speaker',
    subtitle: 'Radial Sound Diffusion Cone with Champagne Gold Accents & 24H Battery',
    category: 'Atelier Audio',
    price: 42000,
    originalPrice: 50000,
    rating: 4.8,
    reviewCount: 30,
    badge: 'Limited Atelier',
    inStock: true,
    featured: false,
    trending: false,
    edition: 'Edition of 30',
    editionNumber: 30,
    claimed: 25,
    remaining: 5,
    materials: ['Solid Billet Titanium Shell', 'Gold PVD Inlays', 'Italian Wool Mesh'],
    provenance: 'Zurich, Switzerland',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Sculpted from aerospace titanium billet into an acoustic reflector cone that radiates room-filling high-fidelity sound uniformly across 360 degrees.',
    features: [
      'Continuous 50W RMS Class-D audiophile internal amplifier',
      'Dual opposing passive radiators preventing vibration on timber sideboards',
      'Lossless LDAC & aptX HD Bluetooth with Wi-Fi AirPlay 2 streaming'
    ],
    specs: [
      { label: 'Power', value: '50W RMS Spatial Audio' },
      { label: 'Battery', value: '24 Hours Playtime' }
    ],
    colors: [
      { name: 'Bead-Blasted Titanium', hex: '#94A3B8' }
    ]
  },
  {
    id: 'sovereign-gmt-dual-time-automatic-watch',
    sku: 'AU-HOR-013',
    name: 'Sovereign GMT Dual-Time Automatic Watch',
    subtitle: 'Ceramic 24-Hour Bezel, 72-Hour Power Reserve & Anti-Magnetic Silicon Hairspring',
    category: 'Horology',
    price: 94000,
    originalPrice: 115000,
    rating: 4.9,
    reviewCount: 27,
    badge: 'Vault Selection',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 18',
    editionNumber: 18,
    claimed: 15,
    remaining: 3,
    materials: ['904L Corrosion-Proof Steel', 'Bi-Color Zirconia Ceramic Bezel', 'Oyster-Link Bracelet'],
    provenance: 'Biel, Switzerland',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The definitive traveler’s instrument. Track your home timezone and destination simultaneously via the independent jumping local hour hand and 24-hour ceramic bezel.',
    features: [
      'True "Flyer" GMT automatic movement with independent jumping hour',
      'Scratchproof dual-tone ceramic bezel with engraved platinum numerals',
      '100-meter water resistance with screw-down crown and sapphire glass'
    ],
    specs: [
      { label: 'Movement', value: 'Automatic Calibre AU-GMT (72H Reserve)' },
      { label: 'Diameter', value: '40.5mm 904L Steel' }
    ],
    colors: [
      { name: 'Obsidian Black & Champagne', hex: '#B89653' }
    ]
  },
  {
    id: 'milano-leather-watch-trunk',
    sku: 'AU-LTH-014',
    name: 'Milano Hand-Burnished Leather Watch Trunk',
    subtitle: '6-Slot Collector Watch Safe in Hand-Burnished Calfskin with Microfiber Pillows',
    category: 'Bespoke Leather',
    price: 31500,
    originalPrice: 38000,
    rating: 5.0,
    reviewCount: 42,
    badge: 'Limited Atelier',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 30',
    editionNumber: 30,
    claimed: 27,
    remaining: 3,
    materials: ['Hand-Patinated Italian Calfskin', 'Alcantara Suede Lining', 'Solid Brass Lock'],
    provenance: 'Milan, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Guards six of your finest timepieces against dust and magnetics. Fitted with memory foam cushions that accommodate both petite vintage and oversized modern bracelets.',
    features: [
      'Solid wooden chassis hand-wrapped in museum-grade burnished leather',
      'Individual recessed compartments preventing crown-on-case contact',
      'Solid brass push-button latch lock with serialized key'
    ],
    specs: [
      { label: 'Capacity', value: '6 Timepieces up to 55mm Diameter' },
      { label: 'Lining', value: 'Anti-Tarnish Alcantara' }
    ],
    colors: [
      { name: 'Vintage Cigar Patina', hex: '#78350F' }
    ]
  },
  {
    id: 'santal-imperial-artisanal-diffuser-candle',
    sku: 'AU-PRF-015',
    name: 'Santal Impérial Artisanal Diffuser & Candle Set',
    subtitle: 'Solid Travertine Stone Vessels with Mysore Sandalwood & Cardamom Wax',
    category: 'Haute Parfumerie',
    price: 19500,
    originalPrice: 24000,
    rating: 4.8,
    reviewCount: 37,
    badge: 'Numbered Run',
    inStock: true,
    featured: false,
    trending: false,
    edition: 'Edition of 40',
    editionNumber: 40,
    claimed: 34,
    remaining: 6,
    materials: ['Solid Natural Travertine Stone', '100% Pure Soy & Beeswax', 'Pure Mysore Sandalwood Oil'],
    provenance: 'Rome & Grasse',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Carved from monolithic blocks of Italian porous travertine. Scented with sustainably sourced vintage Mysore sandalwood, cedar, and crushed cardamom pods.',
    features: [
      'Reusable hand-turned natural travertine vessels that serve as vases after use',
      '80 Hours clean candle burn time with organic untreated cotton wick',
      '200ml reeds diffuser with black rattan diffusion wands'
    ],
    specs: [
      { label: 'Candle Weight', value: '450 grams Wax' },
      { label: 'Diffuser Volume', value: '200ml Essence' }
    ],
    colors: [
      { name: 'Natural Warm Travertine', hex: '#E7E5E4' }
    ]
  },
  {
    id: 'tortoiseshell-gold-bridge-sunglasses',
    sku: 'AU-EYE-016',
    name: 'Tortoiseshell & Gold-Bridge Heritage Sunglasses',
    subtitle: 'Mazzucchelli 1849 Cellulose Acetate with 24K Gold-Plated Double Bridge',
    category: 'Eyewear & Pens',
    price: 29000,
    originalPrice: 35000,
    rating: 4.9,
    reviewCount: 26,
    badge: 'Vault Selection',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 30',
    editionNumber: 30,
    claimed: 27,
    remaining: 3,
    materials: ['Italian Mazzucchelli Bio-Acetate', '24K Gold Plated Bridge', 'Mineral Green Polarized Lenses'],
    provenance: 'Cadore, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Vintage 1960s Riviera styling modernized with bespoke double bridge architecture. Tumbled in beechwood barrels for 72 hours for an unrivaled high-gloss luster.',
    features: [
      'Custom 8mm thick Italian acetate hand-beveled around the perimeter',
      '5-barrel German rivets pinned completely through the temples',
      'Bottle-green mineral lenses with 100% UV400 and infrared protection'
    ],
    specs: [
      { label: 'Size', value: '51-21-145 Universal Fit' },
      { label: 'Lenses', value: 'Mineral Glass Category 3' }
    ],
    colors: [
      { name: 'Havana Tortoiseshell', hex: '#713F12' }
    ]
  },
  {
    id: 'kinetic-perpetual-brass-desk-orrery',
    sku: 'AU-OBJ-017',
    name: 'Kinetic Perpetual Brass Desk Orrery',
    subtitle: 'Solid Brass Mechanical Solar System with Hand-Turned Semi-Precious Stone Planets',
    category: 'Collector Objects',
    price: 56000,
    originalPrice: 68000,
    rating: 5.0,
    reviewCount: 17,
    badge: 'Collector First Edition',
    inStock: true,
    featured: true,
    trending: false,
    edition: 'Edition of 15',
    editionNumber: 15,
    claimed: 13,
    remaining: 2,
    materials: ['Hand-Polished CZ121 Brass Gears', 'Lapis, Jade & Carnelian Planets', 'Granite Base'],
    provenance: 'Black Forest, Germany',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An astronomical kinetic sculpture tracking the heliocentric orbits of the planets. Driven by a silent Swiss mechanical escapement requiring winding only once per month.',
    features: [
      'Over 60 individual interlocking brass gears providing true proportional orbital speeds',
      'Planets sculpted from genuine minerals (Lapis Lazuli Earth, Red Carnelian Mars)',
      'Black Nero Assoluto granite pedestal with laser-engraved zodiac track'
    ],
    specs: [
      { label: 'Height', value: '38cm / 15 inches' },
      { label: 'Weight', value: '8.2 kilograms' }
    ],
    colors: [
      { name: 'Solid Aged Brass', hex: '#B89653' }
    ]
  },
  {
    id: 'solid-brass-walnut-mechanical-keyboard',
    sku: 'AU-AUD-018',
    name: 'Solid Brass & Walnut 75% Mechanical Keyboard',
    subtitle: 'Machined from a Single Brass Billet with American Walnut Top Housing',
    category: 'Atelier Audio',
    price: 44900,
    originalPrice: 52000,
    rating: 4.9,
    reviewCount: 22,
    badge: 'Limited Atelier',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 20',
    editionNumber: 20,
    claimed: 17,
    remaining: 3,
    materials: ['Solid CZ121 Brass Chassis', 'American Black Walnut Wood', 'Hand-Lubed Switches'],
    provenance: 'London & Kyoto',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Weighing nearly 3 kilograms of pure mechanical resonance. Provides the deep, acoustic "thock" sought by founders and authors writing longform manuscripts.',
    features: [
      'Solid 2.85kg brass bottom weight eliminating all typing vibrations',
      'Leaf-spring gasket mounted custom PCB with per-key gold leaf contacts',
      'Hand-assembled custom linear switches factory-lubed with Krytox 205g0'
    ],
    specs: [
      { label: 'Weight', value: '2,850 grams' },
      { label: 'Angle', value: '7.5 Degrees Ergonomic Incline' }
    ],
    colors: [
      { name: 'Walnut & Brass PVD', hex: '#B89653' }
    ]
  },
  {
    id: 'geneva-guilloche-enamel-pocket-watch',
    sku: 'AU-HOR-019',
    name: 'Geneva Guilloché Enamel Pocket Timepiece',
    subtitle: 'Grand Feu Blue Enamel Dial with Hand-Engraved Hunter Case & Sterling Silver Chain',
    category: 'Horology',
    price: 86000,
    originalPrice: 105000,
    rating: 5.0,
    reviewCount: 11,
    badge: 'Numbered Run',
    inStock: true,
    featured: false,
    trending: false,
    edition: 'Edition of 12',
    editionNumber: 12,
    claimed: 10,
    remaining: 2,
    materials: ['Grand Feu Enamel', 'Sterling Silver 925 Case', 'Blued Breguet Steel Hands'],
    provenance: 'Geneva, Switzerland',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Fired in kilns at 800°C over five passes to create the deep, luminous cobalt blue Grand Feu enamel dial. Opens via a spring-loaded hunter case with hand-engraved acanthus scrollwork.',
    features: [
      'Authentic Grand Feu enamel dial that will never fade or oxidize over centuries',
      'Manual-wind Swiss pocket caliber with exhibition caseback displaying Côtes de Genève',
      'Includes solid Sterling Silver 925 Albert chain with vintage T-bar fob'
    ],
    specs: [
      { label: 'Diameter', value: '48mm Sterling Silver Hunter Case' },
      { label: 'Chain', value: 'Solid 925 Silver (35cm length)' }
    ],
    colors: [
      { name: 'Cobalt Enamel & Silver', hex: '#1E3A8A' }
    ]
  },
  {
    id: 'executive-full-grain-leather-portfolio',
    sku: 'AU-LTH-020',
    name: 'Executive Full-Grain Leather Desk Portfolio',
    subtitle: 'Tuscan Leather Writing Folio with Rhodia Notepad & Magnetic Pen Slot',
    category: 'Bespoke Leather',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewCount: 39,
    badge: 'Vault Selection',
    inStock: true,
    featured: false,
    trending: true,
    edition: 'Edition of 40',
    editionNumber: 40,
    claimed: 36,
    remaining: 4,
    materials: ['Vegetable-Tanned Tuscan Calfskin', 'Microfiber Interior', 'Solid Brass Snap'],
    provenance: 'Florence, Italy',
    exclusiveOnly: true,
    limitedEdition: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The executive companion for signing documents and sketching strategy. Features dedicated slots for iPad Pro or tablet, business cards, and fountain pen.',
    features: [
      'Accommodates A4 and Letter size legal pads with integrated side slot',
      'Hidden magnetic closure that latches with a muted, discrete sound',
      'Includes fountain-pen-friendly 90gsm French vellum notebook'
    ],
    specs: [
      { label: 'Dimensions', value: '33cm x 24.5cm Closed' },
      { label: 'Origin', value: 'Florence, Italy' }
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#854D0E' },
      { name: 'Espresso Black', hex: '#0B0C10' }
    ]
  }
];

export const SAMPLE_COLLECTOR_REVIEWS = [
  {
    id: 'au-rev-1',
    author: 'Vikramaditya S. Singhania',
    role: 'Managing Partner, Singhania Capital',
    rating: 5,
    date: '3 days ago',
    comment: 'The Tourbillon Skeleton Chronometer arrived in the Mercedes-Maybach armored handover in Jaipur within 35 minutes of order confirmation. The Grand Feu finish and mechanical resonance are museum quality.',
    verified: true
  },
  {
    id: 'au-rev-2',
    author: 'Lady Katherine Sterling',
    role: 'Private Collector & Patron',
    rating: 5,
    date: '1 week ago',
    comment: 'Finally, a maison that upholds true exclusivity. Knowing my creation is serialized and never listed on retail apps gives authentic collector value.',
    verified: true
  },
  {
    id: 'au-rev-3',
    author: 'Devendra Nath Rao',
    role: 'Chief Architect, Studio Rao',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Calacatta Marble chess set and Tuscan weekender bag are generational heirlooms. White-glove concierge delivery was flawless.',
    verified: true
  }
];
