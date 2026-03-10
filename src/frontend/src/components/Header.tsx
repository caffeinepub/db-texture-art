import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  isAdmin: boolean;
}

export function Header({
  cartCount,
  onCartOpen,
  onNavigate,
  currentPage,
  isAdmin,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
    ...(isAdmin ? [{ label: "Admin", page: "admin" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            data-ocid="header.logo.link"
            type="button"
            onClick={() => onNavigate("home")}
            className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              DB Texture Art
            </span>
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Handcrafted Originals
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.page}
                data-ocid={`header.${link.page}.link`}
                type="button"
                onClick={() => onNavigate(link.page)}
                className={`text-sm tracking-wide transition-colors hover:text-foreground ${
                  currentPage === link.page
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {identity ? (
              <Button
                data-ocid="header.logout.button"
                type="button"
                variant="ghost"
                size="sm"
                onClick={clear}
                className="hidden gap-1 text-muted-foreground md:flex"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                data-ocid="header.login.button"
                type="button"
                variant="ghost"
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className="hidden gap-1 text-muted-foreground md:flex"
              >
                <User className="h-4 w-4" />
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            )}

            <Button
              data-ocid="header.cart.button"
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCartOpen}
              className="relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-accent p-0 text-xs text-accent-foreground">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-3 border-t border-border bg-background px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.page}
              data-ocid={`header.mobile.${link.page}.link`}
              type="button"
              onClick={() => {
                onNavigate(link.page);
                setMobileOpen(false);
              }}
              className={`py-1 text-left text-sm ${
                currentPage === link.page
                  ? "font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          {identity ? (
            <button
              data-ocid="header.mobile.logout.button"
              type="button"
              onClick={clear}
              className="py-1 text-left text-sm text-muted-foreground"
            >
              Logout
            </button>
          ) : (
            <button
              data-ocid="header.mobile.login.button"
              type="button"
              onClick={login}
              className="py-1 text-left text-sm text-muted-foreground"
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </header>
  );
}
