import { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../resources";

interface Props {
  itemsCount: number;
  currentIndex: number;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
}

export const Pagination = ({
  style,
  currentIndex,
  itemsCount,
  activeColor = Colors.pink80,
  inactiveColor = Colors.violet40,
}: Props) => {
  const dots = useMemo(() => new Array(itemsCount).fill(0), [itemsCount]);

  return (
    <View
      style={{
        ...style,
        flexDirection: "row",
        height: 16,
        alignItems: "center",
      }}
    >
      {dots.map((_, i) => (
        <Animated.View
          key={`pagination-item-${i}`}
          style={useAnimatedStyle(() => ({
            width: withSpring(currentIndex === i ? 16 : 8),
            aspectRatio: 1,
            borderRadius: withSpring(currentIndex === i ? 16 / 2 : 8 / 2),
            backgroundColor: currentIndex === i ? activeColor : inactiveColor,
            marginLeft: i === 0 ? 0 : 16,
          }))}
        />
      ))}
    </View>
  );
};
