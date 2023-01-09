import { useLink } from "expo-router";
import { View, ViewStyle, Pressable } from "react-native";

import BackIcon from "../icons/Back";
import { Colors, Fonts, Values } from "../resources";
import { IndependentText as Text } from "./IndependentText";
import { Pin } from "./Pin";

interface Props {
  children: string;
  style?: ViewStyle;
  pinNumber?: number;
}

export const ScreenTitle = ({ children, style, pinNumber }: Props) => {
  const navigate = useLink();

  return (
    <View
      style={{
        ...style,
        flexDirection: "row",
        height: Values.titleHeight,
        alignItems: "center",
        position: "relative",
      }}
    >
      <Pressable
        style={{
          top: 0,
          left: 0,
          width: Values.titleHeight,
          aspectRatio: 1,
          position: "absolute",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onPress={() => {
          console.log("Идём назад");
          navigate.back();
        }}
      >
        <BackIcon />
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: Fonts.firasansBold,
            fontSize: 18,
            lineHeight: 22,
            color: Colors.dark50,
          }}
        >
          {children}
        </Text>
        {pinNumber !== undefined && (
          <Pin color={Colors.pink100} style={{ marginLeft: 12 }}>
            {pinNumber || 0}
          </Pin>
        )}
      </View>
    </View>
  );
};
