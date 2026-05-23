
// This file is retained for type definitions only. 
// All mock data has been removed and moved to the Admin Hub / Firestore.

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  image: string;
  description: string;
  capacity?: string;
  discount?: number;
  stockStatus: string;
  deliveryEstimate: string;
  specs: Record<string, string>;
  videoUrl?: string;
}

export const PRODUCTS: Product[] = [];
