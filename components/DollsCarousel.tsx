import Carousel from "react-native-snap-carousel";
import { Image, Pressable, Text, View } from "react-native";
import { useDimensions } from "@react-native-community/hooks";
import { Colors, Fonts } from "../resources";
import { useNavigation } from "@react-navigation/native";
import { IDollData } from "../api/dolls";

import BellIcon from "../icons/Bell";

interface Props {
  onShift?: (v: number) => void;
  onIndexChange?: (v: number, next: boolean) => void;
  data: Array<IDollData & { next: boolean }>;
}

export const DollMainText = ({
  isNext = false,
  title,
}: {
  isNext?: boolean;
  title: string;
}) => {
  return (
    <>
      <Text
        style={{
          marginTop: 17,
          fontSize: 32,
          color: Colors.violet100,
          lineHeight: 37,
          fontFamily: Fonts.playfairdisplayItalic,
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
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 18 / 2,
                backgroundColor: Colors.violet80,
                alignItems: "center",
                position: "relative",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  color: Colors.light100,
                  fontSize: 12,
                  lineHeight: 15,
                  fontFamily: Fonts.firasansBold,
                }}
              >
                X
              </Text>
            </View>
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
  const navigation = useNavigation<any>();

  return (
    <Carousel
      inactiveSlideScale={1}
      onScrollIndexChanged={(value) => {
        if (onIndexChange) onIndexChange(value, data[value].next);
      }}
      onScroll={({ nativeEvent }) => {
        if (onShift) onShift(nativeEvent.contentOffset.x);
      }}
      contentContainerCustomStyle={{ alignItems: "center" }}
      containerCustomStyle={{ marginTop: 25 }}
      vertical={false}
      data={data}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            if (item.next) return;
            navigation.navigate("Stories", { doll: item.id });
          }}
        >
          <View
            style={{
              transform: [{ translateY: -80 }],
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: screenSize.width - 38 * 2,
                aspectRatio: 302 / 483,
              }}
              source={{ uri: item.dollsCarouselPhoto }}
            />
            <DollMainText title={item.title} isNext={item.next} />
          </View>
        </Pressable>
      )}
      sliderWidth={screenSize.width}
      itemWidth={screenSize.width}
    />
  );
};
