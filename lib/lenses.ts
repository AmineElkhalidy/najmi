export type LensTypeId = "non-prescription" | "single-vision" | "progressive";

export type LensType = {
  id: LensTypeId;
  name: string;
  description: string;
  priceModifier: number;
  requiresPrescription: boolean;
  recommendedFor?: string;
};

export const lensTypes: LensType[] = [
  {
    id: "non-prescription",
    name: "Non-prescription",
    description:
      "Clear lenses without optical correction — perfect for fashion or blue-light protection only.",
    priceModifier: 0,
    requiresPrescription: false,
    recommendedFor: "No vision correction needed",
  },
  {
    id: "single-vision",
    name: "Single Vision",
    description:
      "Standard prescription lenses for distance, intermediate, or reading correction.",
    priceModifier: 350,
    requiresPrescription: true,
    recommendedFor: "Most prescriptions",
  },
  {
    id: "progressive",
    name: "Progressive (Multifocal)",
    description:
      "Smooth transition between distance, intermediate, and near vision in a single lens.",
    priceModifier: 950,
    requiresPrescription: true,
    recommendedFor: "Presbyopia / 40+ years",
  },
];

export type LensUpgradeId =
  | "blue-light"
  | "anti-reflective"
  | "scratch-resistant"
  | "uv-protection";

export type LensUpgrade = {
  id: LensUpgradeId;
  name: string;
  description: string;
  price: number;
  recommended?: boolean;
};

export const lensUpgrades: LensUpgrade[] = [
  {
    id: "blue-light",
    name: "Anti Blue-light",
    description: "Reduces digital eye strain from screens and devices.",
    price: 150,
    recommended: true,
  },
  {
    id: "anti-reflective",
    name: "Anti-Reflective Coating",
    description: "Eliminates glare and reflections for clearer vision.",
    price: 120,
    recommended: true,
  },
  {
    id: "scratch-resistant",
    name: "Scratch Resistant",
    description: "Hard coating that protects lenses from daily wear.",
    price: 90,
  },
  {
    id: "uv-protection",
    name: "UV Protection",
    description: "Blocks 100% of harmful UVA and UVB rays.",
    price: 100,
  },
];

export function getLensType(id: LensTypeId | null): LensType | undefined {
  if (!id) return undefined;
  return lensTypes.find((lens) => lens.id === id);
}

export function getLensUpgrade(id: LensUpgradeId): LensUpgrade | undefined {
  return lensUpgrades.find((upgrade) => upgrade.id === id);
}

export function calculateLensTotal(
  lensTypeId: LensTypeId | null,
  upgradeIds: LensUpgradeId[],
): number {
  const lens = getLensType(lensTypeId);
  const lensCost = lens?.priceModifier ?? 0;
  const upgradesCost = upgradeIds.reduce((sum, id) => {
    const upgrade = getLensUpgrade(id);
    return sum + (upgrade?.price ?? 0);
  }, 0);
  return lensCost + upgradesCost;
}
