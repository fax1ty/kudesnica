import { useState } from "react";
import {
  View,
  ViewStyle,
  Image,
  ImageURISource,
  ImageResizeMode,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Skeleton } from "./Skeleton";

interface Props {
  source?: ImageURISource;
  style?: ViewStyle;
  resizeMode?: ImageResizeMode;
  skeletonColors?: string[];
}

export const LoadableImage = ({
  skeletonColors,
  resizeMode,
  source,
  style,
}: Props) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <View
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {source?.uri && (
        <Image
          resizeMode={resizeMode}
          source={source}
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
        <Skeleton width="100%" height="100%" colors={skeletonColors} />
      </Animated.View>
    </View>
  );
};
