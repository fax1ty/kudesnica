import { View, ViewStyle } from "react-native";
import { Colors, Fonts } from "../resources";
import { IndependentText as Text } from "./IndependentText";

interface Props {
  color?: string;
  children: string | number;
  style?: ViewStyle;
}

export const Pin = ({ children, color = Colors.violet80, style }: Props) => {
  return (
    <View
      style={{
        ...style,
        width: 18,
        height: 18,
        borderRadius: 18 / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: Colors.light100,
          fontSize: 12,
          fontFamily: Fonts.firamonoBold,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
