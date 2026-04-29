"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { LensTypeId, LensUpgradeId } from "@/lib/lenses";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  imageUrl: string;
  framePrice: number;
  lens: {
    typeId: LensTypeId | null;
    typeName: string;
    upgrades: Array<{ id: LensUpgradeId; name: string; price: number }>;
    prescriptionFileName: string | null;
    totalPrice: number;
  };
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "id" | "quantity">, openSheet?: boolean) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const generateLineId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `line_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      addItem: (item, openSheet = true) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: generateLineId(),
              quantity: 1,
            },
          ],
          isOpen: openSheet ? true : state.isOpen,
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((line) => line.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.max(1, Math.min(99, quantity)) }
              : line,
          ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "najmi-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const selectCartItemCount = (state: CartState) =>
  state.items.reduce((sum, line) => sum + line.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );
