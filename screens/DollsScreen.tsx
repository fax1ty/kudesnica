import { DrawerActions, useNavigation } from "@react-navigation/native";
import { View, StatusBar as StatusBarData, Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../resources";
import { DollsCarousel } from "../components/DollsCarousel";
import { useDolls } from "../api/dolls";
import { useEffect, useMemo, useState } from "react";
import { useStories } from "../api/stories";
import { useGlobalStore } from "../store";

import BurgerButton from "../icons/BurgerButton";
import Logo from "../icons/Logo";
import NoAvatar from "../icons/NoAvatar";

export const DollsScreen = () => {
  const [currentDoll, setCurrentDoll] = useState(0);
  const [isCurrentDollNext, setCurrentDollNext] = useState(false);
  const navigation = useNavigation();
  const shift = useSharedValue(0);
  const { data: dolls } = useDolls();
  const { data: stories } = useStories(
    dolls ? (isCurrentDollNext ? undefined : dolls[currentDoll].id) : undefined
  );
  const store = useGlobalStore();

  useEffect(() => {
    if (!dolls || !stories) return;
    if (isCurrentDollNext) return;
    store.setCurrentlyPlaying({
      dollId: dolls[currentDoll].id,
      storyId: stories[0].id,
    });
  }, [stories, isCurrentDollNext]);

  const renderedDolls = useMemo(
    () => [
      ...(dolls?.map((doll) => ({ ...doll, next: false })) || []),
      {
        title: "Новая героиня",
        id: "next",
        dollsCarouselPhoto: "https://i.imgur.com/wUoRuv2.png",
        storyViewCarousel: [],
        next: true,
        description: [],
      },
    ],
    [dolls]
  );

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Animated.Image
        style={useAnimatedStyle(() => ({
          width: `${renderedDolls.length * 100}%`,
          height: "100%",
          backgroundColor: Colors.light100,
          position: "absolute",
          transform: [
            {
              translateX: withTiming(shift.value * -1, {
                duration: 100,
                easing: Easing.linear,
              }),
            },
          ],
        }))}
        source={require("../assets/dolls-parallax-bg.png")}
      />
      <View style={{ width: "100%", height: "100%", position: "absolute" }}>
        <View style={{ height: (StatusBarData.currentHeight || 0) + 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <BurgerButton />
          </Pressable>
          <Logo />
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 32 / 2,
              backgroundColor: Colors.violet40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 29,
                height: 29,
                borderRadius: 29 / 2,
                borderColor: "white",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NoAvatar />
            </View>
          </View>
        </View>
        <DollsCarousel
          data={renderedDolls}
          onIndexChange={(value, next) => {
            setCurrentDoll(value);
            setCurrentDollNext(next);
          }}
          onShift={(v) => (shift.value = v)}
        />
      </View>
    </View>
  );
};
