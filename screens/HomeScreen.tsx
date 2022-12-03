import { createDrawerNavigator } from "@react-navigation/drawer";
import { createElement } from "react";
import { View, Image, Linking } from "react-native";
import { Colors, Fonts, Values } from "../resources";
import { DollsScreen } from "./DollsScreen";
import { CompanyScreen } from "./CompanyScreen";
import { WhereToBuyScreen } from "./WhereToBuyScreen";
import { AppScreen } from "./AppScreen";
import { useNavigation } from "@react-navigation/native";
import TelegramIcon from "../icons/Telegram";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IndependentText as Text } from "../components/IndependentText";

import LogoFull from "../icons/LogoFull";
import InstagramIcon from "../icons/Instagram";
import VKIcon from "../icons/VK";

export const HomeScreen = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      drawerContent={() => (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/drawer-bg.png")}
            style={{ width: "100%", height: "100%", position: "absolute" }}
          />
          <View
            style={{
              position: "relative",
              alignItems: "center",
              width: "100%",
              height: "100%",
              paddingBottom: 30,
              paddingTop: 30 + insets.top,
            }}
          >
            <LogoFull />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingBottom: Values.bottomPlayerHeight,
              }}
            >
              <View>
                {[
                  { label: "О Кудеснице", url: "Company" },
                  { label: "Где купить", url: "WhereToBuy" },
                  { label: "О приложении", url: "App" },
                ].map(({ label, url }, i) => (
                  <Text
                    onPress={() => navigation.navigate("Home", { screen: url })}
                    key={`url-${i}`}
                    style={{
                      fontFamily: Fonts.playfairDisplayItalic,
                      fontSize: 20,
                      lineHeight: 27,
                      color: Colors.violet100,
                      marginTop: i == 0 ? 0 : 32,
                    }}
                  >
                    {label}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  bottom: Values.bottomPlayerHeight + 30,
                  position: "absolute",
                }}
              >
                {[
                  { icon: InstagramIcon, url: Values.instagramUrl },
                  { icon: VKIcon, url: Values.vkUrl },
                  { icon: TelegramIcon, url: Values.tgUrl },
                ].map(({ icon, url }, i) =>
                  createElement(icon, {
                    onPress: () => Linking.openURL(url),
                    key: `social-${i}`,
                    style: { marginLeft: i === 0 ? 0 : 20 },
                  })
                )}
              </View>
            </View>
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "rgba(67, 44, 119, 0.5)",
        drawerStyle: { width: 300 },
      }}
    >
      <Drawer.Screen name="Dolls" component={DollsScreen} />
      <Drawer.Screen name="Company" component={CompanyScreen} />
      <Drawer.Screen name="WhereToBuy" component={WhereToBuyScreen} />
      <Drawer.Screen name="App" component={AppScreen} />
    </Drawer.Navigator>
  );
};
