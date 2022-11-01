import { View, Text, ViewStyle } from "react-native";
import { Colors, Fonts } from "../resources";

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
          transform: [{ translateY: (12 / 4) * -1 }],
          color: Colors.light100,
          fontSize: 12,
          fontFamily: Fonts.firasansBold,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
