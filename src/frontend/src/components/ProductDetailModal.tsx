import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type StaticProduct, formatPrice } from "@/data/products";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductDetailModalProps {
  product: StaticProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: StaticProduct,
    variant: { size?: string },
    qty: number,
  ) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent
        data-ocid="product_detail.dialog"
        className="max-w-3xl overflow-hidden p-0"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-72 w-full object-cover md:h-full"
            />
          </div>

          <div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
            <div>
              <DialogHeader className="mb-4">
                <Badge
                  variant="secondary"
                  className="mb-2 w-fit text-xs uppercase tracking-wider"
                >
                  {product.category}
                </Badge>
                <DialogTitle className="font-serif text-2xl font-bold">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              <p className="mb-4 text-2xl font-semibold text-foreground">
                {formatPrice(product.price)}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {product.variants.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold tracking-wide">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.size ?? i}
                        data-ocid={`product_detail.size.toggle.${i + 1}`}
                        type="button"
                        onClick={() => setSelectedVariant(i)}
                        className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${
                          selectedVariant === i
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 flex items-center gap-3">
                <p className="text-sm font-semibold tracking-wide">Qty</p>
                <div className="flex items-center rounded-sm border border-border">
                  <button
                    data-ocid="product_detail.qty.decrease.button"
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 transition-colors hover:bg-muted"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-4 text-sm font-semibold">{qty}</span>
                  <button
                    data-ocid="product_detail.qty.increase.button"
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="p-2 transition-colors hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <Button
              data-ocid="product_detail.add_to_cart.primary_button"
              type="button"
              size="lg"
              onClick={() => {
                onAddToCart(
                  product,
                  product.variants[selectedVariant] ?? {},
                  qty,
                );
                onClose();
              }}
              className="w-full gap-2 bg-primary text-primary-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart — {formatPrice(product.price * BigInt(qty))}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
