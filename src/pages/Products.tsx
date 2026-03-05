import { useSearchParams } from "react-router-dom";
import { products, Category, SubCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const subCategories: { label: string; value: SubCategory; category: Category }[] = [
  { label: "Bed", value: "bed", category: "furniture" },
  { label: "Sofa", value: "sofa", category: "furniture" },
  { label: "Table", value: "table", category: "furniture" },
  { label: "Fridge", value: "fridge", category: "appliances" },
  { label: "Washing Machine", value: "washing-machine", category: "appliances" },
  { label: "TV", value: "tv", category: "appliances" },
];

const Products = () => {
  const [params] = useSearchParams();
  const categoryParam = params.get("category") as Category | null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(categoryParam);
  const [activeSub, setActiveSub] = useState<SubCategory | null>(null);

  let filtered = products;
  if (activeCategory) filtered = filtered.filter((p) => p.category === activeCategory);
  if (activeSub) filtered = filtered.filter((p) => p.subCategory === activeSub);

  const visibleSubs = activeCategory
    ? subCategories.filter((s) => s.category === activeCategory)
    : subCategories;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold">
          {activeCategory ? `${activeCategory === "furniture" ? "Furniture" : "Appliances"}` : "All Products"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {filtered.length} items available for rent
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={!activeCategory ? "default" : "outline"}
            onClick={() => { setActiveCategory(null); setActiveSub(null); }}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={activeCategory === "furniture" ? "default" : "outline"}
            onClick={() => { setActiveCategory("furniture"); setActiveSub(null); }}
          >
            Furniture
          </Button>
          <Button
            size="sm"
            variant={activeCategory === "appliances" ? "default" : "outline"}
            onClick={() => { setActiveCategory("appliances"); setActiveSub(null); }}
          >
            Appliances
          </Button>
          <div className="mx-2 w-px bg-border" />
          {visibleSubs.map((s) => (
            <Button
              key={s.value}
              size="sm"
              variant={activeSub === s.value ? "default" : "outline"}
              onClick={() => setActiveSub(activeSub === s.value ? null : s.value)}
            >
              {s.label}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products found for this filter.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
