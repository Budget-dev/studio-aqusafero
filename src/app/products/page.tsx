import { Suspense } from "react";
import { ProductsCatalog } from "@/components/commerce/products-catalog";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}