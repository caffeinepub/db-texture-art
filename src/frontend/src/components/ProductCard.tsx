import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type StaticProduct, formatPrice } from "@/data/products";
import { Eye, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: StaticProduct;
  index: number;
  onAddToCart: (product: StaticProduct) => void;
  onViewDetail: (product: StaticProduct) => void;
}

export function ProductCard({
  product,
  index,
  onAddToCart,
  onViewDetail,
}: ProductCardProps) {
  return (
    <div
      data-ocid={`products.item.${index}`}
      className="group relative bg-card rounded-sm overflow-hidden shadow-xs hover:shadow-art transition-all duration-500"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs tracking-wider uppercase">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            data-ocid={`products.view.button.${index}`}
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => onViewDetail(product)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-foreground font-semibold text-lg">
            {formatPrice(product.price)}
          </span>
          <Button
            data-ocid={`products.add_to_cart.button.${index}`}
            size="sm"
            type="button"
            onClick={() => onAddToCart(product)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
