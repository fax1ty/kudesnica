import { View, Text, StatusBar } from "react-native";
import { Colors, Fonts } from "../resources";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../api/auth";
import { useGlobalStore } from "../store";
import { serializePhoneNumber } from "../utils/phone";
import { AxiosError } from "axios";

import BackIcon from "../icons/Back";

export const AuthScreen = () => {
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
  const store = useGlobalStore();

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
        <Input
          placeholder="Ваше имя"
          autoComplete="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Ваш номер телефона"
          autoComplete="tel"
          keyboardType="number-pad"
          style={{ marginTop: 21 }}
          onChangeText={(masked) => setPhone(masked)}
          value={phone}
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
          disabled={!name || !phone}
          onPress={async () => {
            try {
              const serialized = serializePhoneNumber(phone);
              const requestId = await auth(name, serialized);
              store.setPhone(serialized);
              navigation.navigate("Verify", { requestId });
            } catch (error) {
              if (error instanceof AxiosError) {
                if (error.response?.status === 503)
                  setError(
                    "Сервер временно не может обрабатывать СМС авторизацию. Повторите попытку чуть позже"
                  );
                else if (error.response?.status === 403)
                  setError(
                    "Превышен лимит авторизаций. Повторите попытку чуть позже"
                  );
                else
                  setError(
                    "Прозошла непредвиденная ошибка. Повторите попытку чуть позже"
                  );
              }
            }
          }}
        >
          Далее
        </Button>
      </View>
      <View
        style={{ marginTop: 22, paddingHorizontal: 24, alignItems: "center" }}
      >
        <Text
          style={{
            paddingHorizontal: 24,
            height: 51,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
            color: Colors.light20,
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
            Уже есть аккаунт?
          </Text>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 18,
              lineHeight: 23,
              marginLeft: 18 / 2,
              color: Colors.violet100,
            }}
          >
            Войти!
          </Text>
        </View>
      </View>
    </View>
  );
};
