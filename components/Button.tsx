import Ripple from "react-native-material-ripple";
import { Text, ViewStyle } from "react-native";
import { Colors, Fonts } from "../resources";

export interface ButtonProps {
  children: string;
  theme?: "filled" | "outlined";
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button = ({
  disabled = false,
  children,
  theme = "filled",
  style,
  onPress,
}: ButtonProps) => {
  return (
    <Ripple
      onPress={onPress}
      disabled={disabled}
      style={{
        ...style,
        borderColor: theme === "outlined" ? Colors.pink60 : undefined,
        borderWidth: theme === "outlined" ? 3 : undefined,
        backgroundColor:
          theme === "filled"
            ? disabled
              ? Colors.light20
              : Colors.pink100
            : undefined,
        borderRadius: 30,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          color: theme === "filled" ? Colors.light100 : Colors.pink100,
          fontFamily: Fonts.firasansBold,
          fontSize: 18,
          lineHeight: 22,
        }}
      >
        {children}
      </Text>
    </Ripple>
  );
};
