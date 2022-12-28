import { AxiosError } from "axios";
import { useHref, useLink } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { auth } from "../../api/auth";
import { Button } from "../../components/Button";
import { IndependentText as Text } from "../../components/IndependentText";
import { Input } from "../../components/Input";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { ScreenTitle } from "../../components/ScreenTitle";
import { Colors, Fonts } from "../../resources";
import { useGlobalStore } from "../../stores/global";
import { serializePhoneNumber } from "../../utils/phone";

export default function Auth() {
  const setPhone = useGlobalStore((state) => state.setPhone);
  const [error, setError] = useState("");
  const navigate = useLink();
  const {
    params: { mode },
  } = useHref();
  const [name, setName] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [mask] = useState([
    "+",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ]);

  useEffect(() => {
    setError("");
    setName("");
  }, [mode]);

  return (
    <ScreenTemplate>
      <ScreenTitle>
        {mode === "register" ? "Регистрация" : "Авторизация"}
      </ScreenTitle>
      <View>
        {mode === "register" && (
          <Input
            placeholder="Ваше имя"
            autoComplete="name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        )}
        <Input
          placeholder="Ваш номер телефона"
          autoComplete="tel"
          keyboardType="number-pad"
          style={{ marginTop: 21 }}
          onChangeText={(masked) => setLocalPhone(masked)}
          value={localPhone}
          mask={mask}
        />
        {error && (
          <Text
            style={{
              marginTop: 14,
              color: Colors.red80,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
            }}
          >
            {error}
          </Text>
        )}
        <Button
          style={{ marginTop: 22 }}
          disabled={
            mode === "register"
              ? !name || localPhone.length <= 5
              : localPhone.length <= 5
          }
          onPress={async () => {
            try {
              const serialized = serializePhoneNumber(localPhone);
              const requestId = await auth(serialized, name);
              setPhone(serialized);
              navigate.push(`/verify/${mode}/${requestId}`);
            } catch (error) {
              console.error(error);
              if (error instanceof AxiosError) {
                if (error.response?.status === 503)
                  setError(
                    "Сервер временно не может обрабатывать СМС авторизацию. Повторите попытку чуть позже"
                  );
                else if (error.response?.status === 403)
                  setError(
                    "Превышен лимит авторизаций. Повторите попытку чуть позже"
                  );
                else if (error.response?.status === 404 && mode === "login")
                  setError(
                    "Аккаунт не найден. Вернитесь на предыдущий шаг и пройдите авторизацию там"
                  );
                else if (error.response?.status === 409 && mode === "register")
                  setError(
                    "Аккаунт с текущим привязанным номером уже существует. Пожалуйста, входите, а не регистрируйтесь"
                  );
                else
                  setError(
                    "Произошла непредвиденная ошибка. Повторите попытку чуть позже"
                  );
              }
            }
          }}
        >
          Далее
        </Button>
      </View>
      <View
        style={{
          marginTop: 22,
          paddingHorizontal: 24 - 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingHorizontal: 24 - 16,
            height: 51,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
            color: Colors.light20,
            textAlign: "center",
          }}
        >
          Нажимая кнопку "Далее", вы принимаете условия Пользовательского
          соглашения
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 18,
              lineHeight: 23,
              color: Colors.dark50,
            }}
          >
            {mode === "register" ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 18,
              lineHeight: 23,
              marginLeft: 18 / 2,
              color: Colors.violet100,
            }}
            onPress={() =>
              navigate.push(
                `/auth/${mode === "register" ? "login" : "register"}`
              )
            }
          >
            {mode === "register" ? "Войти!" : "Зарегистрироваться"}
          </Text>
        </View>
      </View>
    </ScreenTemplate>
  );
}
