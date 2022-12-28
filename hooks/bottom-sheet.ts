import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { RefObject, useCallback, useRef } from "react";
import { BackHandler, NativeEventSubscription } from "react-native";

export const useBottomSheetBackHandler = (
  bottomSheetRef: RefObject<BottomSheetModal | BottomSheet>,
  isModal = true
) => {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
    null
  );
  const handleSheetPositionChange = useCallback<
    NonNullable<BottomSheetModalProps["onChange"]>
  >(
    (index) => {
      const isBottomSheetVisible = index >= 0;
      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        // setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            if (isModal)
              (bottomSheetRef.current as BottomSheetModal)?.dismiss();
            else bottomSheetRef.current?.collapse();
            return true;
          }
        );
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [isModal, bottomSheetRef]
  );
  return { handleSheetPositionChange };
};
