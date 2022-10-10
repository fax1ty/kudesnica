import { createDrawerNavigator } from "@react-navigation/drawer";
import { createElement } from "react";
import { View, Text, StatusBar as StatusBarData } from "react-native";
import { Colors, Fonts } from "../resources";
import { DollsScreen } from "./DollsScreen";
import { CompanyScreen } from "./CompanyScreen";
import { WhereToBuyScreen } from "./WhereToBuyScreen";
import { AppScreen } from "./AppScreen";

import LogoFull from "../icons/LogoFull";
import InstagramIcon from "../icons/Instagram";
import VKIcon from "../icons/VK";
import TelegramIcon from "../icons/Telegram";

export const HomeScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={() => (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            paddingBottom: 30,
            paddingTop: 30 + (StatusBarData.currentHeight || 0),
          }}
        >
          <LogoFull />
          <View style={{ flex: 1, justifyContent: "center" }}>
            {[
              { label: "О Кудеснице", url: "About" },
              { label: "Где купить", url: "About" },
              { label: "О приложении", url: "About" },
            ].map(({ label }, i) => (
              <Text
                key={`url-${i}`}
                style={{
                  fontFamily: Fonts.playfairdisplayItalic,
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
          <View style={{ flexDirection: "row" }}>
            {[
              { icon: InstagramIcon, url: "" },
              { icon: VKIcon, url: "" },
              { icon: TelegramIcon, url: "" },
            ].map(({ icon }, i) =>
              createElement(icon, {
                key: `social-${i}`,
                style: { marginLeft: i === 0 ? 0 : 20 },
              })
            )}
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
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
