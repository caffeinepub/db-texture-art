import { Button } from "@/components/ui/button";
import { STATIC_PRODUCTS, type StaticProduct } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface FeaturedSectionProps {
  onAddToCart: (product: StaticProduct) => void;
  onViewDetail: (product: StaticProduct) => void;
  onShop: () => void;
}

export function FeaturedSection({
  onAddToCart,
  onViewDetail,
  onShop,
}: FeaturedSectionProps) {
  const featured = STATIC_PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <section
      data-ocid="featured.section"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
          Handpicked
        </p>
        <h2 className="font-serif text-4xl font-bold mb-4">
          Featured Artworks
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Each piece is a unique original — no reproductions, no prints. Own
          something truly one-of-a-kind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featured.map((product, i) => (
          <ProductCard
            key={product.id.toString()}
            product={product}
            index={i + 1}
            onAddToCart={onAddToCart}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

      <div className="text-center">
        <Button
          data-ocid="featured.view_all.button"
          variant="outline"
          size="lg"
          onClick={onShop}
          className="px-10"
        >
          View Full Collection
        </Button>
      </div>
    </section>
  );
}
