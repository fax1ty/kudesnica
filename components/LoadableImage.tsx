import { useState } from "react";
import { View, ViewStyle, Image } from "react-native";
import { Skeleton } from "./Skeleton";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  url?: string;
  style?: ViewStyle;
}

export const LoadableImage = ({ url, style }: Props) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={{ ...style, position: "relative", overflow: "hidden" }}>
      {url && (
        <Image
          source={{ uri: url }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <Animated.View
        style={useAnimatedStyle(() => ({
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: withTiming(isImageLoaded ? 0 : 1, {
            duration: 300,
            easing: Easing.linear,
          }),
        }))}
      >
        <Skeleton width="100%" height="100%" />
      </Animated.View>
    </View>
  );
};
