import create from "zustand";
import { combine } from "zustand/middleware";

export const useGlobalStore = create(
  combine(
    {
      fontsLoaded: false,
      isBottomPlayerOpen: false,
      isCongratulationsRegModalVisible: false,
      isPremiumStoryModalVisible: false,
      isLoginWelcomeModalVisible: false,
      isAuthOnlyModalVisible: false,
      isExitConfirmModalVisible: false,
      isStoreLinksModalVisible: false,
      phone: 0,
      token: "",
      storeLinksModalUrls: [
        "https://ozon.ru",
        "https://wildberries.ru",
        "https://aliexpress.ru",
      ],
    },
    (set) => ({
      setFontsLoaded: (value: boolean) =>
        set((state) => ({ ...state, fontsLoaded: value })),
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
      openAuthOnlyModal: () =>
        set((state) => ({ ...state, isAuthOnlyModalVisible: true })),
      closeAuthOnlyModal: () =>
        set((state) => ({ ...state, isAuthOnlyModalVisible: false })),
      openExitConfirmModal: () =>
        set((state) => ({ ...state, isExitConfirmModalVisible: true })),
      closeExitConfirmModal: () =>
        set((state) => ({ ...state, isExitConfirmModalVisible: false })),
      openStoreLinksModal: () =>
        set((state) => ({ ...state, isStoreLinksModalVisible: true })),
      closeStoreLinksModal: () =>
        set((state) => ({ ...state, isStoreLinksModalVisible: false })),
      setPhone: (phone: number) => set((state) => ({ ...state, phone })),
      setToken: (token: string) => set((state) => ({ ...state, token })),
      setStoreLinksModalUrls: (urls: Array<string>) =>
        set((state) => ({ ...state, storeLinksModalUrls: urls })),
    })
  )
);
