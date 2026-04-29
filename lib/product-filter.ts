import {
  type FaceShape,
  type FrameShape,
  type Gender,
  type Product,
  type ProductCategory,
  products,
} from "@/lib/products";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export type ProductQuery = {
  q?: string;
  category?: ProductCategory;
  shapes?: FrameShape[];
  faces?: FaceShape[];
  genders?: Gender[];
  min?: number;
  max?: number;
  sort?: SortOption;
};

export const PRICE_BOUNDS: [number, number] = [
  Math.floor(Math.min(...products.map((p) => p.price)) / 50) * 50,
  Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50,
];

const FRAME_SHAPES: FrameShape[] = [
  "round",
  "square",
  "aviator",
  "rectangle",
  "cat-eye",
  "oval",
];

const FACE_SHAPES: FaceShape[] = [
  "oval",
  "round",
  "heart",
  "square",
  "oblong",
];

const GENDERS: Gender[] = ["men", "women", "unisex", "kids"];

const CATEGORIES: ProductCategory[] = [
  "men",
  "women",
  "kids",
  "sunglasses",
  "accessories",
];

const isFrameShape = (value: string): value is FrameShape =>
  FRAME_SHAPES.includes(value as FrameShape);

const isFaceShape = (value: string): value is FaceShape =>
  FACE_SHAPES.includes(value as FaceShape);

const isGender = (value: string): value is Gender =>
  GENDERS.includes(value as Gender);

const isCategory = (value: string): value is ProductCategory =>
  CATEGORIES.includes(value as ProductCategory);

const parseList = (value?: string | string[]): string[] => {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw.split(",").map((v) => v.trim()).filter(Boolean);
};

const parseNumber = (value?: string | string[]) => {
  if (!value) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const num = Number(raw);
  return Number.isFinite(num) ? num : undefined;
};

const parseString = (value?: string | string[]) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

export function parseProductQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}): ProductQuery {
  const categoryRaw = parseString(searchParams.category);
  const sortRaw = parseString(searchParams.sort);

  return {
    q: parseString(searchParams.q),
    category: categoryRaw && isCategory(categoryRaw) ? categoryRaw : undefined,
    shapes: parseList(searchParams.shape).filter(isFrameShape),
    faces: parseList(searchParams.face).filter(isFaceShape),
    genders: parseList(searchParams.gender).filter(isGender),
    min: parseNumber(searchParams.min),
    max: parseNumber(searchParams.max),
    sort:
      sortRaw === "price-asc" ||
      sortRaw === "price-desc" ||
      sortRaw === "rating"
        ? sortRaw
        : "newest",
  };
}

export function filterProducts(query: ProductQuery): Product[] {
  let result = products.slice();

  if (query.q) {
    const term = query.q.toLowerCase();
    result = result.filter((product) =>
      [
        product.name,
        product.brand,
        product.color,
        product.material,
        product.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }

  if (query.category) {
    result = result.filter((product) => product.category === query.category);
  }

  if (query.shapes && query.shapes.length > 0) {
    result = result.filter((product) =>
      query.shapes!.includes(product.frameShape),
    );
  }

  if (query.faces && query.faces.length > 0) {
    result = result.filter((product) =>
      product.faceShapes.some((face) => query.faces!.includes(face)),
    );
  }

  if (query.genders && query.genders.length > 0) {
    result = result.filter((product) =>
      query.genders!.includes(product.gender),
    );
  }

  if (query.min !== undefined) {
    result = result.filter((product) => product.price >= query.min!);
  }
  if (query.max !== undefined) {
    result = result.filter((product) => product.price <= query.max!);
  }

  switch (query.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // "newest" – preserve catalog order, with new badges first
      result.sort((a, b) => {
        const aNew = a.badges?.includes("new") ? 1 : 0;
        const bNew = b.badges?.includes("new") ? 1 : 0;
        return bNew - aNew;
      });
  }

  return result;
}
