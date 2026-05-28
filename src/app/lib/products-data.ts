
export interface Product {
  id: string;
  name: string;
  price: number;
  offerPrice?: number;
  category: "Domestic Products" | "Commercial Products" | "Institutional Products" | "Industrial Products" | "Components & Spare Parts" | "Filters & Chemicals";
  subcategory?: string;
  type: "Product" | "Spare Part";
  brand: string;
  rating: number;
  reviewsCount?: number;
  isNew?: boolean;
  isPopular?: boolean;
  images: { url: string; caption: string }[];
  description: string;
  shortDescription: string;
  stock: number;
  sku: string;
  specifications: { key: string; value: string }[];
}

// Mock data removed. Catalog now fetches from Firestore.
export const PRODUCTS: Product[] = [];
