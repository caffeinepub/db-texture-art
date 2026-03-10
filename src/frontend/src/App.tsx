import { AboutSection } from "@/components/AboutSection";
import { AdminPage } from "@/components/AdminPage";
import { CartDrawer, type CartItem } from "@/components/CartDrawer";
import { CheckoutPage } from "@/components/CheckoutPage";
import { ContactSection } from "@/components/ContactSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { ShopPage } from "@/components/ShopPage";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Toaster } from "@/components/ui/sonner";
import type { StaticProduct } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Page = "home" | "shop" | "about" | "contact" | "admin" | "checkout";

export default function App() {
  const { actor } = useActor();
  const [page, setPage] = useState<Page>("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [detailProduct, setDetailProduct] = useState<StaticProduct | null>(
    null,
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (actor) {
      actor
        .isCallerAdmin()
        .then(setIsAdmin)
        .catch(() => setIsAdmin(false));
    }
  }, [actor]);

  const addToCart = (
    product: StaticProduct,
    variant: { size?: string } = {},
    qty = 1,
  ) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.variant.size === variant.size,
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + qty,
        };
        return updated;
      }
      return [...prev, { product, variant, quantity: qty }];
    });
    toast.success(`${product.name} added to cart`);
    // Sync to backend
    if (actor) {
      actor
        .addToCart(
          product.id,
          variant as { size?: string; color?: string },
          BigInt(qty),
        )
        .catch(() => {});
    }
  };

  const updateQty = (productId: bigint, qty: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i,
      ),
    );
  };

  const removeFromCart = (productId: bigint) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setPage("checkout");
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />

      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigate}
        currentPage={page}
        isAdmin={isAdmin}
      />

      <main className="flex-1">
        {page === "home" && (
          <>
            <HeroSection onShop={() => navigate("shop")} />
            <FeaturedSection
              onAddToCart={(p) => addToCart(p)}
              onViewDetail={setDetailProduct}
              onShop={() => navigate("shop")}
            />
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}

        {page === "shop" && (
          <ShopPage
            onAddToCart={(p) => addToCart(p)}
            onViewDetail={setDetailProduct}
          />
        )}

        {page === "about" && (
          <div>
            <AboutSection />
            <TestimonialsSection />
          </div>
        )}

        {page === "contact" && <ContactSection />}

        {page === "admin" && isAdmin && <AdminPage />}

        {page === "checkout" && (
          <CheckoutPage
            items={cartItems}
            onBack={() => navigate("home")}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </main>

      {page !== "checkout" && <Footer onNavigate={navigate} />}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
