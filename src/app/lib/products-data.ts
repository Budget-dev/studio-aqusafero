
// This file contains the primary product data for the Aqua Safe Catalog
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Commercial" | "Domestic";
  type: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isPopular?: boolean;
  images: { url: string; caption: string }[];
  description: string;
  shortDescription: string;
  stock: number;
  sku: string;
  specifications: { key: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "as-ro-500",
    name: "Industrial RO Plant 500 LPH",
    price: 145000,
    originalPrice: 165000,
    category: "Commercial",
    type: "Plant",
    brand: "Aqua Safe",
    rating: 4.9,
    reviewsCount: 24,
    isNew: true,
    isPopular: true,
    images: [{ url: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png", caption: "500 LPH Unit" }],
    description: "Heavy-duty 500 Liters Per Hour Reverse Osmosis plant designed for 24/7 industrial operations.",
    shortDescription: "High-volume industrial purification hub.",
    stock: 5,
    sku: "AS-RO-500-IND",
    specifications: [{ key: "Capacity", value: "500 LPH" }, { key: "Membrane", value: "Dow Filmtec" }]
  },
  {
    id: "as-dom-alkaline",
    name: "Premium Alkaline Purifier",
    price: 18500,
    originalPrice: 22000,
    category: "Domestic",
    type: "Purifier",
    brand: "Aqua Safe",
    rating: 4.8,
    reviewsCount: 156,
    images: [{ url: "https://picsum.photos/seed/aqua4/600/400", caption: "Alkaline System" }],
    description: "9-Stage RO + UV + UF + Alkaline purification system for mineral-rich drinking water.",
    shortDescription: "Mineral-rich healthy drinking water.",
    stock: 50,
    sku: "AS-DOM-ALK",
    specifications: [{ key: "Stages", value: "9 Stages" }, { key: "PH Level", value: "8.5 - 9.5" }]
  },
  {
    id: "as-mem-4040",
    name: "Dow Filmtec 4040 Membrane",
    price: 12500,
    category: "Commercial",
    type: "Spare",
    brand: "Dow",
    rating: 5.0,
    reviewsCount: 89,
    isPopular: true,
    images: [{ url: "https://picsum.photos/seed/membrane1/600/400", caption: "RO Membrane" }],
    description: "Industry standard brackish water membrane for commercial RO systems.",
    shortDescription: "Gold-standard molecular filtration.",
    stock: 100,
    sku: "BW30-4040",
    specifications: [{ key: "Size", value: "40x40 inch" }, { key: "Type", value: "Brackish Water" }]
  },
  {
    id: "as-uv-chamb",
    name: "Stainless Steel UV Chamber",
    price: 4500,
    category: "Domestic",
    type: "Spare",
    brand: "Aqua Safe",
    rating: 4.7,
    reviewsCount: 42,
    images: [{ url: "https://picsum.photos/seed/uvchamb/600/400", caption: "UV Chamber" }],
    description: "High-grade SS-304 UV disinfection chamber with Philips lamp integration.",
    shortDescription: "Surgical-grade bacteria elimination.",
    stock: 25,
    sku: "AS-UV-SS-304",
    specifications: [{ key: "Material", value: "SS-304" }, { key: "Lamp", value: "11W Philips" }]
  },
  {
    id: "as-soft-500",
    name: "Auto-Water Softener 500 LPH",
    price: 48000,
    category: "Commercial",
    type: "Plant",
    brand: "Aqua Safe",
    rating: 4.6,
    reviewsCount: 18,
    images: [{ url: "https://picsum.photos/seed/softener/600/400", caption: "Water Softener" }],
    description: "Fully automatic ion-exchange water softener for hotels and laundry services.",
    shortDescription: "Zero-scaling soft water technology.",
    stock: 8,
    sku: "AS-SOFT-500",
    specifications: [{ key: "Control", value: "Automatic Multiport" }, { key: "Resin", value: "Indion 225NA" }]
  },
  {
    id: "as-filter-cart",
    name: "Spun Filter Set (Pack of 4)",
    price: 850,
    originalPrice: 1200,
    category: "Domestic",
    type: "Spare",
    brand: "Aqua Safe",
    rating: 4.9,
    reviewsCount: 312,
    images: [{ url: "https://picsum.photos/seed/filters/600/400", caption: "Filter Cartridges" }],
    description: "5-Micron high density polypropylene spun filters for pre-filtration.",
    shortDescription: "Universal 10-inch pre-filter protection.",
    stock: 500,
    sku: "AS-PP-SPUN-4",
    specifications: [{ key: "Micron", value: "5 Micron" }, { key: "Qty", value: "4 Units" }]
  },
  {
    id: "as-pump-v",
    name: "CRI Vertical Multi-Stage Pump",
    price: 32000,
    category: "Commercial",
    type: "Spare",
    brand: "CRI",
    rating: 4.8,
    reviewsCount: 12,
    images: [{ url: "https://picsum.photos/seed/pumpv/600/400", caption: "High Pressure Pump" }],
    description: "High-pressure vertical centrifugal pump for industrial RO feed systems.",
    shortDescription: "Powerhouse for industrial pressure.",
    stock: 3,
    sku: "CRI-V-2HP",
    specifications: [{ key: "Phase", value: "3 Phase" }, { key: "Power", value: "2.0 HP" }]
  },
  {
    id: "as-chem-anti",
    name: "Membrane Antiscalant (5L)",
    price: 2400,
    category: "Commercial",
    type: "Spare",
    brand: "Aqua Safe",
    rating: 4.7,
    reviewsCount: 56,
    images: [{ url: "https://picsum.photos/seed/chem/600/400", caption: "Antiscalant Chemical" }],
    description: "Industrial strength antiscalant to prevent calcium and magnesium scaling on membranes.",
    shortDescription: "Extended membrane life formula.",
    stock: 45,
    sku: "AS-ANTI-5L",
    specifications: [{ key: "Volume", value: "5 Liters" }, { key: "Dilution", value: "1:100" }]
  }
];
