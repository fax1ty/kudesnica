import { View, Text, StatusBar } from "react-native";
import { Colors, Fonts } from "../resources";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import useCountDown from "react-countdown-hook";
import { useEffect, useMemo, useState } from "react";
import pms from "parse-ms";
import { leadWithZero } from "../utils/math";
import { CodeInput } from "../components/CodeInput";
import { dispatch } from "use-bus";
import { useGlobalStore } from "../store";

import BackIcon from "../icons/Back";

export const VerifyScreen = () => {
  const navigation = useNavigation<any>();
  const [timeLeft, { start }] = useCountDown(60 * 1000);
  const [code, setCode] = useState("");

  const store = useGlobalStore();

  const left = useMemo(() => {
    const timeData = pms(timeLeft);
    return `${leadWithZero(timeData.minutes)}:${leadWithZero(
      timeData.seconds
    )}`;
  }, [timeLeft]);

  useEffect(() => start(), []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: Colors.light100,
      }}
    >
      <View style={{ flexDirection: "row", padding: 16, alignItems: "center" }}>
        <BackIcon />
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: Fonts.firasansBold,
            fontSize: 18,
            lineHeight: 22,
            color: Colors.dark50,
          }}
        >
          Регистрация
        </Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            paddingHorizontal: 24 - 16,
            textAlign: "center",
            marginTop: 56,
            fontFamily: Fonts.firasansRegular,
            fontSize: 18,
            lineHeight: 23,
            color: Colors.dark75,
            height: 71,
          }}
        >
          Введите четырехзначный код из смс для заверешния регистрации
        </Text>
        <CodeInput length={4} value={code} onChange={setCode} />
        <Button
          disabled={code.length !== 4}
          style={{ marginTop: 33 }}
          onPress={() => {
            navigation.navigate("Home", { Dolls: true });
            dispatch("UI_MODAL_CONGRATULATIIONS_REG_OPEN");
            store.openBottomPlayer();
          }}
        >
          Подтвердить
        </Button>
      </View>
      <View
        style={{ marginTop: 22, paddingHorizontal: 24, alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: Fonts.firasansRegular,
            fontSize: 18,
            lineHeight: 23,
            color: timeLeft === 0 ? Colors.violet100 : Colors.dark75,
            marginTop: 16,
          }}
        >
          {`Отправить код еще раз${timeLeft === 0 ? "" : ` (${left})`}`}
        </Text>
      </View>
    </View>
  );
};
