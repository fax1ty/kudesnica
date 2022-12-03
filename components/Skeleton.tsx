import { useRef, useState } from "react";
import { Dimensions, View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ViewStyle } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const START = -1;
const END = 1;
const DURATION = 2000;
const LOCATIONS = [0.3, 0.5, 0.7];
const ANIMATION = new Animated.Value(START);

const runAnimation = () => {
  ANIMATION.setValue(START);
  Animated.timing(ANIMATION, {
    toValue: END,
    duration: DURATION,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(runAnimation);
};

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
});

runAnimation();

const makeRadiusObject = (
  borderRadius: number | [number, number, number, number] | undefined
) => {
  const br = {
    borderRadius: undefined,
    borderTopLeftRadius: undefined,
    borderTopRightRadius: undefined,
    borderBottomLeftRadius: undefined,
    borderBottomRightRadius: undefined,
  } as any;
  if (!borderRadius) return br;
  if (typeof borderRadius === "number") br.borderRadius = borderRadius;
  else {
    br.borderTopLeftRadius = borderRadius[0];
    br.borderTopRightRadius = borderRadius[1];
    br.borderBottomLeftRadius = borderRadius[2];
    br.borderBottomRightRadius = borderRadius[3];
  }
  return br;
};

interface Props {
  width: number | string;
  height: number | string;
  borderRadius?: number | [number, number, number, number];
  style?: ViewStyle;
  colors?: Array<string>;
}

export const Skeleton = ({
  width,
  height,
  borderRadius,
  style,
  colors = ["#eee", "#ddd", "#eee"],
}: Props) => {
  const [positionX, setPositionX] = useState<number | null>(null);
  const viewRef = useRef<View>(null);

  return (
    <View
      style={{
        overflow: "hidden",
        backgroundColor: colors[0],
        width,
        height,
        ...style,
        ...makeRadiusObject(borderRadius),
      }}
      ref={viewRef}
      onLayout={() => {
        if (viewRef) {
          viewRef.current?.measure((_x, _y, _width, _height, pageX, _pageY) => {
            setPositionX(pageX);
          });
        }
      }}
    >
      {positionX !== null && (
        <Animated.View
          style={{
            flex: 1,
            left: -positionX || 0,
            transform: [{ translateX: linear }],
          }}
        >
          <LinearGradient
            style={{ flex: 1, width: SCREEN_WIDTH }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={LOCATIONS}
            colors={colors}
          />
        </Animated.View>
      )}
    </View>
  );
};
