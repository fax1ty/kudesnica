import { useMemo, useRef, useState } from "react";
import { Player } from "../components/Player";
import { generateComponentsFromRichComponents } from "../components/RichView";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheet,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Image, View, Text, Pressable } from "react-native";
import { ShadowView } from "@dotmind/rn-shadow-generator";
import { useDimensions } from "@react-native-community/hooks";
import { percentageOf } from "../utils/math";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useBus, { dispatch } from "use-bus";
import { Colors, Fonts } from "../resources";
import InView from "../components/VisibilityTracker";
import { Button } from "../components/Button";
import { LowPlayer } from "../components/LowPlayer";
import { useStory } from "../api/stories";
import { useDoll } from "../api/dolls";
import { LoadableImage } from "../components/LoadableImage";
import { Skeleton } from "../components/Skeleton";
import { LinearGradient } from "expo-linear-gradient";

import ArrowUpIcon from "../icons/ArrowUp";
import ArrowDownButton from "../icons/ArrowDownButton";
import HeartIcon from "../icons/Heart";

const PLAYER_HEIGHT = 80;
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

interface Props {
  storyId: string | null;
  dollId: string | null;
}

const SheetContent = ({ storyId, dollId }: Props) => {
  const { animatedIndex, expand, collapse } = useBottomSheet();
  const scroll = useRef<BottomSheetFlatListMethods>(null);
  const { screen: screenSize } = useDimensions();
  const [isTopPlayerVisible, setIsTopPlayerVisible] = useState(false);
  const { data: story } = useStory(dollId, storyId);
  const { data: doll } = useDoll(dollId);
  const components = useMemo(
    () => (story ? generateComponentsFromRichComponents(story.content) : []),
    [story]
  );

  useBus("UI_BOTTOM_PLAYER_EXPAND", () => expand());

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <BottomSheetFlatList
        ref={scroll}
        style={{
          flex: 1,
          backgroundColor: Colors.light100,
        }}
        showsVerticalScrollIndicator={false}
        data={components.length === 0 ? [null, null, null] : components}
        renderItem={({ item, index }) =>
          components.length === 0 ? (
            <Skeleton width={200} height={12} borderRadius={8} />
          ) : index === 0 ? (
            <View style={{ paddingTop: 22 }}>{item}</View>
          ) : (
            item
          )
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
                    height: 300,
                    borderRadius: 400 / 2,
                  }}
                />
                <View style={{ paddingHorizontal: 26, marginTop: 24 }}>
                  <InView onChange={setIsTopPlayerVisible}>
                    <Player
                      url={story?.audio.url}
                      onProgressChange={(value) => {
                        dispatch({
                          type: "UI_BOTTOM_PLAYER_SET_PROGRESS/main",
                          value,
                        });
                      }}
                    />
                  </InView>
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
          <View style={{ paddingLeft: 27, paddingRight: 19, marginTop: 22 }}>
            {components.length > 0 && (
              <Button theme="outlined" style={{ marginTop: 25 }}>
                Следующая история →
              </Button>
            )}
            <View style={{ height: PLAYER_HEIGHT + 37 }} />
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
                  ? PLAYER_HEIGHT
                  : isTopPlayerVisible
                  ? 0
                  : PLAYER_HEIGHT),
            ],
            Extrapolate.CLAMP
          ),
        }))}
      >
        <ShadowView
          level={22}
          shadowColor="#000"
          direction="top"
          style={{
            height: PLAYER_HEIGHT,
            width: "100%",
            paddingHorizontal: 20,
            backgroundColor: "white",
          }}
        >
          <LowPlayer
            id="main"
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
        </ShadowView>
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
      `${percentageOf(PLAYER_HEIGHT, screenSize.height)}%`,
      `${MODAL_OPEN_SNAP}%`,
    ],
    [screenSize, PLAYER_HEIGHT, MODAL_OPEN_SNAP]
  );

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
      }}
      containerStyle={{
        position: "relative",
      }}
      backdropComponent={BottomSheetBackdrop}
      backgroundStyle={{ backgroundColor: "transparent" }}
    >
      <SheetContent storyId={storyId} dollId={dollId} />
    </BottomSheet>
  );
};
