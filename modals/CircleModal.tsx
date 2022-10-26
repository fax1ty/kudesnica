import { ReactNode } from "react";
import { View } from "react-native";
import { Button, ButtonProps } from "../components/Button";
import { Colors } from "../resources";
import { AutoHeightModal } from "./AutoHeightModal";

interface Props {
  headerContent: ReactNode;
  footerContent: ReactNode;
  buttonProps?: ButtonProps;
  onClose?: () => void;
  visible: boolean;
}

export const CircleModal = ({
  visible,
  onClose,
  headerContent,
  footerContent,
  buttonProps,
}: Props) => {
  return (
    <AutoHeightModal visible={visible} onClose={onClose}>
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
    </AutoHeightModal>
  );
};
