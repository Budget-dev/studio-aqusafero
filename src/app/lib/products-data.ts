
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Domestic Products" | "Commercial Products" | "Institutional Products" | "Industrial Products" | "Components & Spare Parts" | "Filters & Chemicals";
  subcategory?: string;
  type: "Product" | "Spare Part";
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
    id: "dom-ro-alkaline",
    name: "AquaSafe Elite Alkaline RO",
    price: 18500,
    originalPrice: 24000,
    category: "Domestic Products",
    subcategory: "RO Purifiers",
    type: "Product",
    brand: "AquaSafe",
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    images: [{ url: "https://picsum.photos/seed/dom1/600/600", caption: "Elite RO" }],
    description: "Premium 9-stage RO + UV + UF + Alkaline purification system. Delivers mineral-rich healthy drinking water.",
    shortDescription: "Surgical-grade purity for modern homes.",
    stock: 25,
    sku: "AQ-DOM-001",
    specifications: [{ key: "Stages", value: "9 Stages" }, { key: "Capacity", value: "15 LPH" }]
  },
  {
    id: "com-ro-250",
    name: "Commercial RO Plant 250 LPH",
    price: 85000,
    originalPrice: 95000,
    category: "Commercial Products",
    subcategory: "RO Plants",
    type: "Product",
    brand: "AquaSafe",
    rating: 4.8,
    reviewsCount: 42,
    images: [{ url: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png", caption: "250 LPH Hub" }],
    description: "Compact high-volume RO plant for hotels, clinics, and offices. Features automatic cleaning and digital monitoring.",
    shortDescription: "High-performance hydration for business hubs.",
    stock: 5,
    sku: "AQ-COM-250",
    specifications: [{ key: "Recovery", value: "60%" }, { key: "Power", value: "1.5 kW" }]
  },
  {
    id: "inst-ro-500",
    name: "Institutional RO Hub 500 LPH",
    price: 125000,
    category: "Institutional Products",
    subcategory: "Plant Solutions",
    type: "Product",
    brand: "AquaSafe",
    rating: 4.7,
    reviewsCount: 18,
    isPopular: true,
    images: [{ url: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png", caption: "Institutional Hub" }],
    description: "Designed for schools and hospitals, this system meets global WHO standards for public safety.",
    shortDescription: "Mission-critical purity for large institutions.",
    stock: 3,
    sku: "AQ-INST-500",
    specifications: [{ key: "Daily Capacity", value: "10,000 Liters" }, { key: "Control", value: "PLC Fully Auto" }]
  },
  {
    id: "ind-ro-1000",
    name: "Industrial RO Matrix 1000 LPH",
    price: 245000,
    category: "Industrial Products",
    subcategory: "Industrial Plants",
    type: "Product",
    brand: "AquaSafe",
    rating: 5.0,
    reviewsCount: 12,
    images: [{ url: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png", caption: "1000 LPH Industrial" }],
    description: "Heavy-duty skid-mounted industrial RO plant. Optimized for 24/7 pharma and manufacturing operations.",
    shortDescription: "The gold standard for industrial water treatment.",
    stock: 2,
    sku: "AQ-IND-1K",
    specifications: [{ key: "Membrane", value: "4040 Dow Filmtec" }, { key: "Vessel", value: "FRP Grade" }]
  },
  {
    id: "spare-pump-cri",
    name: "CRI Vertical Multi-Stage Pump",
    price: 38000,
    category: "Components & Spare Parts",
    subcategory: "Pumps",
    type: "Spare Part",
    brand: "CRI",
    rating: 4.8,
    reviewsCount: 65,
    images: [{ url: "https://picsum.photos/seed/pump1/600/600", caption: "High Pressure Pump" }],
    description: "Corrosion-resistant vertical multi-stage pump for industrial RO feed systems.",
    shortDescription: "Industrial-grade pressure generator.",
    stock: 12,
    sku: "SP-CRI-V2",
    specifications: [{ key: "Phase", value: "3 Phase" }, { key: "Max Head", value: "120m" }]
  },
  {
    id: "spare-membrane-4040",
    name: "Dow Filmtec BW30-4040",
    price: 14200,
    category: "Components & Spare Parts",
    subcategory: "Membranes",
    type: "Spare Part",
    brand: "Dow",
    rating: 5.0,
    reviewsCount: 210,
    isPopular: true,
    images: [{ url: "https://picsum.photos/seed/mem1/600/600", caption: "RO Membrane" }],
    description: "Standard industrial brackish water membrane. Highest rejection rate in its class.",
    shortDescription: "Molecular precision filtration.",
    stock: 50,
    sku: "SP-DOW-4040",
    specifications: [{ key: "Material", value: "Polyamide Thin-Film" }, { key: "Surface", value: "87 sq ft" }]
  },
  {
    id: "chem-anti-5l",
    name: "ScaleGuard Antiscalant (5L)",
    price: 2800,
    category: "Filters & Chemicals",
    subcategory: "Water Treatment Chemicals",
    type: "Spare Part",
    brand: "AquaSafe",
    rating: 4.7,
    reviewsCount: 88,
    images: [{ url: "https://picsum.photos/seed/chem1/600/600", caption: "Chemical Solution" }],
    description: "High-performance antiscalant to prevent calcium and magnesium fouling in RO membranes.",
    shortDescription: "Extends membrane life by 200%.",
    stock: 100,
    sku: "CH-AS-05",
    specifications: [{ key: "Volume", value: "5 Liters" }, { key: "Dilution", value: "1:100" }]
  },
  {
    id: "filter-carbon-10",
    name: "Premium CTO Carbon Filter",
    price: 450,
    category: "Filters & Chemicals",
    subcategory: "Carbon Filters",
    type: "Spare Part",
    brand: "AquaSafe",
    rating: 4.9,
    reviewsCount: 450,
    images: [{ url: "https://picsum.photos/seed/filt1/600/600", caption: "Carbon Block" }],
    description: "Coconut shell activated carbon block for chlorine and odor removal.",
    shortDescription: "Clear, taste-neutral output.",
    stock: 500,
    sku: "CH-FIL-10C",
    specifications: [{ key: "Micron", value: "5 Micron" }, { key: "Size", value: "10 Inch" }]
  }
];
