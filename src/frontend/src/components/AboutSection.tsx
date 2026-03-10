export function AboutSection() {
  return (
    <section data-ocid="about.section" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
              The Artist
            </p>
            <h2 className="font-serif text-4xl font-bold mb-6">
              About DB Texture Art
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Born from a deep love of tactile beauty, DB Texture Art creates
              original mixed-media paintings that go beyond the visual —
              inviting you to feel the art with your eyes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each piece is hand-built layer by layer using palette knives,
              natural pigments, sand, and acrylic mediums. No two pieces are
              alike — every canvas carries the unique marks of its creation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether gracing a living room, an office, or a gallery wall, DB
              Texture Art brings depth, warmth, and a quiet sense of wonder to
              any space.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/seed/studio1/400/500"
              alt="Studio"
              className="rounded-sm object-cover w-full h-48 shadow-art"
            />
            <img
              src="https://picsum.photos/seed/studio2/400/500"
              alt="Process"
              className="rounded-sm object-cover w-full h-48 shadow-art mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
