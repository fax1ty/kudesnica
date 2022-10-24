import { View, Image, Text } from "react-native";
import { ScreenTitle } from "../components/ScreenTitle";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { useDimensions } from "@react-native-community/hooks";
import { useState } from "react";
import { Pagination } from "../components/Pagination";
import { Colors, Fonts } from "../resources";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../icons/LogoFullBig";

export const CompanyScreen = () => {
  const { screen: screenSize } = useDimensions();
  const [currentTab, setCurrentTab] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#dff5ff" }}>
      <Image
        source={require("../assets/loading-bg.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.3)", "#fff"]}
          style={{ height: 50, marginTop: 461 / 2 }}
        />
        <View style={{ flex: 1, backgroundColor: "white" }} />
        <Image
          source={require("../assets/company-cloud.png")}
          style={{
            resizeMode: "contain",
            width: screenSize.width,
            height: 819,
            position: "absolute",
            top: 140,
            transform: [{ translateY: (819 / 2) * -1 + 140 * 2 }],
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Logo style={{ alignSelf: "center" }} />
        <View style={{ height: 85, marginTop: 48 }}>
          <Carousel
            inactiveSlideScale={1}
            onScrollIndexChanged={setCurrentTab}
            vertical={false}
            data={[
              "Кудесница – бренд кукол для девочек, открывающий для юной особы мир красоты и мудрости",
              "Кудесница – бренд кукол для девочек, открывающий для юной особы мир красоты и мудрости",
              "Кудесница – бренд кукол для девочек, открывающий для юной особы мир красоты и мудрости",
            ]}
            renderItem={({ item }) => (
              <Text
                numberOfLines={3}
                style={{
                  paddingLeft: 34,
                  paddingRight: 27,
                  fontFamily: Fonts.playfairdisplayItalic,
                  fontSize: 18,
                  lineHeight: 24,
                  color: Colors.dark75,
                  textAlign: "center",
                }}
              >
                {item}
              </Text>
            )}
            sliderWidth={screenSize.width}
            itemWidth={screenSize.width}
          />
        </View>
        <Pagination
          itemsCount={3}
          currentIndex={currentTab}
          style={{ alignSelf: "center", marginTop: 37 }}
          activeColor={Colors.violet80}
          inactiveColor={Colors.violet60}
        />
      </View>
      <ScreenTitle
        style={{
          width: "100%",
          top: insets.top,
          paddingHorizontal: 16,
        }}
      >
        O Кудеснице
      </ScreenTitle>
    </View>
  );
};
