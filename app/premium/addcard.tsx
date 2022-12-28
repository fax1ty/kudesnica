import { AxiosError } from "axios";
import { useState } from "react";
import { View } from "react-native";

import { Button } from "../../components/Button";
import { GradientCard } from "../../components/GradientCard";
import { IndependentText as Text } from "../../components/IndependentText";
import { Input } from "../../components/Input";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { ScreenTitle } from "../../components/ScreenTitle";
import { Colors, Fonts } from "../../resources";

export default function PremiumAddCard() {
  const [error, setError] = useState("");
  const [card, setCard] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <ScreenTemplate>
      <ScreenTitle>Подписка</ScreenTitle>
      <GradientCard
        theme="blue"
        title={
          <Text
            style={{
              fontFamily: Fonts.firasansBold,
              fontSize: 18,
              lineHeight: 32,
              color: Colors.dark50,
            }}
          >
            Оформите
          </Text>
        }
        description={
          <Text
            style={{
              fontFamily: Fonts.firasansMedium,
              fontSize: 14,
              lineHeight: 22,
              color: Colors.green80,
            }}
          >
            Ежемесячную подписку всего за 199 ₽!
          </Text>
        }
      />
      <View style={{ marginTop: 36 }}>
        <Text
          style={{
            fontFamily: Fonts.firasansRegular,
            fontSize: 14,
            lineHeight: 15,
            color: Colors.dark75,
          }}
        >
          Новая карта
        </Text>
        <Input
          style={{ marginTop: 14 }}
          placeholder="Номер карты"
          autoComplete="cc-number"
          value={card}
          keyboardType="number-pad"
          onChangeText={(text) => setCard(text)}
          mask={[
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
            /\d/,
            /\d/,
          ]}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 23,
          }}
        >
          <Input
            placeholder="ММ/ГГ"
            autoComplete="cc-exp"
            keyboardType="number-pad"
            value={expire}
            onChangeText={(text) => setExpire(text)}
            mask={[/\d/, /\d/, "/", /\d/, /\d/]}
            style={{ flex: 1 }}
          />
          <Input
            placeholder="CVV/CVC -код"
            autoComplete="cc-csc"
            keyboardType="number-pad"
            value={cvv}
            onChangeText={(text) => setCvv(text)}
            mask={[/\d/, /\d/, /\d/]}
            style={{ marginLeft: 23, flex: 1 }}
          />
        </View>
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
          disabled={!card || !expire || !cvv}
          style={{ marginTop: 22 }}
          onPress={async () => {
            try {
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
                else if (error.response?.status === 404)
                  setError(
                    "Аккаунт не найден. Вернитесь на предыдущий шаг и пройдите авторизацию там"
                  );
                else
                  setError(
                    "Произошла непредвиденная ошибка. Повторите попытку чуть позже"
                  );
              }
            }
          }}
        >
          Оплатить 199 ₽
        </Button>
      </View>
    </ScreenTemplate>
  );
}
