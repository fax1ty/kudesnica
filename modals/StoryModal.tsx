import { useMemo, useRef, useState } from "react";
import { Player } from "../components/Player";
import { generateComponentsFromRichComponents } from "../components/RichView";
import BottomSheet, {
  useBottomSheet,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Image, View, Text, Pressable } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import { percentageOf } from "../utils/math";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useBus from "use-bus";
import { Colors, Fonts, Values } from "../resources";
// import InView from "../components/VisibilityTracker";
import { Button } from "../components/Button";
import { LowPlayer } from "../components/LowPlayer";
import { getNextStoryId, getStory, IStory, useStory } from "../api/stories";
import { IDoll, useDoll } from "../api/dolls";
import { LoadableImage } from "../components/LoadableImage";
import { Skeleton } from "../components/Skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { updateCurrentlyPlaying } from "../utils/audio";
import { useGlobalStore } from "../store";
import { useProfile } from "../api/profile";
import { CustomBackdrop } from "../components/CustomBackdrop";

import ArrowUpIcon from "../icons/ArrowUp";
import ArrowDownButton from "../icons/ArrowDownButton";
import HeartIcon from "../icons/Heart";

const MODAL_OPEN_SNAP = 95;
const MODAL_OPEN_SNAP_NORMALIZED = 0.95;

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
  const { screen: screenSize } = useDimensions();
  const [isTopPlayerVisible, setIsTopPlayerVisible] = useState(false);
  const components = useMemo(
    () => (story ? generateComponentsFromRichComponents(story.content) : []),
    [story]
  );
  const store = useGlobalStore();
  const { data: profile } = useProfile();

  useBus("UI_STORY_EXPAND", () => expand());

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <BottomSheetFlatList
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
                  url={story?.cover}
                  style={{
                    marginTop: 30,
                    alignSelf: "center",
                    width: 300,
                    aspectRatio: 1,
                    borderRadius: 300 / 2,
                  }}
                />
                <View style={{ paddingHorizontal: 26, marginTop: 24 }}>
                  {/* massive performance impact!  */}
                  {/* <InView onChange={setIsTopPlayerVisible}> */}
                  <Player
                    storyId={story?.id}
                    duration={story?.audio.duration || 0}
                  />
                  {/* </InView> */}
                </View>
                {story ? (
                  <Text
                    style={{
                      fontSize: 26,
                      lineHeight: 30,
                      fontFamily: Fonts.playfairdisplayItalic,
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
                  <Skeleton width="100%" height={30} borderRadius={8} />
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
                  <Skeleton width={100} height={12} borderRadius={8} />
                )}
              </View>
            </View>
          </Animated.View>
        }
        ListFooterComponent={
          <View style={{ paddingLeft: 27, paddingRight: 19 }}>
            {!story?.isLastInSeason && (
              <Button
                theme="outlined"
                style={{ marginTop: 25 }}
                onPress={async () => {
                  if (!doll || !story || !profile) return;
                  const nextStoryId = await getNextStoryId(doll.id, story.id);
                  const nextStory = await getStory(doll.id, nextStoryId);
                  if (nextStory.premium && !profile.premium)
                    return store.openPremiumStoryModal();
                  updateCurrentlyPlaying(store, doll, nextStory);
                }}
              >
                Следующая история →
              </Button>
            )}
            <View style={{ height: Values.bottomPlayerHeight + 37 }} />
          </View>
        }
      />
      <Animated.View
        style={useAnimatedStyle(() => ({
          position: "absolute",
          width: "100%",
          top: interpolate(
            animatedIndex.value,
            [0, 1],
            [
              0,
              screenSize.height * MODAL_OPEN_SNAP_NORMALIZED -
                (animatedIndex.value === 0
                  ? Values.bottomPlayerHeight
                  : isTopPlayerVisible
                  ? 0
                  : Values.bottomPlayerHeight),
            ],
            Extrapolate.CLAMP
          ),
        }))}
      >
        <Pressable
          onPress={() => console.log("test")}
          style={{
            height: Values.bottomPlayerHeight,
            width: "100%",
            paddingHorizontal: 20,
            backgroundColor: "white",
          }}
        >
          <LowPlayer
            duration={story?.audio.duration}
            dollId={doll?.id}
            id={story?.id}
            cover={story?.cover}
            title={doll?.title}
            description={story?.title}
            icon={
              story &&
              doll && (
                <Pressable
                  onPress={() => expand()}
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 20,
                  }}
                >
                  <ArrowUpIcon />
                </Pressable>
              )
            }
          />
        </Pressable>
      </Animated.View>
      <Animated.View
        style={useAnimatedStyle(() => ({
          width: "100%",
          height: 25 + 70,
          position: "absolute",
          opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
          ),
        }))}
      >
        <LinearGradient
          colors={["#fff", "rgba(255, 255, 255, 0)"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
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
          <HeartIcon />
        </View>
      </Animated.View>
    </View>
  );
};

export const StoryModal = ({ dollId, storyId }: Props) => {
  const { screen: screenSize } = useDimensions();
  const snapPoints = useMemo(
    () => [
      `${percentageOf(Values.bottomPlayerHeight, screenSize.height)}%`,
      `${MODAL_OPEN_SNAP}%`,
    ],
    [screenSize, Values.bottomPlayerHeight, MODAL_OPEN_SNAP]
  );
  const { data: story } = useStory(dollId, storyId);
  const { data: doll } = useDoll(dollId);

  return (
    <BottomSheet
      enableContentPanningGesture={Boolean(dollId && storyId)}
      enableHandlePanningGesture={Boolean(dollId && storyId)}
      snapPoints={snapPoints}
      handleComponent={null}
      style={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: "hidden",
        // Shadow
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
        //
      }}
      containerStyle={{
        position: "relative",
      }}
      backdropComponent={CustomBackdrop}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
    >
      <SheetContent story={story} doll={doll} />
    </BottomSheet>
  );
};
