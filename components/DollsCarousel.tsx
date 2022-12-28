import { useDimensions } from "@react-native-community/hooks";
import { useLink } from "expo-router";
import { Image, Pressable, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import { IDoll } from "../api/dolls";
import BellIcon from "../icons/Bell";
import { Colors, Fonts } from "../resources";
import { IndependentText as Text } from "./IndependentText";
import { LoadableImage } from "./LoadableImage";
import { Pin } from "./Pin";

interface Props {
  onShift?: (v: number) => void;
  onIndexChange?: (v: number, next: boolean) => void;
  data: (IDoll & { next: boolean; unwatched: number })[];
}

export const DollMainText = ({
  isNext = false,
  title,
  unwatched,
}: {
  isNext?: boolean;
  title: string;
  unwatched: number;
}) => {
  return (
    <>
      <Text
        style={{
          marginTop: 17,
          fontSize: 32,
          color: Colors.violet100,
          lineHeight: 37,
          fontFamily: Fonts.playfairDisplayItalic,
          width: "100%",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <View
        style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}
      >
        {!isNext && (
          <>
            <Pin>{unwatched}</Pin>
            <Text
              style={{
                color: Colors.dark75,
                fontFamily: Fonts.firasansRegular,
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: 0.08,
                textTransform: "uppercase",
                marginLeft: 7,
              }}
            >
              Новых историй
            </Text>
          </>
        )}
        {isNext && (
          <>
            <BellIcon />
            <Text
              style={{
                color: Colors.violet100,
                fontFamily: Fonts.firasansRegular,
                fontSize: 10,
                lineHeight: 12,
                letterSpacing: 0.08,
                textTransform: "uppercase",
                marginLeft: 6,
              }}
            >
              Узнать первым об историях
            </Text>
          </>
        )}
      </View>
    </>
  );
};

export const DollsCarousel = ({ data, onShift, onIndexChange }: Props) => {
  const { screen: screenSize } = useDimensions();
  const navigate = useLink();

  return (
    <Carousel
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      onScrollIndexChanged={(value) => {
        if (onIndexChange) onIndexChange(value, data[value].next);
      }}
      onScroll={({ nativeEvent }) => {
        if (onShift) onShift(nativeEvent.contentOffset.x);
      }}
      contentContainerCustomStyle={{
        alignItems: "center",
      }}
      vertical={false}
      data={data}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            if (item.next) return;
            navigate.push(`/stories/${item.id}`);
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={{ position: "relative" }}>
              <LoadableImage
                resizeMode="contain"
                style={{
                  width: screenSize.width - 38 * 2,
                  aspectRatio: 296 / 409,
                  borderTopLeftRadius: 500,
                  borderTopRightRadius: 500,
                }}
                source={{ uri: item.dollsCarouselPhoto.background }}
                skeletonColors={[
                  Colors.light100,
                  Colors.light80,
                  Colors.light100,
                ]}
              />
              {item.dollsCarouselPhoto.label && (
                <Image
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 73,
                    aspectRatio: 1,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.dollsCarouselPhoto.label }}
                />
              )}
              {item.dollsCarouselPhoto.doll && (
                <Image
                  style={{
                    position: "absolute",
                    bottom: 20,
                    alignSelf: "center",
                    width: screenSize.width * 0.6,
                    aspectRatio: 226 / 463,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.dollsCarouselPhoto.doll }}
                />
              )}
            </View>
            <DollMainText
              title={item.title}
              isNext={item.next}
              unwatched={item.unwatched}
            />
          </View>
        </Pressable>
      )}
      sliderWidth={screenSize.width}
      itemWidth={screenSize.width}
    />
  );
};
