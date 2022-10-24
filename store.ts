import create from "zustand";
import { combine } from "zustand/middleware";

interface ICurrentlyPlaying {
  dollId: string;
  storyId: string;
  state:'paused'|'playing'
}

export const useGlobalStore = create(
  combine(
    {
      fontsLoaded: false,
      currentlyPlaying: { dollId: "", storyId: "",state:'paused' } as ICurrentlyPlaying,
      isBottomPlayerOpen: false,
      isCongratulationsRegModalVisible: false,
      isPremiumStoryModalVisible: false,
      isLoginWelcomeModalVisible: false,
      phone: 0,
      token: "",
    },
    (set) => ({
      setFontsLoaded: (value: boolean) =>
        set((state) => ({ ...state, fontsLoaded: value })),
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
      openPremiumStoryModal: () =>
        set((state) => ({ ...state, isPremiumStoryModalVisible: true })),
      closePremiumStoryModal: () =>
        set((state) => ({ ...state, isPremiumStoryModalVisible: false })),
      openLoginWelcomeModal: () =>
        set((state) => ({ ...state, isLoginWelcomeModalVisible: true })),
      closeLoginWelcomeModal: () =>
        set((state) => ({ ...state, isLoginWelcomeModalVisible: false })),
      setPhone: (phone: number) => set((state) => ({ ...state, phone })),
      setToken: (token: string) => set((state) => ({ ...state, token })),
    })
  )
);
