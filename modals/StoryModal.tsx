import BottomSheet, {
  useBottomSheet,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import { useDimensions } from "@react-native-community/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, View, ViewToken } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mutate } from "swr";
import useBus from "use-bus";

import { IDoll, useDoll } from "../api/dolls";
import { useProfile } from "../api/profile";
import {
  addStoryToFavorites,
  getNextStoryId,
  getStory,
  IStory,
  removeStoryFromFavorites,
  useStory,
} from "../api/stories";
import { Button } from "../components/Button";
import { CustomBackdrop } from "../components/CustomBackdrop";
import { IndependentText as Text } from "../components/IndependentText";
import { LoadableImage } from "../components/LoadableImage";
import { LowPlayer } from "../components/LowPlayer";
import { Player } from "../components/Player";
import { generateComponentsFromRichComponents } from "../components/RichView";
import { Skeleton } from "../components/Skeleton";
import { useBottomSheetBackHandler } from "../hooks/bottom-sheet";
import ArrowDownButton from "../icons/ArrowDownButton";
import ArrowUpIcon from "../icons/ArrowUp";
import HeartIcon from "../icons/Heart";
import HeartFilledIcon from "../icons/HeartFilled";
import { Colors, Fonts, Values } from "../resources";
import { useGlobalStore } from "../stores/global";
import { updateCurrentlyPlaying } from "../utils/audio";
import { percentageOf } from "../utils/math";

const MODAL_OPEN_SNAP_NORMALIZED = 0.95;
// const SHADOW_HEIGHT = 5;
const SHADOW_HEIGHT = 0;

export interface IStoryData {
  content: string;
  episode: number;
  season: number;
  cover: string;
  audio: {
    url: string;
  };
}

interface ContentProps {
  story?: IStory;
  doll?: IDoll;
}

interface Props {
  storyId: string | null;
  dollId: string | null;
}

const SheetContent = ({ story, doll }: ContentProps) => {
  const { animatedIndex, expand, collapse } = useBottomSheet();
  const scroll = useRef<BottomSheetFlatListMethods>(null);
  const insets = useSafeAreaInsets();
  const { window: windowSize } = useDimensions();
  const components = useMemo(
    () =>
      generateComponentsFromRichComponents(
        story?.cover,
        doll?.id,
        story?.id,
        story?.media,
        story?.content,
        story?.chat
      ),
    [doll, story]
  );
  const { data: profile } = useProfile();
  const [lastViewableItemIndex, setLastViewableItemIndex] = useState<
    number | null
  >(null);
  const isBottomPlayerVisible = useMemo(
    () =>
      typeof lastViewableItemIndex !== "number"
        ? false
        : lastViewableItemIndex >= 3,
    [lastViewableItemIndex]
  );
  const openPremiumStoryModal = useGlobalStore(
    (state) => state.openPremiumStoryModal
  );
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);

  useEffect(() => {
    scroll.current?.scrollToOffset({ animated: false, offset: 0 });
    setLastViewableItemIndex(-1);
  }, [story]);

  // https://github.com/facebook/react-native/issues/30171#issuecomment-711154425
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 75 },
      onViewableItemsChanged: (data: { viewableItems: ViewToken[] }) => {
        if (!data || !data.viewableItems || data.viewableItems.length === 0)
          return;
        setLastViewableItemIndex(
          data.viewableItems[data.viewableItems.length - 1].index
        );
      },
    },
  ]);

  useBus("UI_STORY_EXPAND", () => expand());

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <BottomSheetFlatList
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        ref={scroll}
        style={{
          flex: 1,
          backgroundColor: Colors.light100,
        }}
        showsVerticalScrollIndicator={false}
        data={components}
        renderItem={({ item, index }) =>
          index === 0 ? <View style={{ paddingTop: 22 }}>{item}</View> : item
        }
        ListHeaderComponent={
          <Animated.View
            style={useAnimatedStyle(() => ({
              flex: 1,
              opacity: interpolate(
                animatedIndex.value,
                [0, 1],
                [0, 1],
                Extrapolate.CLAMP
              ),
            }))}
          >
            <View
              style={{
                position: "relative",
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  backgroundColor: Colors.light60,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                source={require("../assets/story-player-blur.png")}
              />
              <View style={{ position: "relative" }}>
                <LoadableImage
                  source={{ uri: story?.cover }}
                  style={{
                    marginTop: 30,
                    alignSelf: "center",
                    width: 300,
                    aspectRatio: 1,
                    borderRadius: 300 / 2,
                    backgroundColor: "#eee",
                  }}
                />
                <View
                  style={{ paddingHorizontal: 26, marginTop: 24 }}
                  pointerEvents={story ? undefined : "none"}
                >
                  <Player
                    storyId={story?.id}
                    duration={story?.audio.duration || 0}
                  />
                </View>
                {story ? (
                  <Text
                    style={{
                      fontSize: 26,
                      lineHeight: 30,
                      fontFamily: Fonts.playfairDisplayItalic,
                      color: Colors.dark75,
                      textAlign: "center",
                      marginTop: 21,
                      paddingLeft: 27,
                      paddingRight: 28,
                    }}
                  >
                    {story.title}
                  </Text>
                ) : (
                  <Skeleton
                    width={300}
                    height={30}
                    borderRadius={8}
                    style={{ alignSelf: "center", marginTop: 21 }}
                  />
                )}
                {story ? (
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontSize: 10,
                      lineHeight: 12,
                      letterSpacing: 0.08,
                      fontFamily: Fonts.firasansRegular,
                      color: Colors.dark50,
                      textAlign: "center",
                      marginTop: 15,
                      marginBottom: 25,
                    }}
                  >
                    {story.episode + 1} история, {story.season + 1} сезон
                  </Text>
                ) : (
                  <Skeleton
                    width={100}
                    height={12}
                    borderRadius={8}
                    style={{
                      alignSelf: "center",
                      marginTop: 15,
                      marginBottom: 25,
                    }}
                  />
                )}
              </View>
            </View>
          </Animated.View>
        }
        ListFooterComponent={
          <View style={{ paddingLeft: 27, paddingRight: 19 }}>
            {story && !story.isLastInSeason && (
              <Button
                theme="outlined"
                style={{ marginTop: 25 }}
                onPress={async () => {
                  if (!doll || !story) return;
                  const nextStoryId = await getNextStoryId(doll.id, story.id);
                  const nextStory = await getStory(doll.id, nextStoryId);
                  if (nextStory.premium && !profile?.premium)
                    return openPremiumStoryModal();
                  await updateCurrentlyPlaying(doll, nextStory);
                }}
              >
                Следующая история →
              </Button>
            )}
            <View style={{ height: Values.bottomPlayerHeight + 37 }} />
          </View>
        }
      />
      {/* Нижний плеер */}
      <Animated.View
        style={useAnimatedStyle(() => ({
          zIndex: 10000,
          overflow: "hidden",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: "absolute",
          width: "100%",
          top: interpolate(
            animatedIndex.value,
            [0, 1],
            [
              0,
              (windowSize.height + insets.top) * MODAL_OPEN_SNAP_NORMALIZED -
                (animatedIndex.value === 0
                  ? Values.bottomPlayerHeight + SHADOW_HEIGHT
                  : isBottomPlayerVisible
                  ? Values.bottomPlayerHeight + SHADOW_HEIGHT
                  : 0),
            ],
            Extrapolate.CLAMP
          ),
        }))}
      >
        <View
          // onPress={() => expand()}
          style={{
            height: Values.bottomPlayerHeight + SHADOW_HEIGHT,
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              top: 0,
              left: 0,
            }}
          >
            {/* <Image
              source={require("../assets/low-player-bg.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            /> */}
            <View
              style={{
                bottom: 0,
                position: "absolute",
                width: "100%",
                height: Values.bottomPlayerHeight,
                backgroundColor: Colors.light100,
              }}
            />
            <LowPlayer
              styles={{
                paddingHorizontal: 20,
                position: "absolute",
                bottom: 0,
              }}
              PressableComponent={TouchableWithoutFeedback}
              duration={story?.audio.duration}
              dollId={doll?.id}
              id={story?.id}
              cover={story?.cover}
              title={doll?.title}
              description={story?.title}
              icon={
                <TouchableWithoutFeedback
                  onPress={() => {
                    expand();
                  }}
                  style={{}}
                >
                  <View
                    style={{
                      width: 40,
                      height: 80,
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginLeft: 20,
                    }}
                  >
                    <ArrowUpIcon />
                  </View>
                </TouchableWithoutFeedback>
              }
            />
          </View>
        </View>
      </Animated.View>
      {/* Верхний градиент */}
      <Animated.View
        style={useAnimatedStyle(() => ({
          width: "100%",
          height: 61 + 13,
          position: "absolute",
          opacity: animatedIndex.value,
        }))}
      >
        <Animated.View
          style={useAnimatedStyle(() => ({
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: withSpring(isBottomPlayerVisible ? 1 : 0, {
              damping: 100000,
            }),
          }))}
        >
          <View style={{ height: 61, backgroundColor: "white" }} />
          <LinearGradient
            colors={["white", "rgba(255, 255, 255, 0)"]}
            style={{
              height: 13,
            }}
          />
        </Animated.View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ArrowDownButton onPress={() => collapse()} />
          {story && (
            <TouchableWithoutFeedback
              style={{
                width: 40,
                height: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={async () => {
                if (!doll || !story) return;
                if (!profile) return openAuthOnlyModal();

                if (story.isFavorite)
                  await removeStoryFromFavorites(doll.id, story.id);
                else await addStoryToFavorites(doll.id, story.id);
                await mutate<IStory>(
                  `/stories/${doll.id}/${story.id}`,
                  (old) => ({
                    ...old!,
                    isFavorite: !story.isFavorite,
                  }),
                  false
                );
                await mutate("/stories/favorites");
              }}
            >
              {story.isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
            </TouchableWithoutFeedback>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export const StoryModal = ({ dollId, storyId }: Props) => {
  const { screen: screenSize } = useDimensions();
  const snapPoints = useMemo(
    () => [
      `${percentageOf(
        Values.bottomPlayerHeight + SHADOW_HEIGHT,
        screenSize.height
      )}%`,
      `${MODAL_OPEN_SNAP_NORMALIZED * 100}%`,
    ],
    [screenSize]
  );
  const { data: story, isValidating } = useStory(dollId, storyId);
  const { data: doll } = useDoll(dollId);
  const ref = useRef<BottomSheet>(null);

  const { handleSheetPositionChange } = useBottomSheetBackHandler(ref, false);

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  // }, [storyId, dollId]);

  // useEffect(() => {
  //   if (loading && !isValidating) setLoading(false);
  // }, [loading, isValidating]);

  return (
    <BottomSheet
      ref={ref}
      onChange={handleSheetPositionChange}
      enableContentPanningGesture={Boolean(dollId && storyId)}
      enableHandlePanningGesture={Boolean(dollId && storyId)}
      snapPoints={snapPoints}
      handleComponent={null}
      containerStyle={{
        position: "relative",
      }}
      style={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: "hidden",
      }}
      backdropComponent={CustomBackdrop}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
    >
      <SheetContent story={isValidating ? undefined : story} doll={doll} />
    </BottomSheet>
  );
};
