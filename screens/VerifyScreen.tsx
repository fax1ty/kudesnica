import { View } from "react-native";
import { Colors, Fonts } from "../resources";
import { Button } from "../components/Button";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useCountDown from "react-countdown-hook";
import { useEffect, useMemo, useState } from "react";
import pms from "parse-ms";
import { leadWithZero } from "../utils/math";
import { CodeInput } from "../components/CodeInput";
import { useGlobalStore } from "../stores/global";
import { verify } from "../api/auth";
import axios from "axios";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { ScreenTitle } from "../components/ScreenTitle";
import crashlytics from "@react-native-firebase/crashlytics";
import { usePersistedState } from "react-native-use-persisted-state";
import { IndependentText as Text } from "../components/IndependentText";

export const VerifyScreen = () => {
  const [timeLeft, { start }] = useCountDown(60 * 1000);
  const [code, setCode] = useState("");
  const {
    params: { requestId, mode },
  } = useRoute<any>();

  const navigation = useNavigation<any>();
  const userPhone = useGlobalStore((state) => state.phone);
  const setToken = useGlobalStore((state) => state.setToken);
  const openCongratulationsRegModal = useGlobalStore(
    (state) => state.openCongratulationsRegModal
  );
  const openLoginWelcomeModal = useGlobalStore(
    (state) => state.openLoginWelcomeModal
  );
  const [, setPersistToken] = usePersistedState("@token", "");

  const left = useMemo(() => {
    const timeData = pms(timeLeft);
    return `${leadWithZero(timeData.minutes)}:${leadWithZero(
      timeData.seconds
    )}`;
  }, [timeLeft]);

  useEffect(() => start(), []);

  return (
    <ScreenTemplate>
      <ScreenTitle>Введите код</ScreenTitle>
      <View>
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
          Введите четырехзначный код из смс для заверешния{" "}
          {mode === "register" ? "регистрации" : "авторизации"}
        </Text>
        <CodeInput length={4} value={code} onChange={setCode} />
        <Button
          disabled={code.length !== 4}
          style={{ marginTop: 33 }}
          onPress={async () => {
            if (!userPhone)
              throw new Error(
                "Номер телефона должен быть заранее указан! Вы не прошли предыдущий шаг?"
              );
            const { token, phone } = await verify(userPhone, code, requestId);
            await crashlytics().setUserId(phone.toString());
            axios.defaults.headers.common.authorization = token;
            setToken(token);
            setPersistToken(token);
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
            );
            if (mode === "register") openCongratulationsRegModal();
            else openLoginWelcomeModal();
          }}
        >
          Подтвердить
        </Button>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 24 - 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: 270,
            fontFamily: Fonts.firasansRegular,
            fontSize: 18,
            lineHeight: 23,
            color: timeLeft === 0 ? Colors.violet100 : Colors.dark50,
          }}
        >
          Отправить код еще раз{" "}
          {Boolean(timeLeft) && (
            <Text
              style={{
                color: Colors.violet100,
              }}
            >
              {left}
            </Text>
          )}
        </Text>
      </View>
    </ScreenTemplate>
  );
};
