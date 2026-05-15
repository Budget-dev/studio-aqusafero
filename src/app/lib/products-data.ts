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
  capacity?: string;
  discount?: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  deliveryEstimate: string;
  specs: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  // Domestic Products (Small Scale)
  {
    id: "dom-101",
    name: "Premium Technical RO Purifier",
    price: 999,
    originalPrice: 2999,
    category: "Domestic Products",
    subcategory: "RO Water Purifiers",
    rating: 4.9,
    reviewsCount: 312,
    isNew: true,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2004_11_05%20PM.png",
    capacity: "15 LPH",
    description: "Advanced engineering meets household safety. This high-performance RO unit features technical 10-stage purification, copper-enriched mineralization, and a precision-engineered filtration membrane for unmatched water purity.",
    stockStatus: "In Stock",
    deliveryEstimate: "1-2 Days",
    specs: { 
      "Technology": "RO + UV + UF + Copper", 
      "Stages": "10 Stage Purification", 
      "Tank Material": "Food Grade Technical ABS", 
      "Power Consumption": "40W High Efficiency",
      "Compliance": "ISO 9001:2015 Certified"
    }
  },
  {
    id: "dom-102",
    name: "Under Sink RO Systems",
    price: 18500,
    category: "Domestic Products",
    subcategory: "Under-sink Systems",
    rating: 4.8,
    reviewsCount: 180,
    image: "https://picsum.photos/seed/purifier2/800/1000",
    capacity: "10-20 LPH",
    description: "Compact & efficient under-sink RO for kitchens and small spaces. Saves counter space while delivering high purity.",
    stockStatus: "In Stock",
    deliveryEstimate: "3-4 Days",
    specs: { "Type": "Direct Flow", "Filters": "Composite", "Flow Rate": "1.5L/min" }
  },
  {
    id: "dom-103",
    name: "RO + UV + UF Purifiers",
    price: 14500,
    category: "Domestic Products",
    subcategory: "Multi-stage Purifiers",
    rating: 4.7,
    reviewsCount: 95,
    image: "https://picsum.photos/seed/purifier3/800/1000",
    capacity: "15-25 LPH",
    description: "Advanced 3/4 stage purification for enhanced water quality. Perfect for high TDS groundwater sources.",
    stockStatus: "In Stock",
    deliveryEstimate: "2-3 Days",
    specs: { "Tech": "RO+UV+UF", "Recovery": "40%", "TDS Range": "Up to 2000" }
  },
  // Commercial Products (Medium to Large Scale)
  {
    id: "comm-201",
    name: "250 LPH RO Plant",
    price: 85000,
    category: "Commercial Products",
    subcategory: "Industrial RO Plants",
    rating: 5.0,
    reviewsCount: 42,
    image: "https://picsum.photos/seed/plant1/800/1000",
    capacity: "250 LPH",
    description: "Suitable for schools, clinics and small commercial establishments. Fully automated with high-quality membrane systems.",
    stockStatus: "In Stock",
    deliveryEstimate: "5-7 Days",
    specs: { "Capacity": "250 LPH", "Automation": "Fully Auto PLC", "Material": "SS 304" }
  },
  {
    id: "comm-202",
    name: "500 LPH RO Plant",
    price: 125000,
    category: "Commercial Products",
    subcategory: "Industrial RO Plants",
    rating: 4.9,
    reviewsCount: 28,
    image: "https://picsum.photos/seed/plant2/800/1000",
    capacity: "500 LPH",
    description: "Ideal for medium sized industries, hotels & institutions. Heavy-duty design for consistent performance.",
    stockStatus: "In Stock",
    deliveryEstimate: "7-10 Days",
    specs: { "UV Intensity": "40mJ/cm2", "Port Size": "1.5 inch", "Bulb Life": "9000 Hours" }
  },
  {
    id: "comm-203",
    name: "1000 LPH RO Plant",
    price: 210000,
    category: "Commercial Products",
    subcategory: "Industrial RO Plants",
    rating: 5.0,
    reviewsCount: 15,
    image: "https://picsum.photos/seed/plant3/800/1000",
    capacity: "1000 LPH",
    description: "High performance solution for large institutions & industries. Advanced monitoring and control systems.",
    stockStatus: "In Stock",
    deliveryEstimate: "10-14 Days",
    specs: { "Control": "Remote IoT", "Membranes": "Dow Filmtec", "Power": "3-Phase" }
  },
  // Spares
  {
    id: "spare-301",
    name: "RO Membranes",
    price: 2500,
    category: "Spares and Components",
    subcategory: "Membranes",
    rating: 4.7,
    reviewsCount: 512,
    image: "https://picsum.photos/seed/spare1/800/1000",
    description: "High rejection RO membranes with TFC technology for maximum durability and purity.",
    stockStatus: "In Stock",
    deliveryEstimate: "1-2 Days",
    specs: { "Rejection Rate": "98%", "Size": "1812-75 GPD", "Cert": "NSF 58" }
  },
  {
    id: "spare-302",
    name: "Dosing Pumps",
    price: 4500,
    category: "Spares and Components",
    subcategory: "Pumps",
    rating: 4.8,
    reviewsCount: 320,
    image: "https://picsum.photos/seed/spare2/800/1000",
    description: "Accurate dosing for better efficiency. Compatible with major industrial RO plant brands.",
    stockStatus: "In Stock",
    deliveryEstimate: "2-3 Days",
    specs: { "Pressure": "100 PSI", "Current": "1.2A", "Voltage": "24V DC" }
  }
];