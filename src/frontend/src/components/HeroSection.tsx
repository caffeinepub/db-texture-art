import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onShop: () => void;
}

export function HeroSection({ onShop }: HeroSectionProps) {
  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.15 0.03 55) 0%, oklch(0.22 0.04 60) 50%, oklch(0.18 0.05 45) 100%)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/texture/1600/900"
          alt="Texture Art"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.15 0.03 55 / 0.85) 0%, oklch(0.15 0.03 55 / 0.5) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-xl">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Handcrafted Originals
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Where Texture
            <span className="block text-accent">Meets Art</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10 font-sans">
            Original handcrafted texture art pieces by DB — each one a unique
            tactile masterpiece crafted with passion and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              data-ocid="hero.shop.primary_button"
              size="lg"
              onClick={onShop}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-base tracking-wide font-sans"
            >
              Explore Collection
            </Button>
            <Button
              data-ocid="hero.about.secondary_button"
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-base tracking-wide font-sans"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full border-2 border-accent/60 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-sm">
          <span className="text-accent font-serif text-lg font-bold leading-none">
            DB
          </span>
          <span className="text-white/60 text-[9px] tracking-wider uppercase">
            Original
          </span>
        </div>
      </div>
    </section>
  );
}
