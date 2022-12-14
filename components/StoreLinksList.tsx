import { View, Pressable, Linking } from "react-native";

import AliexpressLogo from "../icons/Aliexpress";
import NextIcon from "../icons/Next";
import OzonLogo from "../icons/Ozon";
import WildberriesLogo from "../icons/Wildberries";
import { Colors, Fonts } from "../resources";
import { IndependentText as Text } from "./IndependentText";

interface Props {
  urls: string[];
  onLinkPress?: () => void;
}

export const StoreLinksList = ({ urls, onLinkPress }: Props) => {
  return (
    <View>
      {urls.map((link, i, arr) => (
        <View key={`store-link-${i}`}>
          <Pressable
            onPress={async () => {
              await Linking.openURL(link);
              if (onLinkPress) onLinkPress();
            }}
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
          </Pressable>
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
  );
};
