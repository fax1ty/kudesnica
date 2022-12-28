import { useLink } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePreviousImmediate } from "rooks";
import { dispatch } from "use-bus";

import { useDolls } from "../api/dolls";
import { useProfile } from "../api/profile";
import { useStories } from "../api/stories";
import { Avatar } from "../components/Avatar";
import { DollsCarousel } from "../components/DollsCarousel";
import BurgerButton from "../icons/BurgerButton";
import Logo from "../icons/Logo";
import { Colors, Values } from "../resources";
import { useGlobalStore } from "../stores/global";
import { updateCurrentlyPlaying } from "../utils/audio";

export default function Dolls() {
  const [currentDoll, setCurrentDoll] = useState(0);
  const [isCurrentDollNext, setCurrentDollNext] = useState(false);
  const isPreviousDollNext = usePreviousImmediate(isCurrentDollNext);
  const navigate = useLink();
  const shift = useSharedValue(0);
  const { data: dolls } = useDolls();
  const { data: stories } = useStories(
    dolls
      ? isCurrentDollNext || isPreviousDollNext
        ? undefined
        : dolls[currentDoll].id
      : undefined
  );
  // prefetch our profile
  const { data: profile } = useProfile();
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);

  useEffect(() => {
    if (!dolls || !stories) return;
    if (isCurrentDollNext) return;
    const doll = dolls[currentDoll];
    const story = stories.items[0];
    updateCurrentlyPlaying(doll, story);
  }, [stories, isCurrentDollNext, dolls, currentDoll]);

  const renderedDolls = useMemo(
    () => [
      ...(dolls?.map((doll) => ({
        ...doll,
        next: false,
        unwatched: stories?.unwatchedTotal || 0,
      })) || []),
      {
        title: "Новая героиня",
        id: "next",
        dollsCarouselPhoto: {
          background: "https://i.imgur.com/QdPEhBj.png",
          label: "https://i.imgur.com/2bYt9QL.png",
        },
        storyViewCarousel: [],
        next: true,
        description: [],
        unwatched: 0,
        storeLinks: [],
      },
    ],
    [dolls, stories]
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
            { scale: 1.5 },
            {
              translateX: withSpring(shift.value * -1, { damping: 100000 }),
            },
          ],
        }))}
        source={require("../assets/dolls-parallax-bg.png")}
      />
      <Animated.Image
        style={useAnimatedStyle(() => ({
          width: 607,
          height: 342,
          position: "absolute",
          bottom: 0,
          transform: [
            { scale: 2 },
            { translateY: 342 / 3 - Values.bottomPlayerHeight },
            {
              translateX: withSpring((607 / 2.5) * -1 + shift.value * 1, {
                damping: 100000,
              }),
            },
          ],
        }))}
        source={require("../assets/cloud.png")}
      />
      <SafeAreaView
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Pressable onPress={() => dispatch("UI_DRAWER_OPEN")}>
            <BurgerButton />
          </Pressable>
          <Logo />
          <Avatar
            avatar={null}
            onPress={() => {
              if (!profile) return openAuthOnlyModal();
              navigate.push("/user");
            }}
            size="small"
          />
        </View>
        <View style={{ flex: 1, marginBottom: Values.bottomPlayerHeight }}>
          <DollsCarousel
            data={renderedDolls}
            onIndexChange={(value, next) => {
              setCurrentDoll(value);
              setCurrentDollNext(next);
            }}
            onShift={(v) => (shift.value = v)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
