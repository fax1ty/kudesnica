import create from "zustand";
import { combine } from "zustand/middleware";

interface ICurrentlyPlaying {
  dollId: string;
  storyId: string;
}

export const useGlobalStore = create(
  combine(
    {
      currentlyPlaying: { dollId: "", storyId: "" },
      isBottomPlayerOpen: false,
      isCongratulationsRegModalVisible: false,
      phone: 0,
      token: "",
    },
    (set) => ({
      setCurrentlyPlaying: (value: ICurrentlyPlaying) =>
        set((state) => ({ ...state, currentlyPlaying: value })),
      openBottomPlayer: () =>
        set((state) => ({ ...state, isBottomPlayerOpen: true })),
      closeBottomPlayer: () =>
        set((state) => ({ ...state, isBottomPlayerOpen: false })),
      openCongratulationsRegModal: () =>
        set((state) => ({ ...state, isCongratulationsRegModalVisible: true })),
      closeCongratulationsRegModal: () =>
        set((state) => ({ ...state, isCongratulationsRegModalVisible: false })),
      setPhone: (phone: number) => set((state) => ({ ...state, phone })),
      setToken: (token: string) => set((state) => ({ ...state, token })),
    })
  )
);
