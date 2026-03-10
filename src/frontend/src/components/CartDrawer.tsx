import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { type StaticProduct, formatPrice } from "@/data/products";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export interface CartItem {
  product: StaticProduct;
  variant: { size?: string };
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: bigint, qty: number) => void;
  onRemove: (productId: bigint) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        data-ocid="cart.sheet"
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {items.length > 0 && (
              <span className="font-sans text-sm font-normal text-muted-foreground">
                ({items.length} item{items.length !== 1 ? "s" : ""})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            <p className="font-serif text-lg text-muted-foreground">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Discover our collection of handcrafted texture art.
            </p>
            <Button
              data-ocid="cart.continue_shopping.button"
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {items.map((item, i) => (
                <div
                  key={`${item.product.id.toString()}-${item.variant.size ?? ""}`}
                  data-ocid={`cart.item.${i + 1}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-20 w-20 flex-shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-serif text-sm font-semibold">
                      {item.product.name}
                    </h4>
                    {item.variant.size && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.variant.size}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        data-ocid={`cart.qty_decrease.button.${i + 1}`}
                        type="button"
                        onClick={() =>
                          onUpdateQty(
                            item.product.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="rounded-sm border border-border p-1 transition-colors hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        data-ocid={`cart.qty_increase.button.${i + 1}`}
                        type="button"
                        onClick={() =>
                          onUpdateQty(item.product.id, item.quantity + 1)
                        }
                        className="rounded-sm border border-border p-1 transition-colors hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        data-ocid={`cart.remove.delete_button.${i + 1}`}
                        type="button"
                        onClick={() => onRemove(item.product.id)}
                        className="ml-2 rounded-sm p-1 text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold">
                  ${(total / 100).toFixed(0)}
                </span>
              </div>
              <Separator />
              <Button
                data-ocid="cart.checkout.primary_button"
                type="button"
                size="lg"
                className="w-full bg-primary text-primary-foreground"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button
                data-ocid="cart.continue_shopping.button"
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
