export type ProductCategory =
  | "men"
  | "women"
  | "kids"
  | "sunglasses"
  | "accessories";

export type FrameShape =
  | "round"
  | "square"
  | "aviator"
  | "rectangle"
  | "cat-eye"
  | "oval";

export type FaceShape = "oval" | "round" | "heart" | "square" | "oblong";

export type Gender = "men" | "women" | "unisex" | "kids";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  currency: "MAD";
  category: ProductCategory;
  gender: Gender;
  frameShape: FrameShape;
  faceShapes: FaceShape[];
  color: string;
  colorHex: string;
  material: string;
  description: string;
  highlights: string[];
  images: {
    front: string;
    side: string;
    gallery: string[];
  };
  rating: number;
  reviewCount: number;
  badges?: Array<"new" | "bestseller" | "limited">;
  inStock: boolean;
};

const UNSPLASH = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "no-001",
    slug: "no-001-rivoli",
    name: "Rivoli",
    brand: "Najmi Atelier",
    price: 1290,
    compareAtPrice: 1490,
    currency: "MAD",
    category: "men",
    gender: "men",
    frameShape: "rectangle",
    faceShapes: ["oval", "round", "heart"],
    color: "Matte Black",
    colorHex: "#1a1a1a",
    material: "Acetate",
    description:
      "A timeless rectangular frame in premium acetate, finished with subtle gold-tone hardware. Built for everyday wear with effortless polish.",
    highlights: [
      "Hand-polished Italian acetate",
      "Spring-loaded titanium hinges",
      "5-base premium optical lenses ready",
    ],
    images: {
      front: UNSPLASH("photo-1574258495973-f010dfbb5371"),
      side: UNSPLASH("photo-1577803645773-f96470509666"),
      gallery: [
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
        UNSPLASH("photo-1577803645773-f96470509666"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
      ],
    },
    rating: 4.8,
    reviewCount: 124,
    badges: ["bestseller"],
    inStock: true,
  },
  {
    id: "no-002",
    slug: "no-002-luna",
    name: "Luna",
    brand: "Najmi Atelier",
    price: 1490,
    currency: "MAD",
    category: "women",
    gender: "women",
    frameShape: "cat-eye",
    faceShapes: ["round", "oval", "square"],
    color: "Tortoise Honey",
    colorHex: "#8a5a2b",
    material: "Acetate",
    description:
      "A sculpted cat-eye silhouette in honey tortoise. Confident, refined, and unmistakably feminine.",
    highlights: [
      "Hand-laminated tortoise acetate",
      "Soft-touch nose pads",
      "Lightweight 18g build",
    ],
    images: {
      front: UNSPLASH("photo-1572635196237-14b3f281503f"),
      side: UNSPLASH("photo-1556306535-0f09a537f0a3"),
      gallery: [
        UNSPLASH("photo-1572635196237-14b3f281503f"),
        UNSPLASH("photo-1556306535-0f09a537f0a3"),
        UNSPLASH("photo-1591076482161-42ce6da69f67"),
      ],
    },
    rating: 4.9,
    reviewCount: 86,
    badges: ["new"],
    inStock: true,
  },
  {
    id: "no-003",
    slug: "no-003-sahara",
    name: "Sahara",
    brand: "Najmi Atelier",
    price: 1690,
    currency: "MAD",
    category: "sunglasses",
    gender: "unisex",
    frameShape: "aviator",
    faceShapes: ["oval", "heart", "square"],
    color: "Brushed Gold",
    colorHex: "#caa657",
    material: "Stainless Steel",
    description:
      "Iconic aviator silhouette in brushed gold with polarized desert-tinted lenses. Made for sunlit afternoons in Marrakech.",
    highlights: [
      "Polarized UV400 lenses",
      "Adjustable silicone nose pads",
      "Lightweight stainless steel core",
    ],
    images: {
      front: UNSPLASH("photo-1511499767150-a48a237f0083"),
      side: UNSPLASH("photo-1473496169904-658ba7c44d8a"),
      gallery: [
        UNSPLASH("photo-1511499767150-a48a237f0083"),
        UNSPLASH("photo-1473496169904-658ba7c44d8a"),
        UNSPLASH("photo-1577803645773-f96470509666"),
      ],
    },
    rating: 4.7,
    reviewCount: 213,
    badges: ["bestseller"],
    inStock: true,
  },
  {
    id: "no-004",
    slug: "no-004-atlas",
    name: "Atlas",
    brand: "Najmi Atelier",
    price: 1390,
    currency: "MAD",
    category: "men",
    gender: "men",
    frameShape: "square",
    faceShapes: ["oval", "round"],
    color: "Crystal Smoke",
    colorHex: "#3a3a3a",
    material: "Acetate",
    description:
      "Bold squared frames sculpted from translucent smoke acetate. A statement piece that frames every face with character.",
    highlights: [
      "Translucent layered acetate",
      "Gold-plated logo plate",
      "Sturdy 7-barrel hinges",
    ],
    images: {
      front: UNSPLASH("photo-1580894732444-8ecded7900cd"),
      side: UNSPLASH("photo-1577803645773-f96470509666"),
      gallery: [
        UNSPLASH("photo-1580894732444-8ecded7900cd"),
        UNSPLASH("photo-1577803645773-f96470509666"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
      ],
    },
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
  },
  {
    id: "no-005",
    slug: "no-005-nour",
    name: "Nour",
    brand: "Najmi Atelier",
    price: 1190,
    currency: "MAD",
    category: "women",
    gender: "women",
    frameShape: "round",
    faceShapes: ["square", "heart", "oblong"],
    color: "Champagne Gold",
    colorHex: "#d4af37",
    material: "Titanium",
    description:
      "A featherweight round titanium frame with a champagne-gold finish. Effortless elegance for the modern professional.",
    highlights: [
      "8g titanium construction",
      "Hypoallergenic IP coating",
      "Adjustable nose bridge",
    ],
    images: {
      front: UNSPLASH("photo-1567113463300-102a7eb3cb26"),
      side: UNSPLASH("photo-1567113463300-102a7eb3cb26"),
      gallery: [
        UNSPLASH("photo-1567113463300-102a7eb3cb26"),
        UNSPLASH("photo-1567113463300-102a7eb3cb26"),
        UNSPLASH("photo-1572635196237-14b3f281503f"),
      ],
    },
    rating: 4.9,
    reviewCount: 142,
    badges: ["new", "limited"],
    inStock: true,
  },
  {
    id: "no-006",
    slug: "no-006-zayd",
    name: "Zayd Junior",
    brand: "Najmi Atelier",
    price: 790,
    currency: "MAD",
    category: "kids",
    gender: "kids",
    frameShape: "oval",
    faceShapes: ["round", "oval"],
    color: "Mediterranean Blue",
    colorHex: "#2a4d6f",
    material: "TR-90",
    description:
      "Flexible, ultra-light TR-90 frames designed for active kids. Soft edges, durable hinges, and resistant to drops.",
    highlights: [
      "Flexible TR-90 polymer",
      "Anti-slip silicone temples",
      "Impact-resistant lenses ready",
    ],
    images: {
      front: UNSPLASH("photo-1565884280295-98eb83e41c65"),
      side: UNSPLASH("photo-1591076482161-42ce6da69f67"),
      gallery: [
        UNSPLASH("photo-1565884280295-98eb83e41c65"),
        UNSPLASH("photo-1591076482161-42ce6da69f67"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
      ],
    },
    rating: 4.7,
    reviewCount: 54,
    inStock: true,
  },
  {
    id: "no-007",
    slug: "no-007-medina",
    name: "Medina",
    brand: "Najmi Atelier",
    price: 1590,
    currency: "MAD",
    category: "sunglasses",
    gender: "women",
    frameShape: "cat-eye",
    faceShapes: ["round", "oval"],
    color: "Black & Gold",
    colorHex: "#1f1f1f",
    material: "Acetate",
    description:
      "Statement oversized cat-eye sunglasses in jet acetate with gold accents. Pure Casablanca glamour.",
    highlights: [
      "UV400 gradient lenses",
      "Hand-finished gold rivets",
      "Includes hard case + cloth",
    ],
    images: {
      front: UNSPLASH("photo-1556306535-0f09a537f0a3"),
      side: UNSPLASH("photo-1572635196237-14b3f281503f"),
      gallery: [
        UNSPLASH("photo-1556306535-0f09a537f0a3"),
        UNSPLASH("photo-1572635196237-14b3f281503f"),
        UNSPLASH("photo-1473496169904-658ba7c44d8a"),
      ],
    },
    rating: 4.8,
    reviewCount: 96,
    badges: ["limited"],
    inStock: true,
  },
  {
    id: "no-008",
    slug: "no-008-casa",
    name: "Casa Round",
    brand: "Najmi Atelier",
    price: 1090,
    currency: "MAD",
    category: "men",
    gender: "unisex",
    frameShape: "round",
    faceShapes: ["square", "oblong"],
    color: "Antique Silver",
    colorHex: "#9aa0a6",
    material: "Stainless Steel",
    description:
      "A vintage-inspired round metal frame with a soft antique silver finish. Lightweight, intellectual, ageless.",
    highlights: [
      "Antique silver IP coating",
      "Adjustable saddle bridge",
      "Premium stainless steel",
    ],
    images: {
      front: UNSPLASH("photo-1574258495973-f010dfbb5371"),
      side: UNSPLASH("photo-1574258495973-f010dfbb5371"),
      gallery: [
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
        UNSPLASH("photo-1567113463300-102a7eb3cb26"),
      ],
    },
    rating: 4.6,
    reviewCount: 61,
    inStock: true,
  },
  {
    id: "no-009",
    slug: "no-009-yasmine",
    name: "Yasmine",
    brand: "Najmi Atelier",
    price: 1390,
    currency: "MAD",
    category: "women",
    gender: "women",
    frameShape: "square",
    faceShapes: ["oval", "round", "heart"],
    color: "Rosé Crystal",
    colorHex: "#c79a8e",
    material: "Acetate",
    description:
      "Soft squared acetate frames in rosé crystal. Romantic, contemporary, and instantly flattering.",
    highlights: [
      "Layered crystal acetate",
      "Light 19g construction",
      "Adjustable nose pads",
    ],
    images: {
      front: UNSPLASH("photo-1591076482161-42ce6da69f67"),
      side: UNSPLASH("photo-1556306535-0f09a537f0a3"),
      gallery: [
        UNSPLASH("photo-1591076482161-42ce6da69f67"),
        UNSPLASH("photo-1556306535-0f09a537f0a3"),
        UNSPLASH("photo-1572635196237-14b3f281503f"),
      ],
    },
    rating: 4.8,
    reviewCount: 73,
    badges: ["new"],
    inStock: true,
  },
  {
    id: "no-010",
    slug: "no-010-coral-case",
    name: "Coral Hard Case",
    brand: "Najmi Atelier",
    price: 190,
    currency: "MAD",
    category: "accessories",
    gender: "unisex",
    frameShape: "oval",
    faceShapes: ["oval", "round", "heart", "square", "oblong"],
    color: "Sand",
    colorHex: "#e6d3a3",
    material: "Vegan Leather",
    description:
      "A sand-tone vegan leather case with magnetic closure and microfiber lining. Protects your eyewear in style.",
    highlights: [
      "Magnetic snap closure",
      "Microfiber-lined interior",
      "Premium vegan leather",
    ],
    images: {
      front: UNSPLASH("photo-1577803645773-f96470509666"),
      side: UNSPLASH("photo-1574258495973-f010dfbb5371"),
      gallery: [
        UNSPLASH("photo-1577803645773-f96470509666"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
      ],
    },
    rating: 4.5,
    reviewCount: 32,
    inStock: true,
  },
  {
    id: "no-011",
    slug: "no-011-amir",
    name: "Amir",
    brand: "Najmi Atelier",
    price: 1290,
    currency: "MAD",
    category: "men",
    gender: "men",
    frameShape: "aviator",
    faceShapes: ["oval", "heart"],
    color: "Gunmetal",
    colorHex: "#46505a",
    material: "Stainless Steel",
    description:
      "Modern aviator frames in gunmetal with double-bridge detail. Confident, masculine, refined.",
    highlights: [
      "Double-bridge construction",
      "Comfort silicone nose pads",
      "Spring hinges",
    ],
    images: {
      front: UNSPLASH("photo-1473496169904-658ba7c44d8a"),
      side: UNSPLASH("photo-1511499767150-a48a237f0083"),
      gallery: [
        UNSPLASH("photo-1473496169904-658ba7c44d8a"),
        UNSPLASH("photo-1511499767150-a48a237f0083"),
        UNSPLASH("photo-1574258495973-f010dfbb5371"),
      ],
    },
    rating: 4.7,
    reviewCount: 91,
    inStock: true,
  },
  {
    id: "no-012",
    slug: "no-012-laila",
    name: "Laïla",
    brand: "Najmi Atelier",
    price: 1190,
    currency: "MAD",
    category: "women",
    gender: "women",
    frameShape: "oval",
    faceShapes: ["square", "oblong", "heart"],
    color: "Rose Gold",
    colorHex: "#d8a0a0",
    material: "Titanium",
    description:
      "Delicate oval titanium frames in rose gold. The lightest, softest expression of elegance.",
    highlights: [
      "Featherweight titanium",
      "Rose gold IP coating",
      "Hypoallergenic build",
    ],
    images: {
      front: UNSPLASH("photo-1567113463300-102a7eb3cb26"),
      side: UNSPLASH("photo-1567113463300-102a7eb3cb26"),
      gallery: [
        UNSPLASH("photo-1567113463300-102a7eb3cb26"),
        UNSPLASH("photo-1567113463300-102a7eb3cb26"),
        UNSPLASH("photo-1572635196237-14b3f281503f"),
      ],
    },
    rating: 4.9,
    reviewCount: 58,
    badges: ["new"],
    inStock: true,
  },
];

export function getProductBySlugOrId(idOrSlug: string): Product | undefined {
  return products.find(
    (product) => product.id === idOrSlug || product.slug === idOrSlug,
  );
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.frameShape === product.frameShape),
    )
    .slice(0, count);
}

export const formatPrice = (amount: number, currency: "MAD" = "MAD") =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
