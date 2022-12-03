import { View, Pressable } from "react-native";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { ScreenTitle } from "../components/ScreenTitle";
import { Colors, Fonts, Values } from "../resources";
import { version } from "../package.json";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCurrentEnv } from "../utils/misc";
import { useDimensions } from "@react-native-community/hooks";
import { IndependentText as Text } from "../components/IndependentText";

import NextIcon from "../icons/Next";
import Logo from "../icons/LogoFull";

export const AppScreen = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const env = useMemo(() => getCurrentEnv(), []);
  const navigation = useNavigation<any>();
  const { screen: screenSize } = useDimensions();

  return (
    <ScreenTemplate>
      <ScreenTitle>О приложении</ScreenTitle>
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => navigation.navigate("Privacy")}
          style={{
            height: 56,
            paddingLeft: 1,
            paddingRight: 5,
            borderBottomWidth: 1,
            borderColor: Colors.light60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 16,
              lineHeight: 15,
              color: Colors.dark50,
            }}
          >
            Пользовательское соглашение
          </Text>
          <NextIcon />
        </Pressable>
        <Text
          style={{
            marginTop: 25,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
            color: Colors.dark25,
          }}
        >
          Приложение предназначено для детей 5-8 лет и их родителей.{"\n"}
          {"\n"}
          Приложение несет развлекательно-образовательный характер: через
          интересные истории увлечь ребенка, рассказать о новых увлечениях,
          поиграть и разучить песни.{"\n"}
          {"\n"}
          Периодичность обновления историй – 1 раз в месяц, 1 числа каждого
          месяца.
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          width: screenSize.width,
          bottom: Values.bottomPlayerHeight + 30,
          alignItems: "center",
        }}
      >
        <Logo />
        <Text
          style={{
            marginTop: 23,
            textAlign: "center",
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
            color: "#979797",
          }}
        >
          © {currentYear} Кудесница / ООО «Северное сияние»{"\n"}
          Версия {version} ({env})
        </Text>
      </View>
    </ScreenTemplate>
  );
};
