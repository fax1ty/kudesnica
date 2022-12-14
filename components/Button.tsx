import { useLayout } from "@react-native-community/hooks";
import { ViewStyle } from "react-native";
import Ripple from "react-native-material-ripple";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Colors, Fonts } from "../resources";
import { IndependentText as Text } from "./IndependentText";

export interface ButtonProps {
  children: string;
  theme?: "filled" | "outlined";
  action?: "primary" | "secondary";
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
  progress?: number;
  darkPattern?: boolean;
}

export const Button = ({
  progress,
  disabled = false,
  children,
  theme = "filled",
  action = "primary",
  style,
  onPress,
  darkPattern = false,
}: ButtonProps) => {
  const { onLayout, width } = useLayout();

  return (
    <Ripple
      onLayout={onLayout}
      onPress={onPress}
      disabled={disabled}
      style={{
        ...style,
        borderColor: theme === "outlined" ? Colors.pink60 : undefined,
        borderWidth: theme === "outlined" ? 3 : undefined,
        backgroundColor:
          theme === "filled"
            ? disabled || darkPattern
              ? Colors.light20
              : action === "primary"
              ? Colors.pink100
              : Colors.light20
            : undefined,
        borderRadius: 30,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Animated.View
        style={useAnimatedStyle(() => ({
          width,
          height: "100%",
          position: "absolute",
          backgroundColor: Colors.pink60,
          opacity: typeof progress === "number" ? 1 : 0,
          justifyContent: "center",
          transform: [
            {
              translateX: withSpring(
                width * -1 + width * ((progress || 0) / 100),
                { damping: 100000 }
              ),
            },
          ],
        }))}
      />
      <Text
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
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
