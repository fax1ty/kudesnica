import { View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenTitle } from "../../components/ScreenTitle";
import { StoreLinksList } from "../../components/StoreLinksList";
import { Values } from "../../resources";

export default function AboutWhereToBuy() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#dff5ff" }}>
      <Image
        source={require("../../assets/loading-bg.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <View style={{ height: insets.top + Values.titleHeight }} />
        <View style={{ height: 50, marginTop: 314 / 2 }} />
        <View style={{ flex: 1, backgroundColor: "white" }} />
        <Image
          source={require("../../assets/cloud.png")}
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
          source={require("../../assets/balerina-box.png")}
          style={{ width: "100%", height: 314, resizeMode: "contain" }}
        />
        <StoreLinksList
          urls={[
            "https://ozon.ru",
            "https://wildberries.ru",
            "https://aliexpress.ru",
          ]}
        />
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          marginTop: insets.top,
          paddingHorizontal: 16,
          zIndex: 10000,
        }}
      >
        <ScreenTitle>Где купить</ScreenTitle>
      </View>
    </View>
  );
}
