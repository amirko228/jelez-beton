import { create } from "zustand";

type State = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export const useCatalogStore = create<State>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (value) => set({ selectedCategory: value })
}));
