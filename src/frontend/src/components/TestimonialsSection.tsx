const testimonials = [
  {
    id: "t1",
    quote:
      "The piece I ordered exceeded every expectation. The texture is incredible — it catches the light differently at every hour. Our living room has never felt so complete.",
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://picsum.photos/seed/person1/80/80",
  },
  {
    id: "t2",
    quote:
      "I gifted a DB Texture Art piece to my mother and she cried when she opened it. Absolutely stunning craftsmanship. It’s the most beautiful thing on her wall.",
    name: "James Holloway",
    location: "London, UK",
    avatar: "https://picsum.photos/seed/person2/80/80",
  },
  {
    id: "t3",
    quote:
      "What strikes me most is that every piece feels alive. The layers, the depth — it’s not just art, it’s an experience. DB is a true artist.",
    name: "Layla Al-Rashid",
    location: "Dubai, UAE",
    avatar: "https://picsum.photos/seed/person3/80/80",
  },
];

export function TestimonialsSection() {
  return (
    <section
      data-ocid="testimonials.section"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">
          Client Stories
        </p>
        <h2 className="font-serif text-4xl font-bold">What Collectors Say</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            data-ocid={`testimonials.item.${i + 1}`}
            className="flex flex-col gap-4 rounded-sm border border-border bg-card p-6"
          >
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              "{t.quote}"
            </p>
            <div className="mt-auto flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
