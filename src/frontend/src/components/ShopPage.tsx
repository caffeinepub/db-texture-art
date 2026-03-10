import { Input } from "@/components/ui/input";
import {
  CATEGORIES,
  STATIC_PRODUCTS,
  type StaticProduct,
} from "@/data/products";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

interface ShopPageProps {
  onAddToCart: (product: StaticProduct) => void;
  onViewDetail: (product: StaticProduct) => void;
}

export function ShopPage({ onAddToCart, onViewDetail }: ShopPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = STATIC_PRODUCTS.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <section
      data-ocid="shop.section"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-10">
        <h1 className="mb-2 font-serif text-4xl font-bold">The Collection</h1>
        <p className="text-muted-foreground">
          Each piece is one-of-a-kind — handcrafted with care by DB.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            data-ocid="shop.search.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artworks..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-ocid="shop.category.tab"
              type="button"
              onClick={() => setCategory(cat)}
              className={[
                "rounded-sm border px-4 py-1.5 text-sm transition-colors",
                category === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div data-ocid="shop.empty_state" className="py-20 text-center">
          <p className="font-serif text-xl text-muted-foreground">
            No artworks found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i + 1}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}
