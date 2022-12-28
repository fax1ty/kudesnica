import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";

import { CustomBackdrop } from "../components/CustomBackdrop";
import { Colors } from "../resources";

interface Props {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const BottomSheetContent = ({
  children,
  handleContentLayout,
}: {
  children: ReactNode;
  handleContentLayout: any;
}) => {
  return (
    <View onLayout={handleContentLayout}>
      <View
        style={{
          marginTop: 16,
          alignSelf: "center",
          width: 36,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: Colors.light40,
        }}
      />
      <View
        style={{
          marginTop: 38,
          paddingHorizontal: 16,
          paddingBottom: 16 + 34,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export const AutoHeightModal = ({ visible, children, onClose }: Props) => {
  const ref = useRef<BottomSheetModal>(null);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(["CONTENT_HEIGHT"]);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    // Не знаю почему это работает (трюк с disappearsOnIndex и appearsOnIndex)
    return (
      <CustomBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    );
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    if (!visible) ref.current.dismiss();
    else {
      ref.current.present();
      ref.current.expand();
    }
  }, [visible]);

  // const { handleSheetPositionChange } = useBottomSheetBackHandler(ref);

  return (
    <BottomSheetModal
      ref={ref}
      // onChange={handleSheetPositionChange}
      onChange={(index) => {
        if (index === -1) {
          if (onClose) onClose();
        }
      }}
      enablePanDownToClose
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      handleComponent={null}
      style={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: "hidden",
      }}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: Colors.light100 }}
    >
      <BottomSheetContent handleContentLayout={handleContentLayout}>
        {children}
      </BottomSheetContent>
    </BottomSheetModal>
  );
};
