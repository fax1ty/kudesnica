import { useDimensions } from "@react-native-community/hooks";
import { useLink } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { usePersistedState } from "react-native-use-persisted-state";

import { Button } from "../../components/Button";
import { IndependentText as Text } from "../../components/IndependentText";
import { Pagination } from "../../components/Pagination";
import { Colors, Fonts } from "../../resources";

export default function Welcome() {
  const { screen: screenSize } = useDimensions();
  const [currentScreen, setCurrentScreen] = useState(0);
  const ref = useRef<Carousel<any>>(null);
  const navigate = useLink();
  const [, setShouldShowWelcomeScreen] = usePersistedState(
    "@shouldShowWelcomeScreen",
    true
  );

  useEffect(() => setShouldShowWelcomeScreen(false), []);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Carousel
        ref={ref}
        onScrollIndexChanged={setCurrentScreen}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        contentContainerCustomStyle={{ alignItems: "center" }}
        vertical={false}
        data={[
          {
            title: "Добро пожаловать!",
            text: "Слушайте и читайте увлекательные\nистории кукол с красивыми\nиллюстрациями!",
            background: require("../../assets/welcome-1.png"),
          },
          {
            title: "Новые истории",
            text: "Слушайте и читайте увлекательные\nистории кукол с красивыми\nиллюстрациями!",
            background: require("../../assets/welcome-2.png"),
          },
          {
            title: "Алина Балерина",
            text: "Слушайте и читайте увлекательные\nистории кукол с красивыми\nиллюстрациями!",
            background: require("../../assets/welcome-3.png"),
          },
        ]}
        renderItem={({ item }) => (
          <View style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              source={item.background}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <SafeAreaView
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Animated.View
                entering={FadeIn.duration(300).delay(500)}
                style={{
                  marginTop: 35,
                  paddingHorizontal: 29,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: Fonts.playfairDisplayItalic,
                    fontSize: 32,
                    lineHeight: 37,
                    color: Colors.violet100,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: 11,
                    textAlign: "center",
                    fontFamily: Fonts.firasansRegular,
                    fontSize: 16,
                    lineHeight: 20,
                    color: Colors.dark25,
                  }}
                >
                  {item.text}
                </Text>
              </Animated.View>
            </SafeAreaView>
          </View>
        )}
        sliderWidth={screenSize.width}
        itemWidth={screenSize.width}
      />
      <Animated.View
        entering={FadeIn.duration(300).delay(500)}
        style={{
          bottom: 50 - 33,
          paddingHorizontal: 16,
          width: "100%",
          position: "absolute",
        }}
      >
        <Pagination
          itemsCount={3}
          currentIndex={currentScreen}
          style={{ alignSelf: "center" }}
        />
        <Button
          onPress={() => {
            if (currentScreen === 2) navigate.replace("/dolls");
            else ref.current?.snapToNext();
          }}
          style={{ marginTop: 24 }}
        >
          Далее →
        </Button>
      </Animated.View>
    </View>
  );
}
