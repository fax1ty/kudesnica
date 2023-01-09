import { useDimensions } from "@react-native-community/hooks";
import { useLink } from "expo-router";
import { useEffect } from "react";
import { View, Image } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { usePersistedState } from "react-native-use-persisted-state";

import LogoTextOnly from "../icons/LogoTextOnly";
import LogoWithouText from "../icons/LogoWithoutText";
import Star from "../icons/Star";
import { useGlobalStore } from "../stores/global";
import { initAudio } from "../utils/audio";

export default function Home() {
  const navigate = useLink();

  const { screen: screenSize } = useDimensions();
  const shift1 = useSharedValue((screenSize.width / 2) * -1);
  const shift2 = useSharedValue((screenSize.width / 2) * -1);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const token = useGlobalStore((state) => state.token);
  const [shouldShowWelcomeScreen] = usePersistedState(
    "@shouldShowWelcomeScreen",
    true
  );

  useEffect(() => {
    initAudio().catch(console.error);
    const timeout = setTimeout(() => {
      if (shouldShowWelcomeScreen) {
        navigate.replace("/welcome");
      } else {
        navigate.replace("/dolls");
      }
    }, 1000 * 3);
    return () => clearTimeout(timeout);
  }, [shouldShowWelcomeScreen, token]);

  useEffect(() => {
    shift1.value = withRepeat(
      withTiming((screenSize.width / 2) * -1 + 70, {
        duration: 1000 * 850,
        easing: Easing.elastic(100),
      }),
      Infinity,
      true
    );
    return () => {
      shift1.value = (screenSize.width / 2) * -1;
    };
  }, [screenSize.width]);

  useEffect(() => {
    shift2.value = withRepeat(
      withTiming((screenSize.width / 2) * -1 - 50, {
        duration: 1000 * 860,
        easing: Easing.elastic(100),
      }),
      Infinity,
      true
    );
    return () => {
      shift2.value = (screenSize.width / 2) * -1;
    };
  }, [screenSize.width]);

  useEffect(() => {
    opacity1.value = withRepeat(
      withTiming(1, { duration: 300 }),
      Infinity,
      true
    );
    return () => {
      opacity1.value = 0;
    };
  }, [screenSize.width]);

  useEffect(() => {
    opacity2.value = withDelay(
      100,
      withRepeat(withTiming(1, { duration: 300 }), Infinity, true)
    );
    return () => {
      opacity2.value = 0;
    };
  }, [screenSize.width]);

  useEffect(() => {
    opacity3.value = withDelay(
      250,
      withRepeat(withTiming(1, { duration: 300 }), Infinity, true)
    );
    return () => {
      opacity3.value = 0;
    };
  }, [screenSize.width]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Image
        source={require("../assets/loading-bg.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "#dff5ff",
        }}
      />
      <View
        style={{
          width: 239,
          position: "relative",
          height: 130,
          top: "50%",
          left: "50%",
          transform: [
            { translateY: (130 / 2) * -1 },
            { translateX: (239 / 2) * -1 },
          ],
        }}
      >
        <View
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          <LogoWithouText
            style={{ position: "absolute", top: 0, left: 44.31 }}
          />
          <Animated.View
            entering={FadeIn.duration(500)}
            style={{
              position: "absolute",
              top: 40.47,
            }}
          >
            <LogoTextOnly />
          </Animated.View>
          <Animated.View
            style={useAnimatedStyle(() => ({
              width: 12.61,
              height: 14.13,
              left: 5.93,
              top: 14.52,
              position: "absolute",
              opacity: opacity1.value,
            }))}
          >
            <Star />
          </Animated.View>
          <Animated.View
            style={useAnimatedStyle(() => ({
              width: 16.07,
              height: 18.01,
              left: 197.66,
              top: 0,
              position: "absolute",
              opacity: opacity2.value,
            }))}
          >
            <Star
              style={{
                transform: [{ scale: 16.07 / 12.61 }],
              }}
            />
          </Animated.View>
          <Animated.View
            style={useAnimatedStyle(() => ({
              width: 13.37,
              height: 14.98,
              left: 169.02,
              top: 114.02,
              position: "absolute",
              opacity: opacity3.value,
            }))}
          >
            <Star
              style={{
                transform: [{ scale: 13.37 / 12.61 }],
              }}
            />
          </Animated.View>
        </View>
      </View>
      <Animated.Image
        source={require("../assets/cloud.png")}
        style={useAnimatedStyle(() => ({
          opacity: 0.93,
          width: screenSize.width * 2,
          height: 436,
          position: "absolute",
          top: 0,
          transform: [
            { translateY: (436 / 2) * -1 },
            { translateX: shift1.value },
            { scale: 1.2 },
            { rotate: "353deg" },
          ],
        }))}
      />
      <Animated.Image
        source={require("../assets/cloud.png")}
        style={useAnimatedStyle(() => ({
          width: screenSize.width * 2,
          height: 436,
          position: "absolute",
          bottom: 0,
          transform: [{ translateY: 436 / 2.3 }, { translateX: shift2.value }],
        }))}
      />
    </View>
  );
}
