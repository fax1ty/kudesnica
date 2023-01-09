import { useLink } from "expo-router";

import { IndependentText as Text } from "../components/IndependentText";
import { Colors, Fonts } from "../resources";
import { useGlobalStore } from "../stores/global";
import { CircleModal } from "./CircleModal";

interface Props {
  visible: boolean;
}

export const AuthOnlyModal = ({ visible }: Props) => {
  const closeAuthOnlyModal = useGlobalStore(
    (state) => state.closeAuthOnlyModal
  );
  const closeBottomPlayer = useGlobalStore((state) => state.closeBottomPlayer);
  const navigate = useLink();

  return (
    <CircleModal
      visible={visible}
      onClose={closeAuthOnlyModal}
      headerContent={
        <>
          <Text
            style={{
              textAlign: "center",
              fontFamily: Fonts.firasansRegular,
              fontSize: 16,
              lineHeight: 15,
              color: Colors.dark25,
            }}
          >
            Нет аккаунта?
          </Text>
          <Text
            onPress={() => {
              navigate.push("/auth/register");
              closeAuthOnlyModal();
            }}
            style={{
              marginTop: 7,
              fontFamily: Fonts.playfairDisplayItalic,
              fontSize: 26,
              color: Colors.violet100,
              lineHeight: 32,
              textDecorationLine: "underline",
            }}
          >
            К регистрации!
          </Text>
        </>
      }
      footerContent={
        <>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 16,
              lineHeight: 15,
              color: Colors.dark25,
            }}
          >
            Уже есть аккаунт?
          </Text>
          <Text
            onPress={() => {
              navigate.push("/auth/login");
              closeAuthOnlyModal();
            }}
            style={{
              marginTop: 7,
              fontFamily: Fonts.playfairDisplayItalic,
              fontSize: 26,
              lineHeight: 32,
              color: Colors.violet100,
              textDecorationLine: "underline",
            }}
          >
            Войти!
          </Text>
        </>
      }
      buttonProps={{
        darkPattern: true,
        children: "Продолжить гостевой доступ",
        onPress: () => {
          closeAuthOnlyModal();
        },
      }}
    />
  );
};
