import { DrawerActions, useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors, Values } from "../resources";
import { DollsCarousel } from "../components/DollsCarousel";
import { useDolls } from "../api/dolls";
import { useEffect, useMemo, useState } from "react";
import { useStories } from "../api/stories";
import { Avatar } from "../components/Avatar";
import { useProfile } from "../api/profile";
import { updateCurrentlyPlaying } from "../utils/audio";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalStore } from "../stores/global";

import BurgerButton from "../icons/BurgerButton";
import Logo from "../icons/Logo";

export const DollsScreen = () => {
  const [currentDoll, setCurrentDoll] = useState(0);
  const [isCurrentDollNext, setCurrentDollNext] = useState(false);
  const navigation = useNavigation<any>();
  const shift = useSharedValue(0);
  const { data: dolls } = useDolls();
  const { data: stories } = useStories(
    dolls ? (isCurrentDollNext ? undefined : dolls[currentDoll].id) : undefined
  );
  // prefetch our profile
  const { data: profile, error } = useProfile();
  const insets = useSafeAreaInsets();
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);

  useEffect(() => {
    if (!dolls || !stories) return;
    if (isCurrentDollNext) return;
    const doll = dolls[currentDoll];
    const story = stories.items[0];
    updateCurrentlyPlaying(doll, story);
  }, [stories, isCurrentDollNext]);

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
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <View style={{ height: insets.top + 20 }} />
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
          <Avatar
            avatar={null}
            onPress={() => {
              if (!profile) return openAuthOnlyModal();
              navigation.navigate("User");
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
      </View>
    </View>
  );
};
