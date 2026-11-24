import { Product, MaisonCategory } from '../types';

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop';

export const MAISON_CATEGORIES: {
  name: MaisonCategory;
  tagline: string;
  itemCount: number;
  image: string;
}[] = [
  {
    name: 'Horology',
    tagline: 'Swiss Tourbillons & In-House Complications',
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Bespoke Leather',
    tagline: 'Tuscan Full-Grain & Saddle-Stitched Trunks',
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Haute Parfumerie',
    tagline: 'Aged Wild Oud Extraits & Rare Attars',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Eyewear & Pens',
    tagline: 'Beta-Titanium & 18K Nib Instruments',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Collector Objects',
    tagline: 'Calacatta Marble & Solid Brass Kinetic Arts',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Atelier Audio',
    tagline: 'Planar Magnetic & Billet Titanium Acoustics',
    itemCount: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  // 1. Submersible Automatic 42mm Carbotech™ (FLAGSHIP 1)
  {
    id: 'submersible-carbotech-42mm',
    sku: 'AU-HOR-01',
    name: 'Submersible Automatic 42mm Carbotech™',
    architecturalTitle: 'SUBMERSIBLE TOURBILLON / 42MM TITANIUM & CARBOTECH™',
    subtitle: 'Ultra-light carbon fiber composite casing with in-house Calibre P.900 movement',
    category: 'Horology',
    price: 145000,
    originalPrice: 195000,
    rating: 5.0,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    lumeImage: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'
    ],
    description:
      'Engineered in Neuchâtel and finished with an ultra-rigid Carbotech™ composite bezel. Features a matte olive military ceramic ring, Super-LumiNova® indices glowing electric green in low light, and a 3-day power reserve. Strictly limited to 10 serialized exemplars globally.',
    badge: 'Collector First Edition',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 10',
    editionLabel: 'Edition of 10',
    editionNumber: 10,
    claimed: 7,
    remaining: 3,
    accentColor: '#5C6942', // Tactical Olive
    accentName: 'Tactical Olive',
    materials: [
      'Carbotech™ Carbon Matrix Casing',
      'Grade-5 Titanium DLC Skeleton Caseback',
      'Super-LumiNova® Grade X1 Lume Dial',
      'Corundum Double-Curved Sapphire Crystal'
    ],
    provenance: 'Neuchâtel & Geneva, Switzerland',
    features: [
      '300M Tested Water Resistance',
      'Bespoke Waterproof Caoutchouc Accordion Strap',
      'Twin-Barrel 72-Hour Automatic Reserve',
      'Serialized Certificate stamped with Atelier seal'
    ],
    specs: [
      { label: 'Movement', value: 'Calibre AU-900 Automatic' },
      { label: 'Diameter', value: '42.0 mm' },
      { label: 'Case Material', value: 'Carbotech™ + Grade-5 Titanium' },
      { label: 'Bezel', value: 'Unidirectional rotating ceramic ring' },
      { label: 'Power Reserve', value: '72 Hours (Dual Barrel)' },
      { label: 'Glass', value: '2.5mm Anti-Reflective Sapphire' }
    ],
    colors: [
      { name: 'Tactical Olive & Carbotech', hex: '#5C6942' },
      { name: 'Pitch Obsidian Black', hex: '#0B0C0E' }
    ],
    exclusiveOnly: true,
    limitedEdition: true,
    campaignVideo: {
      title: 'Submersible Carbotech™ Engineering',
      subtitle: 'Exploded-view mechanical architecture & carbon fiber matrix',
      duration: '01:45'
    }
  },

  // 2. Luminor Marina Carbotech™ 44mm (FLAGSHIP 2)
  {
    id: 'luminor-marina-carbotech-44mm',
    sku: 'AU-HOR-02',
    name: 'Luminor Marina Carbotech™ 44mm',
    architecturalTitle: 'LUMINOR MARINA / 44MM CARBOTECH™ AZURE',
    subtitle: 'Signature patented crown-protecting bridge with deep ocean cobalt dial',
    category: 'Horology',
    price: 132000,
    originalPrice: 178000,
    rating: 4.9,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?q=80&w=1200&auto=format&fit=crop',
    lumeImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-71dfabb1a7b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'
    ],
    description:
      'The definitive architectural timepiece. Layered carbon fiber creates a unique woodgrain pattern on every single watch. Paired with a sun-brushed cobalt azure sandwich dial and luminous Arabic numerals. Zero retail availability.',
    badge: 'Numbered Run',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 15',
    editionLabel: 'Edition of 15',
    editionNumber: 15,
    claimed: 11,
    remaining: 4,
    accentColor: '#3E82C4', // Cobalt Azure
    accentName: 'Cobalt Azure',
    materials: [
      'High-Density Carbotech™ Sheets',
      'Titanium Caseback with Black DLC Coating',
      'Azure Blue Sandwich Dial Plate',
      'Fluorocarbon Scuba Strap'
    ],
    provenance: 'Le Locle, Switzerland',
    features: [
      'Iconic Lever Safety Crown Guard',
      'Sandwich Dial Construction for Max Night Lume',
      'Incabloc® Anti-Shock Protection',
      'Laser-Etched Individual Vault Serial'
    ],
    specs: [
      { label: 'Movement', value: 'Calibre AU-801 Mechanical' },
      { label: 'Diameter', value: '44.0 mm' },
      { label: 'Strap', value: 'Sportech™ Azure with Ecru stitching' },
      { label: 'Weight', value: '98g (Ultra Lightweight)' }
    ],
    colors: [
      { name: 'Cobalt Azure', hex: '#3E82C4' },
      { name: 'Matte Carbon', hex: '#14161A' }
    ],
    exclusiveOnly: true,
    limitedEdition: true,
    campaignVideo: {
      title: 'Luminor Marina Crown Bridge Assembly',
      subtitle: 'Compression-molded carbon layers & hydraulic crown lock',
      duration: '02:10'
    }
  },

  // 3. Palazzo Full-Grain Tuscan Weekender Trunk (FLAGSHIP 3)
  {
    id: 'palazzo-tuscan-weekender-trunk',
    sku: 'AU-LEA-01',
    name: 'Palazzo Full-Grain Tuscan Weekender Trunk',
    architecturalTitle: 'PALAZZO TUSCAN TRUNK / FULL-GRAIN VACHETTA',
    subtitle: 'Hand-burnished vegetable-tanned leather with hand-cast solid brass hardware',
    category: 'Bespoke Leather',
    price: 64500,
    originalPrice: 89000,
    rating: 5.0,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    lumeImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ],
    description:
      'Curated from third-generation Santa Croce tanneries in Tuscany. Drum-dyed with organic chestnut and mimosa tannins, this weekender trunk is hand-stitched with waxed linen thread and reinforced with solid brass studs and dual combination locks.',
    badge: 'Private Reserve',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 20',
    editionLabel: 'Edition of 20',
    editionNumber: 20,
    claimed: 16,
    remaining: 4,
    accentColor: '#C26D38', // Burnished Amber
    accentName: 'Burnished Amber',
    materials: [
      '3.2mm Tuscan Vachetta Cowhide',
      'Solid Cast Architectural Brass Latches',
      'Alcantara Suede Interior Lining',
      'Hand-Waxed Fil Au Chinois Thread'
    ],
    provenance: 'Florence, Italy',
    features: [
      'Internal Padded 16" MacBook Compartment',
      'Dedicated Watch Roll Snap-In Sleeve',
      'Reinforced Brass Feet & Corner Caps',
      'Personalized Blind-Debossed Monogram Included'
    ],
    specs: [
      { label: 'Dimensions', value: '52 x 30 x 26 cm' },
      { label: 'Capacity', value: '44 Litres' },
      { label: 'Weight', value: '2.6 kg' },
      { label: 'Origin', value: 'Santa Croce sull’Arno, Italy' }
    ],
    colors: [
      { name: 'Burnished Amber Leather', hex: '#C26D38' },
      { name: 'Espresso Tuscan Brown', hex: '#3B2317' }
    ],
    exclusiveOnly: true,
    limitedEdition: true,
    campaignVideo: {
      title: 'Tuscan Leather Craftsmanship',
      subtitle: 'Hand-burnished edges & saddle-stitch leather trunk assembly',
      duration: '01:30'
    }
  },

  // 4. Oud Royale Extrait de Parfum (100ml) (FLAGSHIP 4)
  {
    id: 'oud-royale-extrait-de-parfum',
    sku: 'AU-PAR-01',
    name: 'Oud Royale Extrait de Parfum (100ml)',
    architecturalTitle: 'OUD ROYALE EXTRAIT / 100ML CRYSTAL FLACON',
    subtitle: 'Distilled from 35-year aged wild Assam Aquilaria agallocha heartwood',
    category: 'Haute Parfumerie',
    price: 28900,
    originalPrice: 42000,
    rating: 5.0,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    lumeImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop'
    ],
    description:
      'A nocturnal masterwork of high perfumery. 38% concentration Extrait de Parfum blending pure wild Assam Oud, Taif damascene rose oil, ambergris tincture, and smoked birch tar. Bottled in hand-polished French crystal with solid brass cap.',
    badge: 'Vault Selection',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 30',
    editionLabel: 'Edition of 30',
    editionNumber: 30,
    claimed: 24,
    remaining: 6,
    accentColor: '#782C3A', // Imperial Burgundy
    accentName: 'Imperial Burgundy',
    materials: [
      '35-Year Wild Assam Agarwood Distillate',
      'Natural Ambergris & Mysore Sandalwood',
      'Mouth-Blown French Heavy Crystal Flacon',
      'Solid 24K Gold-Leaf Electroplated Stopper'
    ],
    provenance: 'Grasse, France & Assam, India',
    features: [
      'Pure Extrait Concentration (38% Essential Oil)',
      '18-Hour Skin Longevity & Exceptional Sillage',
      'Casketed in Lacquered Solid Walnut Presentation Box',
      'Individual Batch Number Engraved on Flacon Base'
    ],
    specs: [
      { label: 'Volume', value: '100 ml (3.4 fl. oz.)' },
      { label: 'Concentration', value: 'Extrait de Parfum (38%)' },
      { label: 'Top Notes', value: 'Taif Rose, Cardamom Pods, Bergamot' },
      { label: 'Heart Notes', value: 'Aged Assam Oud, Castoreum, Saffron' },
      { label: 'Base Notes', value: 'White Ambergris, Birch Tar, Mysore Sandal' }
    ],
    colors: [
      { name: 'Imperial Burgundy Flacon', hex: '#782C3A' },
      { name: 'Smoked Obsidian Crystal', hex: '#0B0C0E' }
    ],
    exclusiveOnly: true,
    limitedEdition: true,
    campaignVideo: {
      title: 'The Extraction of Assam Oud',
      subtitle: 'Hydro-distillation in copper stills & crystal flacon cutting',
      duration: '01:50'
    }
  },

  // 5. Aurelia Reference Planar Magnetic Headphones (FLAGSHIP 5)
  {
    id: 'aurelia-reference-planar-headphones',
    sku: 'AU-AUD-01',
    name: 'Aurelia Reference Planar Magnetic Headphones',
    architecturalTitle: 'PLANAR REFERENCE / GRADE-5 TITANIUM ACOUSTICS',
    subtitle: '100mm ultra-thin nanometer planar drivers with aerospace titanium chassis',
    category: 'Atelier Audio',
    price: 68500,
    originalPrice: 95000,
    rating: 4.9,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    lumeImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop'
    ],
    description:
      'Engineered for master audio purists. Open-back architecture with acoustically invisible stealth magnets and 100mm sub-micron diaphragms. Every headband is milled from a single block of Grade-5 Titanium and wrapped in breathable lambskin.',
    badge: 'Limited Atelier',
    inStock: true,
    featured: true,
    trending: true,
    edition: 'Edition of 25',
    editionLabel: 'Edition of 25',
    editionNumber: 25,
    claimed: 21,
    remaining: 4,
    accentColor: '#465669', // Titanium Slate
    accentName: 'Titanium Slate',
    materials: [
      'CNC Milled Grade-5 Titanium Yokes',
      '100mm Sub-Micron Planar Driver Membrane',
      'Solid Walnut Outer Acoustic Resonator Grille',
      'Perforated Lambskin & Memory Foam Cushions'
    ],
    provenance: 'Sendai, Japan & Zurich, Switzerland',
    features: [
      'Ultra-Wide 5Hz – 55,000Hz Frequency Response',
      'Detachable OCC Single-Crystal Silver-Plated Cable',
      'Zero Resonance Open-Back Backplate Waveguide',
      'Hard Anodized Aluminum Flight Case Included'
    ],
    specs: [
      { label: 'Transducer', value: '100mm Planar Magnetic' },
      { label: 'Impedance', value: '32 Ohms (High Sensitivity)' },
      { label: 'Weight', value: '385g' },
      { label: 'Connector', value: 'Balanced 4.4mm Pentaconn + 6.35mm' }
    ],
    colors: [
      { name: 'Titanium Slate & Carbon', hex: '#465669' },
      { name: 'Obsidian Matte', hex: '#0B0C0E' }
    ],
    exclusiveOnly: true,
    limitedEdition: true,
    campaignVideo: {
      title: 'Planar Magnetic Diaphragm Physics',
      subtitle: 'Sub-nanometer conductive traces & symmetric flux field',
      duration: '01:25'
    }
  },

  // 6. Kyoto Japanese Titanium Aviator Frames
  {
    id: 'kyoto-titanium-aviator-frames',
    sku: 'AU-EYE-01',
    name: 'Kyoto Japanese Titanium Aviator Frames',
    architecturalTitle: 'KYOTO AVIATOR / JAPANESE BETA-TITANIUM',
    subtitle: 'Flex-beta titanium wire rims with Barberini ultra-thin mineral glass lenses',
    category: 'Eyewear & Pens',
    price: 34500,
    originalPrice: 48000,
    rating: 4.9,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Forged in Sabae, Fukui Prefecture. Seamless featherweight Beta-Titanium wireframe weighing only 16 grams. Barberini mineral crystal polarized lenses with 10-layer anti-reflective emerald coating.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 25',
    editionLabel: 'Edition of 25',
    editionNumber: 25,
    claimed: 19,
    remaining: 6,
    accentColor: '#2E6B56', // Emerald Forest
    accentName: 'Emerald Forest',
    materials: ['Japanese Beta-Titanium Wire', 'Barberini Polarized Mineral Glass', 'Solid Titanium Nosepads'],
    provenance: 'Sabae, Fukui, Japan',
    features: ['16g Ultra-Light Ergonomics', 'Laser-etched Serial Number on Inner Temple', 'Wooden Presentation Case'],
    specs: [
      { label: 'Weight', value: '16.2 grams' },
      { label: 'Lens Width', value: '58 mm' },
      { label: 'Bridge', value: '14 mm' },
      { label: 'UV Protection', value: '100% UV400 + Polarized' }
    ],
    colors: [{ name: 'Emerald Forest Tint', hex: '#2E6B56' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 7. Calacatta Marble & Solid Brass Chess Set
  {
    id: 'calacatta-marble-brass-chess-set',
    sku: 'AU-OBJ-01',
    name: 'Calacatta Marble & Solid Brass Chess Set',
    architecturalTitle: 'CALACATTA GOLD / MARBLE & SOLID BRASS CHESS',
    subtitle: 'Hand-carved architectural chessmen from Italian Calacatta Gold and Belgian Nero Marquina',
    category: 'Collector Objects',
    price: 78000,
    originalPrice: 110000,
    rating: 5.0,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200&auto=format&fit=crop'],
    description:
      'A sculpture of strategic geometry. The 18kg board is cut from a seamless slab of Italian Calacatta Gold with brass inlays. Chessmen are precision lathe-turned from solid brass and blackened bronze.',
    badge: 'Collector First Edition',
    inStock: true,
    edition: 'Edition of 15',
    editionLabel: 'Edition of 15',
    editionNumber: 15,
    claimed: 12,
    remaining: 3,
    accentColor: '#5C6942', // Tactical Olive
    accentName: 'Tactical Olive',
    materials: ['Italian Calacatta Gold Marble', 'Solid Lathe-Turned Brass', 'Weighted Leather Bases'],
    provenance: 'Carrara, Italy',
    features: ['18kg Solid Architectural Board', 'Individual Suede Compartment Box', 'Felt-lined Protective Underside'],
    specs: [
      { label: 'Board Size', value: '45 x 45 x 3.5 cm' },
      { label: 'King Height', value: '105 mm' },
      { label: 'Total Weight', value: '18.4 kg' }
    ],
    colors: [{ name: 'Calacatta White & Solid Brass', hex: '#5C6942' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 8. Heritage Moonphase Rose-Gold Dress Watch
  {
    id: 'heritage-moonphase-rose-gold',
    sku: 'AU-HOR-03',
    name: 'Heritage Moonphase Rose-Gold Dress Watch',
    architecturalTitle: 'HERITAGE MOONPHASE / 18K ROSE GOLD CALIBRE',
    subtitle: 'Astronomical moonphase complication with Grand Feu enamel dial',
    category: 'Horology',
    price: 118000,
    originalPrice: 165000,
    rating: 5.0,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Classical watchmaking at its apex. Features an authentic vitreous Grand Feu enamel dial fired at 850°C. The moonphase disc is cut from blue gold with laser-ablated stars and 24K gold foil moon.',
    badge: 'Private Reserve',
    inStock: true,
    edition: 'Edition of 12',
    editionLabel: 'Edition of 12',
    editionNumber: 12,
    claimed: 10,
    remaining: 2,
    accentColor: '#C26D38', // Burnished Amber
    accentName: 'Burnished Amber',
    materials: ['18K Rose Gold Casing', 'Grand Feu Vitreous Enamel', 'Mississippi Alligator Strap'],
    provenance: 'Geneva, Switzerland',
    features: ['True Astronomical Moonphase Complication', 'Exhibition Caseback with 21K Gold Rotor', '50M Water Resistance'],
    specs: [
      { label: 'Calibre', value: 'AU-712 Moonphase Automatic' },
      { label: 'Diameter', value: '39.5 mm' },
      { label: 'Thickness', value: '9.8 mm (Ultra Thin)' }
    ],
    colors: [{ name: 'Rose Gold & Amber', hex: '#C26D38' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 9. Florence Vegetable-Tanned Leather Briefcase
  {
    id: 'florence-vegetable-tanned-briefcase',
    sku: 'AU-LEA-02',
    name: 'Florence Vegetable-Tanned Leather Briefcase',
    architecturalTitle: 'FLORENCE ATTACHÉ / SADDLE-STITCHED COWHIDE',
    subtitle: 'Structured double-gusset diplomat attaché with solid brass coded clasp',
    category: 'Bespoke Leather',
    price: 52000,
    originalPrice: 72000,
    rating: 4.8,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Rigid architectural diplomat case with hand-molded leather corners, heavy brass combination dials, and twin accordion chambers lined in British bridle hide.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 25',
    editionLabel: 'Edition of 25',
    editionNumber: 25,
    claimed: 21,
    remaining: 4,
    accentColor: '#782C3A', // Imperial Burgundy
    accentName: 'Imperial Burgundy',
    materials: ['4mm Bridle Leather', 'Solid English Brass Lock', 'Green Baize Document Sleeve'],
    provenance: 'Florence, Italy',
    features: ['Double-Gusset Expanding Capacity', 'Custom Key & Digital Combination Lock'],
    specs: [
      { label: 'Dimensions', value: '42 x 31 x 11 cm' },
      { label: 'Weight', value: '2.1 kg' }
    ],
    colors: [{ name: 'Deep Burgundy Wine', hex: '#782C3A' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 10. Ambre Nocturne Private Reserve Scent
  {
    id: 'ambre-nocturne-private-reserve',
    sku: 'AU-PAR-02',
    name: 'Ambre Nocturne Private Reserve Scent',
    architecturalTitle: 'AMBRE NOCTURNE / PURE AMBERGRIS RESERVE',
    subtitle: 'Smoked labdanum, aged benzoin, and vintage ambergris aged 12 years in oak barrels',
    category: 'Haute Parfumerie',
    price: 24500,
    originalPrice: 35000,
    rating: 5.0,
    reviewCount: 23,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop'],
    description:
      'An intoxicating warmth of molten resin, Madagascar vanilla bean, dark Spanish cistus, and rare ambergris matured in French oak cask cellars.',
    badge: 'Private Reserve',
    inStock: true,
    edition: 'Edition of 35',
    editionLabel: 'Edition of 35',
    editionNumber: 35,
    claimed: 30,
    remaining: 5,
    accentColor: '#3E82C4', // Cobalt Azure
    accentName: 'Cobalt Azure',
    materials: ['Natural Ambergris', 'French Oak Cask Aged Extract', 'Cobalt-Tinted Heavy Crystal'],
    provenance: 'Grasse, France',
    features: ['Cask-Conditioned for 24 Months', '32% Extrait Concentration'],
    specs: [{ label: 'Volume', value: '100 ml' }, { label: 'Longevity', value: '16+ Hours' }],
    colors: [{ name: 'Cobalt Blue Crystal', hex: '#3E82C4' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 11. Mont-Blanc Obsidian & 18K Nib Fountain Pen
  {
    id: 'mont-blanc-obsidian-fountain-pen',
    sku: 'AU-EYE-02',
    name: 'Mont-Blanc Obsidian & 18K Nib Fountain Pen',
    architecturalTitle: 'OBSIDIAN FOUNTAIN PEN / 18K SOLID GOLD NIB',
    subtitle: 'Machined from single volcanic obsidian core with rhodium-coated 18K hand-ground nib',
    category: 'Eyewear & Pens',
    price: 39900,
    originalPrice: 56000,
    rating: 5.0,
    reviewCount: 16,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Crafted for historic signatures. Turned from natural volcanic glass with guilloché barrel accents and an 18K two-tone solid gold nib hand-adjusted under 20x magnification.',
    badge: 'Limited Atelier',
    inStock: true,
    edition: 'Edition of 20',
    editionLabel: 'Edition of 20',
    editionNumber: 20,
    claimed: 16,
    remaining: 4,
    accentColor: '#465669', // Titanium Slate
    accentName: 'Titanium Slate',
    materials: ['Solid Natural Obsidian', '18K Bicolor Solid Gold Nib', 'Piston Vacuum Filling System'],
    provenance: 'Hamburg, Germany',
    features: ['Individual Nib Tuning Certificate', 'Handmade Crystal Inkwell Included'],
    specs: [{ label: 'Nib Size', value: 'Medium (M) Hand-Polished' }, { label: 'Weight', value: '54 grams' }],
    colors: [{ name: 'Obsidian Black', hex: '#465669' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 12. Barista Pro Solid Brass Lever Espresso Machine
  {
    id: 'barista-pro-brass-lever-espresso',
    sku: 'AU-OBJ-02',
    name: 'Barista Pro Solid Brass Lever Espresso Machine',
    architecturalTitle: 'BARISTA PRO / SOLID BRASS PISTON LEVER',
    subtitle: 'Direct manual piston lever extraction with dual copper boilers and walnut toggles',
    category: 'Collector Objects',
    price: 112000,
    originalPrice: 155000,
    rating: 5.0,
    reviewCount: 14,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Hand-assembled in Milan. Mirror-polished solid yellow brass with spring-assisted manual lever producing uncompromised 9-bar artisanal espresso pressure.',
    badge: 'Vault Selection',
    inStock: true,
    edition: 'Edition of 15',
    editionLabel: 'Edition of 15',
    editionNumber: 15,
    claimed: 11,
    remaining: 4,
    accentColor: '#C26D38', // Burnished Amber
    accentName: 'Burnished Amber',
    materials: ['Mirror-Polished Cast Brass', 'Dual Copper Boilers', 'American Walnut Handles'],
    provenance: 'Milan, Italy',
    features: ['Manual Spring Lever Pressure Profiling', 'Dual Commercial PID Temperature Sensors'],
    specs: [{ label: 'Boiler Capacity', value: '2.8 Litres' }, { label: 'Weight', value: '26.5 kg' }],
    colors: [{ name: 'Polished Brass & Walnut', hex: '#C26D38' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 13. Sculpted Titanium 360° Atelier Speaker
  {
    id: 'sculpted-titanium-atelier-speaker',
    sku: 'AU-AUD-02',
    name: 'Sculpted Titanium 360° Atelier Speaker',
    architecturalTitle: 'TITANIUM 360° / HIGH-FIDELITY ATELIER SPEAKER',
    subtitle: 'Monolithic CNC titanium enclosure with omnidirectional acoustic lens',
    category: 'Atelier Audio',
    price: 42000,
    originalPrice: 58000,
    rating: 4.8,
    reviewCount: 20,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Formed from a monolithic billet of aerospace titanium. Projects a seamless 360-degree soundfield via an acoustic dispersion cone and dual passive radiators.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 30',
    editionLabel: 'Edition of 30',
    editionNumber: 30,
    claimed: 24,
    remaining: 6,
    accentColor: '#2E6B56', // Emerald Forest
    accentName: 'Emerald Forest',
    materials: ['CNC Aerospace Grade Titanium', 'Beryllium Dome Tweeter', 'Walnut Base'],
    provenance: 'Copenhagen, Denmark',
    features: ['Lossless AirPlay 2 & Tidal Connect', '12-Hour Battery + Balanced XLR In'],
    specs: [{ label: 'Power Output', value: '120 Watts RMS' }, { label: 'Frequency', value: '38Hz – 28kHz' }],
    colors: [{ name: 'Brushed Titanium Slate', hex: '#2E6B56' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 14. Sovereign GMT Dual-Time Automatic Watch
  {
    id: 'sovereign-gmt-dual-time-watch',
    sku: 'AU-HOR-04',
    name: 'Sovereign GMT Dual-Time Automatic Watch',
    architecturalTitle: 'SOVEREIGN GMT / 41MM DUAL-TIME ZONE',
    subtitle: 'Bidirectional 24-hour ceramic bezel with independent jumping hour hand',
    category: 'Horology',
    price: 94000,
    originalPrice: 130000,
    rating: 4.9,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'],
    description:
      'The international voyager’s essential companion. High-precision automatic GMT caliber with deep azure and obsidian ceramic bezel, tracking two time zones concurrently.',
    badge: 'Collector First Edition',
    inStock: true,
    edition: 'Edition of 18',
    editionLabel: 'Edition of 18',
    editionNumber: 18,
    claimed: 15,
    remaining: 3,
    accentColor: '#3E82C4', // Cobalt Azure
    accentName: 'Cobalt Azure',
    materials: ['904L Austenitic Steel', 'Bicolor Ceramic Bezel', 'Sapphire Cyclops Crystal'],
    provenance: 'Geneva, Switzerland',
    features: ['Independent Jumping Local Hour Hand', '70-Hour Chronometer Reserve'],
    specs: [{ label: 'Calibre', value: 'AU-GMT 3186' }, { label: 'Diameter', value: '41.0 mm' }],
    colors: [{ name: 'Azure & Obsidian', hex: '#3E82C4' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 15. Milano Suede-Lined 6-Slot Watch Vault
  {
    id: 'milano-suede-watch-vault',
    sku: 'AU-LEA-03',
    name: 'Milano Suede-Lined 6-Slot Watch Vault',
    architecturalTitle: 'MILANO VAULT / 6-SLOT HOROLOGICAL CASE',
    subtitle: 'Florentine leather shell with cushioned Alcantara pillows and biometric lock',
    category: 'Bespoke Leather',
    price: 31500,
    originalPrice: 45000,
    rating: 4.9,
    reviewCount: 25,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Engineered to safeguard fine horology during international travel. Holds 6 full-sized timepieces on individual ergonomic cushions separated by rigid partition walls.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 30',
    editionLabel: 'Edition of 30',
    editionNumber: 30,
    claimed: 26,
    remaining: 4,
    accentColor: '#5C6942', // Tactical Olive
    accentName: 'Tactical Olive',
    materials: ['Full-Grain Calfskin', 'Italian Alcantara Velvet', 'Solid Brass Keyed Latch'],
    provenance: 'Milan, Italy',
    features: ['Individual Removable Cushions', 'Reinforced Rigid Shell Structure'],
    specs: [{ label: 'Capacity', value: '6 Timepieces up to 48mm' }, { label: 'Dimensions', value: '34 x 22 x 9 cm' }],
    colors: [{ name: 'Olive Green & Alcantara', hex: '#5C6942' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 16. Santal Impérial Travertine Diffuser Set
  {
    id: 'santal-imperial-travertine-diffuser',
    sku: 'AU-PAR-03',
    name: 'Santal Impérial Travertine Diffuser Set',
    architecturalTitle: 'SANTAL IMPÉRIAL / ROMAN TRAVERTINE DIFFUSER',
    subtitle: 'Monolithic Roman travertine vessel with cold-pressed Mysore sandalwood essence',
    category: 'Haute Parfumerie',
    price: 19500,
    originalPrice: 28000,
    rating: 4.8,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Quarried from Tivoli, Rome. The porous natural travertine stone vessel passively diffuses pure sandalwood, dried fig leaf, and cedar resin throughout private quarters.',
    badge: 'Limited Atelier',
    inStock: true,
    edition: 'Edition of 40',
    editionLabel: 'Edition of 40',
    editionNumber: 40,
    claimed: 34,
    remaining: 6,
    accentColor: '#C26D38', // Burnished Amber
    accentName: 'Burnished Amber',
    materials: ['Honed Roman Travertine Stone', 'Cold-Pressed Botanical Essences'],
    provenance: 'Tivoli, Italy',
    features: ['Includes 250ml Oil Refill Vessel', 'Solid Brass Dropper Included'],
    specs: [{ label: 'Vessel Weight', value: '2.8 kg' }, { label: 'Diffusion Span', value: '6 Months Continuous' }],
    colors: [{ name: 'Warm Travertine Amber', hex: '#C26D38' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 17. Heritage Mazzucchelli Acetate Sunglasses
  {
    id: 'heritage-mazzucchelli-sunglasses',
    sku: 'AU-EYE-03',
    name: 'Heritage Mazzucchelli Acetate Sunglasses',
    architecturalTitle: 'MAZZUCCHELLI / 10MM SCULPTED ACETATE',
    subtitle: 'Thick 10mm Japanese-Italian cured acetate with 7-barrel custom hinges',
    category: 'Eyewear & Pens',
    price: 29000,
    originalPrice: 42000,
    rating: 4.9,
    reviewCount: 21,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Cured for 6 months to prevent warpage. 10mm architectural acetate sculpted with custom bevels and riveted 7-barrel hinges for supreme stability.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 30',
    editionLabel: 'Edition of 30',
    editionNumber: 30,
    claimed: 25,
    remaining: 5,
    accentColor: '#782C3A', // Imperial Burgundy
    accentName: 'Imperial Burgundy',
    materials: ['Mazzucchelli 1849 Cured Acetate', 'Rivet-Pinned 7-Barrel Hinges', 'Dark Wine Tinted Lenses'],
    provenance: 'Varese, Italy',
    features: ['Includes Hand-Stitched Leather Case', 'Serialized Laser Marking'],
    specs: [{ label: 'Front Width', value: '148 mm' }, { label: 'Lens Height', value: '46 mm' }],
    colors: [{ name: 'Deep Tortoise & Burgundy', hex: '#782C3A' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 18. Kinetic Perpetual Brass Desk Orrery
  {
    id: 'kinetic-perpetual-brass-orrery',
    sku: 'AU-OBJ-03',
    name: 'Kinetic Perpetual Brass Desk Orrery',
    architecturalTitle: 'ORRERY KINETIC / SOLID BRASS PLANETARY MODEL',
    subtitle: 'Clockwork-driven solar system model with hand-turned lapis lazuli and brass gears',
    category: 'Collector Objects',
    price: 56000,
    originalPrice: 79000,
    rating: 5.0,
    reviewCount: 16,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Demonstrates the orbital periods of Mercury, Venus, Earth, and Mars via 42 hand-cut brass gears powered by a precision silent spring escapement.',
    badge: 'Collector First Edition',
    inStock: true,
    edition: 'Edition of 15',
    editionLabel: 'Edition of 15',
    editionNumber: 15,
    claimed: 12,
    remaining: 3,
    accentColor: '#465669', // Titanium Slate
    accentName: 'Titanium Slate',
    materials: ['42 Hand-Cut Solid Brass Gears', 'Lapis Lazuli Earth Globe', 'Solid Granite Base'],
    provenance: 'Oxford, United Kingdom',
    features: ['Accurate Heliocentric Planetary Gear Ratios', 'Hand-Blown Glass Cloche Included'],
    specs: [{ label: 'Height', value: '38 cm' }, { label: 'Weight', value: '6.4 kg' }],
    colors: [{ name: 'Brass & Slate Granite', hex: '#465669' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 19. Solid Brass & Walnut 75% Mechanical Keyboard
  {
    id: 'brass-walnut-mechanical-keyboard',
    sku: 'AU-AUD-03',
    name: 'Solid Brass & Walnut 75% Mechanical Keyboard',
    architecturalTitle: 'ATELIER KEYBOARD / 75% SOLID BRASS & WALNUT',
    subtitle: 'Gasket-mounted acoustic dampening with hand-lubricated mechanical switches',
    category: 'Atelier Audio',
    price: 44900,
    originalPrice: 62000,
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop'],
    description:
      'A tactile and acoustic masterpiece. Features a CNC-machined 2.2kg solid brass bottom weight, North American black walnut case, and poron gasket dampening tuned for deep, resonant keypress acoustics.',
    badge: 'Private Reserve',
    inStock: true,
    edition: 'Edition of 20',
    editionLabel: 'Edition of 20',
    editionNumber: 20,
    claimed: 17,
    remaining: 3,
    accentColor: '#2E6B56', // Emerald Forest
    accentName: 'Emerald Forest',
    materials: ['Solid Black Walnut Wood', '2.2kg Polished Brass Weight Plate', 'FR4 Acoustic PCB'],
    provenance: 'Kyoto, Japan',
    features: ['Hot-Swappable 5-Pin Switch Sockets', 'Custom Braided Coiled Aviator Cable'],
    specs: [{ label: 'Layout', value: '75% Compact (84 Keys)' }, { label: 'Weight', value: '3.1 kg' }],
    colors: [{ name: 'Walnut & Polished Brass', hex: '#2E6B56' }],
    exclusiveOnly: true,
    limitedEdition: true
  },

  // 20. Executive Tuscan Leather Desk Portfolio
  {
    id: 'executive-tuscan-desk-portfolio',
    sku: 'AU-LEA-04',
    name: 'Executive Tuscan Leather Desk Portfolio',
    architecturalTitle: 'TUSCAN PORTFOLIO / EXECUTIVE A4 DESK FOLDER',
    subtitle: 'Vachetta leather writing portfolio with solid brass pen loop and archival notepad',
    category: 'Bespoke Leather',
    price: 18500,
    originalPrice: 26000,
    rating: 4.8,
    reviewCount: 33,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'],
    description:
      'Crafted from supple Tuscan vegetable-tanned leather. Holds standard A4 or legal writing pads, executive business cards, and has an integrated solid brass loop for your fountain pen.',
    badge: 'Numbered Run',
    inStock: true,
    edition: 'Edition of 40',
    editionLabel: 'Edition of 40',
    editionNumber: 40,
    claimed: 35,
    remaining: 5,
    accentColor: '#3E82C4', // Cobalt Azure
    accentName: 'Cobalt Azure',
    materials: ['Full-Grain Italian Vachetta', 'French Linen Stitching', 'Brass Hardware'],
    provenance: 'Florence, Italy',
    features: ['Includes 100gsm Fountain-Pen-Friendly Archival Notepad', 'Blind-Embossed Atelier Seal'],
    specs: [{ label: 'Dimensions', value: '32 x 24 cm (Closed)' }, { label: 'Fits', value: 'A4 & US Letter' }],
    colors: [{ name: 'Classic Cognac Azure', hex: '#3E82C4' }],
    exclusiveOnly: true,
    limitedEdition: true
  }
];

export const SAMPLE_COLLECTOR_REVIEWS = [
  {
    author: 'Countess Eleonora di Valmarana',
    title: 'Private Horology Collector',
    location: 'Venice, Italy',
    comment:
      'The Submersible Carbotech was hand-delivered to our private palazzo within 48 hours under armored escort. The carbon fiber matrix and night luminescence are peerless. The authenticity certificate is recorded on a private titanium plate.',
    rating: 5,
    verifiedCollector: true,
    date: '14 November 2026'
  },
  {
    author: 'Vikramaditya S. Singhania',
    title: 'Founding Partner, Singhania Capital',
    location: 'Jaipur, India',
    comment:
      'Knowing that Maison Aurelia pieces are strictly unavailable on Amazon, Flipkart, or any marketplace makes this a genuine collector’s privilege. The live GPS tracking of the Maybach delivery unit in Jaipur was seamless.',
    rating: 5,
    verifiedCollector: true,
    date: '02 November 2026'
  },
  {
    author: 'Lord Julian Sterling',
    title: 'Architectural Historian',
    location: 'St. James’s, London',
    comment:
      'The Calacatta Marble Chess Set and Tuscan Weekender Trunk represent the highest tier of European atelier work. No mass production, no discount compromises. Simply timeless execution.',
    rating: 5,
    verifiedCollector: true,
    date: '28 October 2026'
  }
];
