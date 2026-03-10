export interface StaticProduct {
  id: bigint;
  name: string;
  description: string;
  price: bigint; // in cents
  category: string;
  imageUrl: string;
  featured: boolean;
  stock: bigint;
  variants: Array<{ size?: string; color?: string }>;
}

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: 1n,
    name: "Golden Horizon",
    description:
      "A luminous piece capturing the warmth of golden light at dusk. Thick impasto layers of gold, copper, and ivory create a richly textured surface that plays beautifully with light. Each stroke tells a story of warmth and depth.",
    price: 28000n,
    category: "Abstract",
    imageUrl: "https://picsum.photos/seed/gold/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 2n,
    name: "Ocean Depths",
    description:
      "Dive into the serene depths of the ocean with this mesmerizing piece. Layers of teal, blue, and silver build up into waves of texture, evoking the calming rhythm of the sea. A timeless statement for any space.",
    price: 32000n,
    category: "Nature",
    imageUrl: "https://picsum.photos/seed/ocean/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 3n,
    name: "Earthy Soul",
    description:
      "Rooted in the beauty of the natural world, this piece layers terracotta, rust, and burnt sienna with organic mixed media including sand and natural pigments. A grounding presence for any interior.",
    price: 26000n,
    category: "Nature",
    imageUrl: "https://picsum.photos/seed/earth/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 4n,
    name: "Blush Garden",
    description:
      "Delicate and feminine, this piece weaves blush pink, rose gold, and champagne tones into swirling floral patterns. Raised textures and shimmering accents make this a romantic focal point for any room.",
    price: 29500n,
    category: "Floral",
    imageUrl: "https://picsum.photos/seed/blush/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 5n,
    name: "White Silence",
    description:
      "Minimalism at its most powerful. Pure white and cream are sculpted into dramatic ridges and valleys, letting shadow and light create an ever-changing visual experience. A gallery-quality piece for modern interiors.",
    price: 34000n,
    category: "Minimal",
    imageUrl: "https://picsum.photos/seed/white/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 6n,
    name: "Midnight Gold",
    description:
      "Bold, dramatic, and luxurious. Deep matte black is adorned with raised metallic gold patterns that catch the light from every angle. A statement piece that commands attention and elevates any space it occupies.",
    price: 38000n,
    category: "Abstract",
    imageUrl: "https://picsum.photos/seed/midnight/800/800",
    featured: true,
    stock: 1n,
    variants: [
      { size: "12x12 inch" },
      { size: "18x18 inch" },
      { size: "24x24 inch" },
    ],
  },
  {
    id: 7n,
    name: "Rustic Bloom",
    description:
      "Inspired by wild meadows, this artwork combines rough plaster textures with soft floral forms in warm ochre and sage green. A piece that brings the outdoors in with artisanal craftsmanship.",
    price: 24500n,
    category: "Floral",
    imageUrl: "https://picsum.photos/seed/bloom/800/800",
    featured: false,
    stock: 1n,
    variants: [{ size: "12x12 inch" }, { size: "18x18 inch" }],
  },
  {
    id: 8n,
    name: "Silver Cascade",
    description:
      "Flowing silver and pearl tones cascade down this vertical composition. Layered metallic medium creates a waterfall effect that brings movement and energy to any wall.",
    price: 31000n,
    category: "Abstract",
    imageUrl: "https://picsum.photos/seed/silver/800/800",
    featured: false,
    stock: 1n,
    variants: [{ size: "12x16 inch" }, { size: "18x24 inch" }],
  },
];

export const CATEGORIES = ["All", "Abstract", "Nature", "Floral", "Minimal"];

export function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(0)}`;
}
