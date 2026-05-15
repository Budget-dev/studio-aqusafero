
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Domestic Products" | "Commercial Products" | "Spares and Components" | "Filters and Chemicals";
  subcategory: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  image: string;
  description: string;
  discount?: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  deliveryEstimate: string;
  specs: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  // Domestic Products
  {
    id: "dom-101",
    name: "SmartGuard Pro RO Purifier",
    price: 349,
    originalPrice: 420,
    category: "Domestic Products",
    subcategory: "RO Water Purifiers",
    rating: 4.9,
    reviewsCount: 245,
    isNew: true,
    image: "https://picsum.photos/seed/purifier1/800/1000",
    discount: 15,
    stockStatus: "In Stock",
    deliveryEstimate: "2-3 Days",
    description: "Next-gen alkaline RO purifier with IoT connectivity and real-time TDS monitoring for the modern home.",
    specs: { "Purification": "7 Stage", "Capacity": "12L", "Warranty": "2 Years", "Power": "36W" }
  },
  {
    id: "dom-102",
    name: "AquaCrystal Under-Sink System",
    price: 299,
    category: "Domestic Products",
    subcategory: "Under-sink Systems",
    rating: 4.8,
    reviewsCount: 180,
    image: "https://picsum.photos/seed/purifier2/800/1000",
    stockStatus: "In Stock",
    deliveryEstimate: "3-4 Days",
    description: "Compact under-sink system that saves space while delivering hospital-grade water purity.",
    specs: { "Type": "Direct Flow", "Filters": "Composite", "Flow Rate": "1.5L/min" }
  },
  // Commercial Products
  {
    id: "comm-201",
    name: "Industrial RO 500 LPH Plant",
    price: 4500,
    originalPrice: 5200,
    category: "Commercial Products",
    subcategory: "Industrial RO Plants",
    rating: 5.0,
    reviewsCount: 42,
    isNew: true,
    image: "https://picsum.photos/seed/plant1/800/1000",
    discount: 12,
    stockStatus: "In Stock",
    deliveryEstimate: "5-7 Days",
    description: "High-capacity water treatment plant designed for large-scale production facilities and corporate offices.",
    specs: { "Capacity": "500 LPH", "Automation": "Fully Auto PLC", "Material": "SS 304" }
  },
  {
    id: "comm-202",
    name: "HospitalPurity UV Matrix",
    price: 1800,
    category: "Commercial Products",
    subcategory: "Hospital Water Systems",
    rating: 4.9,
    reviewsCount: 28,
    image: "https://picsum.photos/seed/plant2/800/1000",
    stockStatus: "Low Stock",
    deliveryEstimate: "4-5 Days",
    description: "Multi-stage UV sterilization unit optimized for medical environments and sterile processing.",
    specs: { "UV Intensity": "40mJ/cm2", "Port Size": "1.5 inch", "Bulb Life": "9000 Hours" }
  },
  // Spares
  {
    id: "spare-301",
    name: "TFC Ultra-Pure Membrane",
    price: 120,
    category: "Spares and Components",
    subcategory: "RO Membranes",
    rating: 4.7,
    reviewsCount: 512,
    image: "https://picsum.photos/seed/spare1/800/1000",
    stockStatus: "In Stock",
    deliveryEstimate: "1-2 Days",
    description: "High-rejection thin-film composite membrane for maximum removal of heavy metals.",
    specs: { "Rejection Rate": "98%", "Size": "1812-75 GPD", "Cert": "NSF 58" }
  },
  {
    id: "spare-302",
    name: "HyperForce Booster Pump",
    price: 85,
    category: "Spares and Components",
    subcategory: "Pumps",
    rating: 4.8,
    reviewsCount: 320,
    image: "https://picsum.photos/seed/spare2/800/1000",
    stockStatus: "In Stock",
    deliveryEstimate: "2-3 Days",
    description: "Silent operation high-pressure pump compatible with all standard domestic RO units.",
    specs: { "Pressure": "100 PSI", "Current": "1.2A", "Voltage": "24V DC" }
  },
  // Filters & Chemicals
  {
    id: "filt-401",
    name: "CrystalCarbon Block Filter",
    price: 45,
    category: "Filters and Chemicals",
    subcategory: "Carbon Filters",
    rating: 4.9,
    reviewsCount: 890,
    image: "https://picsum.photos/seed/filt1/800/1000",
    stockStatus: "In Stock",
    deliveryEstimate: "1-2 Days",
    description: "Premium activated coconut shell carbon block for superior chlorine and VOC removal.",
    specs: { "Life": "6000 Gallons", "Micron": "5 Micron", "Standard": "Universal 10\"" }
  },
  {
    id: "filt-402",
    name: "Antiscalant ScaleGuard Pro",
    price: 65,
    category: "Filters and Chemicals",
    subcategory: "Cleaning Chemicals",
    rating: 4.6,
    reviewsCount: 156,
    image: "https://picsum.photos/seed/filt2/800/1000",
    stockStatus: "In Stock",
    deliveryEstimate: "2-3 Days",
    description: "Liquid antiscalant solution that prevents membrane fouling and extends plant life by 40%.",
    specs: { "Weight": "5 Kg", "pH": "Neutral", "Concentration": "100%" }
  }
];
