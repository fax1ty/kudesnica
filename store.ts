import create from "zustand";
import { combine } from "zustand/middleware";

export const useGlobalStore = create(
  combine({ currentlyPlaying: "", isBottomPlayerOpen: false }, (set) => ({
    setCurrentlyPlaying: (value: string) =>
      set((state) => ({ ...state, currentlyPlaying: value })),
    openBottomPlayer: () =>
      set((state) => ({ ...state, isBottomPlayerOpen: true })),
    closeBottomPlayer: () =>
      set((state) => ({ ...state, isBottomPlayerOpen: false })),
  }))
);
