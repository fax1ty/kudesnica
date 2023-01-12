import { useMemo, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { useProfile } from "../../api/profile";
import { sendSupportMail } from "../../api/support";
import { Button } from "../../components/Button";
import { IndependentText as Text } from "../../components/IndependentText";
import { Input } from "../../components/Input";
import { Picker } from "../../components/Picker";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { ScreenTitle } from "../../components/ScreenTitle";
import { Colors, Fonts } from "../../resources";

export default function Help() {
  const options = useMemo(
    () => [
      { label: "Общие вопросы", value: "general" },
      { label: "Вопрос подписки", value: "subscription" },
      { label: "Ошибки приложения", value: "errors" },
      { label: "Предложения", value: "suggestion" },
    ],
    []
  );
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(options[0].value);
  const { data: profile } = useProfile();
  const [email, setEmail] = useState(profile?.email);
  const [step, setStep] = useState<0 | 1>(0);

  return (
    <ScreenTemplate>
      <ScreenTitle>Поддержка</ScreenTitle>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {step === 0 && (
          <>
            <Text
              style={{
                fontFamily: Fonts.firasansRegular,
                fontSize: 14,
                lineHeight: 18,
                color: Colors.dark75,
              }}
            >
              Выберите тему обращения
            </Text>
            <Picker value={selected} onChange={setSelected} options={options} />
            <Input
              disabled={Boolean(profile?.email)}
              onChangeText={setEmail}
              value={email || ""}
              placeholder="Ваша эл.почта"
              style={{ marginTop: 15 }}
              autoComplete="email"
              keyboardType="email-address"
            />
            <TextInput
              onChangeText={setMessage}
              value={message}
              placeholder="Введите ваше сообщение"
              style={{
                marginTop: 7,
                maxHeight: 176,
                flex: 1,
                backgroundColor: Colors.light80,
                borderWidth: 1,
                borderColor: Colors.light40,
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 16,
                fontFamily: Fonts.firasansRegular,
                fontSize: 16,
                lineHeight: 15,
              }}
              multiline
              textAlignVertical="top"
            />
            <Button
              disabled={!message || !email}
              style={{ marginTop: 30 }}
              onPress={async () => {
                if (!email) return;
                await sendSupportMail(
                  email,
                  options.find((v) => v.value === selected)?.label ||
                    "Unknown reason",
                  message
                );
                setMessage("");
                setStep(1);
              }}
            >
              Отправить
            </Button>
            <Text
              style={{
                paddingHorizontal: 24 - 16,
                marginTop: 11,
                fontFamily: Fonts.firasansRegular,
                fontSize: 13,
                lineHeight: 16,
                color: Colors.light20,
                textAlign: "center",
              }}
            >
              Нажимая кнопку "Отправить", вы принимаете условия
              Пользовательского соглашения
            </Text>
          </>
        )}
        {step === 1 && (
          <>
            <Text
              style={{
                fontFamily: Fonts.playfairDisplayItalic,
                fontSize: 32,
                lineHeight: 37,
                marginTop: 45,
                color: Colors.violet100,
                textAlign: "center",
              }}
            >
              Спасибо!
            </Text>
            <Text
              style={{
                fontFamily: Fonts.firasansRegular,
                fontSize: 14,
                lineHeight: 18,
                color: Colors.dark75,
                textAlign: "center",
                paddingHorizontal: 50 - 16,
                marginTop: 19,
              }}
            >
              <Text style={{ color: Colors.violet100 }}>
                Ваше обращение отправлено!
              </Text>
              {"\n\n"}
              Мы ответим на вашу электронную почту в ближайшее время
            </Text>
            <Button
              style={{ marginTop: 32 }}
              onPress={() => {
                setStep(0);
              }}
            >
              Отправить ещё одно
            </Button>
          </>
        )}
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
}
