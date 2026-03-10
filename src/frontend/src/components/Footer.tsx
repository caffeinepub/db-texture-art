import { Instagram } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-foreground py-12 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-serif text-2xl font-bold">
              DB Texture Art
            </h3>
            <p className="text-sm leading-relaxed text-background/60">
              Original handcrafted texture art pieces — each one a unique
              tactile masterpiece.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2">
              {(["home", "shop", "about", "contact"] as const).map((pg) => (
                <li key={pg}>
                  <button
                    data-ocid={`footer.${pg}.link`}
                    type="button"
                    onClick={() => onNavigate(pg)}
                    className="text-sm capitalize text-background/60 transition-colors hover:text-background"
                  >
                    {pg}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Follow the Art
            </p>
            <div className="flex gap-4">
              <a
                data-ocid="footer.instagram.link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 transition-colors hover:text-background"
              >
                <Instagram className="h-5 w-5" aria-label="Instagram" />
              </a>
              <a
                data-ocid="footer.pinterest.link"
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 transition-colors hover:text-background"
              >
                <span className="sr-only">Pinterest</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-background/40">
              Custom commissions welcome.
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center">
          <p className="text-xs text-background/40">
            © 2026 DB Texture Art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
