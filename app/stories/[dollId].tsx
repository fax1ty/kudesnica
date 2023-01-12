import { useDimensions } from "@react-native-community/hooks";
import { useHref } from "expo-router";
import { useMemo, useState } from "react";
import { View, Image, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import romans from "romans";
import { mutate } from "swr";
import { dispatch } from "use-bus";

import { useDoll } from "../../api/dolls";
import { useProfile } from "../../api/profile";
import {
  addStoryToFavorites,
  IStory,
  removeStoryFromFavorites,
  useStories,
} from "../../api/stories";
import { Button } from "../../components/Button";
import { DollMainText } from "../../components/DollsCarousel";
import { IndependentText as Text } from "../../components/IndependentText";
import { LowPlayer } from "../../components/LowPlayer";
import { Pagination } from "../../components/Pagination";
import { RichView } from "../../components/RichView";
import { ScreenTitle } from "../../components/ScreenTitle";
import HeartIcon from "../../icons/HeartSmall";
import HeartFilledIcon from "../../icons/HeartSmallFilled";
import { Colors, Fonts, Values } from "../../resources";
import { useAudioStore } from "../../stores/audio";
import { useGlobalStore } from "../../stores/global";
import { updateCurrentlyPlaying } from "../../utils/audio";
import { makeTimeStringFromMs } from "../../utils/time";

export default function Stories() {
  const {
    params: { dollId },
  } = useHref();
  const { screen: screenSize } = useDimensions();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: stories, mutate: mutateStories } = useStories(dollId);
  const { data: doll } = useDoll(dollId);
  const { data: profile } = useProfile();
  const insets = useSafeAreaInsets();
  const openPremiumStoryModal = useGlobalStore(
    (state) => state.openPremiumStoryModal
  );
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);
  const currentlyPlayingStoryId = useAudioStore(
    (state) => state.currentlyPlaying.storyId
  );
  const openStoreLinksModal = useGlobalStore(
    (state) => state.openStoreLinksModal
  );
  const setStoreLinksModalUrls = useGlobalStore(
    (state) => state.setStoreLinksModalUrls
  );

  const fakeArray = useMemo(
    () => [
      require("../../assets/white-pixel.png").uri,
      require("../../assets/white-pixel.png").uri,
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

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        style={{ width: "100%", height: "100%", position: "absolute" }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ height: Values.bottomPlayerHeight }} />
        }
        renderItem={({ item, index }) => (
          <View key={`story-${item.season}-${item.episode}`}>
            {item.episode === 0 && (
              <Text
                style={{
                  marginTop: index === 0 ? 36 : 17,
                  marginBottom: 9,
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
              onPress={async () => {
                if (!doll) return;

                if (item.premium && !profile?.premium)
                  return openPremiumStoryModal();

                await mutate<IStory>(
                  `/stories/${dollId}/${item.id}`,
                  (old) => ({ ...old!, watched: true }),
                  false
                );
                await mutate(`/dolls/${dollId}/storiesList`);

                dispatch("UI_STORY_EXPAND");
                await updateCurrentlyPlaying(doll, item);
              }}
              style={{
                paddingLeft: 16,
                paddingRight: 24,
                backgroundColor:
                  currentlyPlayingStoryId === item.id ? "#f6f6f6" : undefined,
              }}
            >
              <LowPlayer
                dollId={doll?.id}
                duration={item.audio.duration}
                id={item.id}
                title={item.title}
                description={makeTimeStringFromMs(item.audio.duration)}
                cover={item.cover}
                titleHilighted={!item.watched}
                icon={
                  item.isFavorite ? (
                    <HeartFilledIcon
                      onPress={async () => {
                        if (!profile) return openAuthOnlyModal();
                        await removeStoryFromFavorites(doll!.id, item.id);
                        await mutate<IStory>(
                          `/stories/${dollId}/${item.id}`,
                          (old) => ({ ...old!, isFavorite: false }),
                          false
                        );
                        await mutateStories();
                      }}
                    />
                  ) : (
                    <HeartIcon
                      onPress={async () => {
                        if (!profile) return openAuthOnlyModal();
                        await addStoryToFavorites(doll!.id, item.id);
                        await mutate<IStory>(
                          `/stories/${dollId}/${item.id}`,
                          (old) => ({ ...old!, isFavorite: true }),
                          false
                        );
                        await mutateStories();
                      }}
                    />
                  )
                }
              />
              {(stories
                ? index !== stories.items.length - 1 &&
                  stories.items[index + 1].season === item.season
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
        data={stories?.items}
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
                source={require("../../assets/story-player-blur.png")}
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
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  onScrollIndexChanged={setSelectedIndex}
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
                          <Button
                            onPress={() => {
                              console.log(doll, "meow");
                              if (!doll) return;
                              setStoreLinksModalUrls(doll.storeLinks);
                              openStoreLinksModal();
                            }}
                          >
                            Купить куклу
                          </Button>
                        </View>
                      )}
                    </View>
                  )}
                  sliderWidth={screenSize.width}
                  itemWidth={screenSize.width}
                />
                <Pagination
                  itemsCount={storyViewArray.length}
                  currentIndex={selectedIndex}
                  style={{
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 18,
                  }}
                  activeColor={Colors.pink100}
                  inactiveColor={Colors.pink80}
                />
              </View>
              <View
                style={{
                  paddingBottom: 25,
                  paddingHorizontal: 29,
                  alignItems: "center",
                }}
              >
                {doll && (
                  <DollMainText
                    title={doll.title}
                    unwatched={stories?.unwatchedTotal || 0}
                  />
                )}
              </View>
            </View>
            {doll && (
              <View style={{ marginTop: 27 }}>
                <RichView
                  dollAvatar={doll.chatAvatar}
                  data={doll.description}
                  dollId={doll.id}
                  storyId="doesntmatter"
                />
              </View>
            )}
          </>
        }
      />
      <View
        style={{
          height: Values.titleHeight,
          position: "absolute",
          top: insets.top,
          paddingHorizontal: 16,
        }}
      >
        <ScreenTitle style={{}}> </ScreenTitle>
      </View>
    </View>
  );
}
