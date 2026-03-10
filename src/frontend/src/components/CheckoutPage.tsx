import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CartItem } from "./CartDrawer";

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function CheckoutPage({
  items,
  onBack,
  onOrderComplete,
}: CheckoutPageProps) {
  const { actor } = useActor();
  const { identity, login } = useInternetIdentity();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);

  const total = items.reduce(
    (s, i) => s + Number(i.product.price) * i.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      login();
      return;
    }
    if (!actor) {
      toast.error("Not connected");
      return;
    }
    setSubmitting(true);
    try {
      const addr = `${form.name}, ${form.address}, ${form.city}, ${form.country}`;
      for (const item of items) {
        await actor.addToCart(
          item.product.id,
          item.variant as { size?: string; color?: string },
          BigInt(item.quantity),
        );
      }
      const id = await actor.placeOrder(addr);
      setOrderId(id);
      onOrderComplete();
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId !== null) {
    return (
      <div
        data-ocid="checkout.success_state"
        className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"
      >
        <CheckCircle className="mb-6 h-16 w-16 text-accent" />
        <h2 className="mb-3 font-serif text-3xl font-bold">Order Confirmed!</h2>
        <p className="mb-2 text-muted-foreground">
          Thank you for your purchase, {form.name}.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Order #{orderId.toString()} — We’ll be in touch soon.
        </p>
        <Button
          data-ocid="checkout.continue.primary_button"
          type="button"
          onClick={onBack}
          className="bg-primary text-primary-foreground"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <button
        data-ocid="checkout.back.button"
        type="button"
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Cart
      </button>

      <h1 className="mb-8 font-serif text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-5 md:col-span-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                data-ocid="checkout.name.input"
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                data-ocid="checkout.email.input"
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Textarea
                data-ocid="checkout.address.textarea"
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Street address"
                className="mt-1 resize-none"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                data-ocid="checkout.city.input"
                id="city"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                data-ocid="checkout.country.input"
                id="country"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          {!identity && (
            <p className="rounded-sm bg-muted p-3 text-sm text-muted-foreground">
              You’ll need to{" "}
              <button
                type="button"
                onClick={login}
                className="font-semibold underline"
              >
                sign in
              </button>{" "}
              to complete your order.
            </p>
          )}

          <Button
            data-ocid="checkout.place_order.submit_button"
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Placing Order...
              </>
            ) : (
              `Place Order — $${(total / 100).toFixed(0)}`
            )}
          </Button>
        </form>

        <div className="md:col-span-2">
          <div className="rounded-sm bg-muted/40 p-5">
            <h3 className="mb-4 font-serif text-lg font-semibold">
              Order Summary
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product.id.toString()}-${item.variant.size ?? ""}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-14 w-14 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.product.name}
                    </p>
                    {item.variant.size && (
                      <p className="text-xs text-muted-foreground">
                        {item.variant.size}
                      </p>
                    )}
                    <p className="text-sm">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatPrice(item.product.price * BigInt(item.quantity))}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">
                ${(total / 100).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
