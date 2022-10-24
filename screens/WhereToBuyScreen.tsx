import { View, Image, Text } from "react-native";
import { ScreenTitle } from "../components/ScreenTitle";
import { Colors, Fonts } from "../resources";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import OzonLogo from "../icons/Ozon";
import WildberriesLogo from "../icons/Wildberries";
import AliexpressLogo from "../icons/Aliexpress";
import NextIcon from "../icons/Next";

export const WhereToBuyScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#dff5ff" }}>
      <Image
        source={require("../assets/loading-bg.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <View
          style={{
            marginTop: insets.top,
            paddingHorizontal: 16,
          }}
        >
          <ScreenTitle>Где купить</ScreenTitle>
        </View>
        <View style={{ height: 50, marginTop: 314 / 2 }} />
        <View style={{ flex: 1, backgroundColor: "white" }} />
        <Image
          source={require("../assets/cloud.png")}
          style={{ width: "100%", position: "absolute", top: 100 }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          paddingTop: insets.top + 64 + 10,
        }}
      >
        <Image
          source={require("../assets/balerina-box.png")}
          style={{ width: "100%", height: 314, resizeMode: "contain" }}
        />
        <View>
          {["ozon", "wildberries", "aliexpress"].map((link, i, arr) => (
            <View key={`store-link-${i}`}>
              <View
                key={`store-link-${i}`}
                style={{
                  height: 54,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 13,
                  paddingRight: 14,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {link.includes("ozon") && <OzonLogo />}
                  {link.includes("wildberries") && <WildberriesLogo />}
                  {link.includes("aliexpress") && <AliexpressLogo />}
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: Fonts.firasansRegular,
                      fontSize: 12,
                      lineHeight: 12,
                      color: "#a6a6a6",
                    }}
                  >
                    Перейти в магазин
                  </Text>
                </View>
                <NextIcon />
              </View>
              {i !== arr.length - 1 && (
                <View
                  style={{
                    height: 1,
                    marginLeft: 13,
                    marginRight: 14,
                    backgroundColor: Colors.light60,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
