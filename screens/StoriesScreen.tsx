import { useDimensions } from "@react-native-community/hooks";
import { useRoute } from "@react-navigation/native";
import { View, Image, FlatList, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Carousel from "react-native-snap-carousel";
import { DollMainText } from "../components/DollsCarousel";
import { Colors, Fonts } from "../resources";
import { RichView } from "../components/RichView";
import { Button } from "../components/Button";
import { LowPlayer } from "../components/LowPlayer";
import romans from "romans";
import { useEffect, useMemo, useState } from "react";
import { dispatch } from "use-bus";
import { useStories } from "../api/stories";
import { useDoll } from "../api/dolls";
import { makeTimeStringFromMs } from "../hooks/playerHelper";

import HeartIcon from "../icons/HeartSmall";

export const StoriesScreen = () => {
  const route = useRoute<any>();
  const { screen: screenSize } = useDimensions();
  const selectedIndex = useSharedValue(0);
  const [currentSeason, setCurrentSeason] = useState<number | null>(null);
  const [currentStory, setCurrentStory] = useState<number | null>(null);
  const { data: stories } = useStories(route.params.doll);
  const { data: doll } = useDoll(route.params.doll);

  const fakeArray = useMemo(
    () => [
      require("../assets/white-pixel.png").uri,
      require("../assets/white-pixel.png").uri,
    ],
    []
  );
  const storyViewArray = useMemo(
    () =>
      doll
        ? doll.storyViewCarousel
          ? [doll.storyViewCarousel[0], doll.storyViewCarousel[1]]
          : fakeArray
        : fakeArray,
    [doll, fakeArray]
  );

  useEffect(() => {
    if (!currentSeason || !currentStory) return;
    dispatch({
      type: `UI_BOTTOM_PLAYER_SET_PROGRESS/s${currentSeason}e${currentStory}`,
      // position,
      position: 0,
    });
  }, [
    currentSeason,
    currentStory,
    // position
  ]);

  return (
    <FlatList
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{ height: 80 }} />}
      renderItem={({ item, index }) => (
        <View key={`story-${item.season}-${item.episode}`}>
          {item.episode === 0 && (
            <Text
              style={{
                marginTop: index === 0 ? 36 : 17,
                textAlign: "center",
                color: Colors.dark25,
                fontFamily: Fonts.firasansRegular,
                fontSize: 10,
                lineHeight: 12,
                textTransform: "uppercase",
                letterSpacing: 0.08,
              }}
            >
              {romans.romanize(item.season + 1)} сезон
            </Text>
          )}
          <Pressable
            onPress={() => {
              dispatch("UI_BOTTOM_PLAYER_EXPAND");
              dispatch({
                type: "UI_BOTTOM_PLAYER_SET_DOLL_ID",
                value: doll?.id,
              });
              dispatch({
                type: "UI_BOTTOM_PLAYER_SET_STORY_ID",
                value: item.id,
              });
            }}
            style={{
              paddingLeft: 16,
              paddingRight: 24,
              backgroundColor: undefined,
              // currentSeason === item.season &&
              // currentStory === item.episode &&
              // isPlaying
              //   ? "#f6f6f6"
              //   : undefined,
            }}
          >
            {
              <LowPlayer
                id={`s${item.season}e${item.episode}`}
                title={item.title}
                description={makeTimeStringFromMs(item.duration)}
                cover={item.cover}
                titleHilighted
                icon={<HeartIcon />}
                isPlaying={
                  false
                  // currentSeason === item.season &&
                  // currentStory === item.episode &&
                  // isPlaying
                }
                onCoverClick={async () => {
                  setCurrentSeason(item.season);
                  setCurrentStory(item.episode);
                  // isPlaying ? await pause() : await play();
                }}
              />
            }
            {(stories
              ? index !== stories.length - 1 &&
                stories[index + 1].season === item.season
              : false) && (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.light60,
                  marginHorizontal: 22,
                }}
              />
            )}
          </Pressable>
        </View>
      )}
      data={stories}
      ListHeaderComponent={
        <>
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
            <View
              style={{
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Carousel
                inactiveSlideScale={1}
                onScrollIndexChanged={(v) => (selectedIndex.value = v)}
                vertical={false}
                data={storyViewArray}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: "100%",
                      aspectRatio: 375 / 455,
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        flex: 1,
                      }}
                    />
                    {index === 1 && (
                      <View
                        style={{
                          paddingHorizontal: 16,
                          bottom: 52,
                          position: "absolute",
                          width: "100%",
                          borderRadius: 30,
                        }}
                      >
                        <Button>Купить куклу</Button>
                      </View>
                    )}
                  </View>
                )}
                sliderWidth={screenSize.width}
                itemWidth={screenSize.width}
              />
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 18,
                  flexDirection: "row",
                  height: 16,
                  alignItems: "center",
                }}
              >
                {storyViewArray.map((_, i) => (
                  <Animated.View
                    key={`pagination-item-${i}`}
                    style={useAnimatedStyle(() => ({
                      width: withSpring(selectedIndex.value === i ? 16 : 8),
                      aspectRatio: 1,
                      borderRadius: withSpring(
                        selectedIndex.value === i ? 16 / 2 : 8 / 2
                      ),
                      backgroundColor: Colors.pink80,
                      marginLeft: i === 0 ? 0 : 16,
                    }))}
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                paddingBottom: 25,
                paddingHorizontal: 29,
                alignItems: "center",
              }}
            >
              {doll && <DollMainText title={doll.title} />}
            </View>
          </View>
          {doll && (
            <View style={{ marginTop: 27 }}>
              <RichView data={doll.description} />
            </View>
          )}
        </>
      }
    />
  );
};
