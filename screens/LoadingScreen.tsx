import { useDimensions } from "@react-native-community/hooks";
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
import * as SplashScreen from "expo-splash-screen";
import { useGlobalStore } from "../stores/global";
import { StackActions, useNavigation } from "@react-navigation/native";
import { initAudio } from "../utils/audio";
import { usePersistedState } from "react-native-use-persisted-state";

import LogoWithouText from "../icons/LogoWithoutText";
import LogoTextOnly from "../icons/LogoTextOnly";
import Star from "../icons/Star";

export const LoadingScreen = () => {
  const { screen: screenSize } = useDimensions();
  const shift1 = useSharedValue((screenSize.width / 2) * -1);
  const shift2 = useSharedValue((screenSize.width / 2) * -1);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const navigation = useNavigation();
  const fontsLoaded = useGlobalStore((state) => state.fontsLoaded);
  const token = useGlobalStore((state) => state.token);
  const [shouldShowWelcomeScreen] = usePersistedState(
    "@shouldShowWelcomeScreen",
    true
  );

  useEffect(() => {
    if (!fontsLoaded) return;
    (async () => {
      await initAudio().catch(console.error);
      await SplashScreen.hideAsync();
    })();
    const timeout = setTimeout(() => {
      if (shouldShowWelcomeScreen) {
        navigation.dispatch(StackActions.replace("Welcome"));
      } else {
        navigation.dispatch(StackActions.replace("Home"));
      }
    }, 1000 * 3);
    return () => clearTimeout(timeout);
  }, [fontsLoaded, token]);

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
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <LogoWithouText style={{ position: "absolute" }} />
          <Animated.View
            entering={FadeIn.duration(500)}
            style={{
              position: "absolute",
              top: 35.14,
              transform: [{ translateX: -9 }, { translateX: -7 }],
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
          width: screenSize.width * 2,
          height: 436,
          position: "absolute",
          top: 0,
          transform: [
            { translateY: (436 / 2) * -1 },
            { translateX: shift1.value },
            { rotate: "-180deg" },
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
};
