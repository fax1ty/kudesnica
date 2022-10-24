import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { Button, ButtonProps } from "../components/Button";
import { CustomBackdrop } from "../components/CustomBackdrop";
import { Colors } from "../resources";

interface Props {
  headerContent: ReactNode;
  footerContent: ReactNode;
  buttonProps?: ButtonProps;
  onClose?: () => void;
  visible: boolean;
}

const BottomSheetContent = ({
  headerContent,
  footerContent,
  buttonProps,
  handleContentLayout,
}: Props & {
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
        <View
          style={{
            alignSelf: "center",
            width: 320,
            height: 320,
            borderRadius: 320 / 2,
            backgroundColor: "#f6f6f6",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {headerContent}
          <View
            style={{
              width: 272,
              height: 2,
              backgroundColor: Colors.light100,
              marginTop: 18,
            }}
          />
          {footerContent}
        </View>
        <Button {...buttonProps} style={{ marginTop: 43 }}>
          {buttonProps?.children || ""}
        </Button>
      </View>
    </View>
  );
};

export const CircleModal = (props: Props) => {
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!props.visible) ref.current?.dismiss();
    else {
      ref.current?.present();
      ref.current?.expand();
    }
  }, [props.visible]);

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

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose={true}
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
      <BottomSheetContent
        onClose={props.onClose}
        handleContentLayout={handleContentLayout}
        {...props}
      />
    </BottomSheetModal>
  );
};
