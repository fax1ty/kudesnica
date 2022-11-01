import { useState } from "react";
import {
  View,
  ViewStyle,
  Image,
  ImageURISource,
  ImageResizeMode,
} from "react-native";
import { Skeleton } from "./Skeleton";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  source?: ImageURISource;
  style?: ViewStyle;
  resizeMode?: ImageResizeMode;
  resetBordersAfterLoad?: boolean;
}

export const LoadableImage = ({
  resizeMode,
  source,
  style,
  resetBordersAfterLoad = false,
}: Props) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <View
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        ...{
          ...(resetBordersAfterLoad && isImageLoaded
            ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {}),
        },
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
        <Skeleton width="100%" height="100%" />
      </Animated.View>
    </View>
  );
};
