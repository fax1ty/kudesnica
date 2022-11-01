import { Text } from "react-native";
import { Colors, Fonts } from "../resources";
import { CircleModal } from "./CircleModal";
import { useGlobalStore } from "../stores/global";
import { useNavigation } from "@react-navigation/native";

import LockCircled from "../icons/LockCircled";

interface Props {
  visible: boolean;
}

export const AuthOnlyModal = ({ visible }: Props) => {
  const closeAuthOnlyModal = useGlobalStore(
    (state) => state.closeAuthOnlyModal
  );
  const navigation = useNavigation<any>();

  return (
    <CircleModal
      visible={visible}
      onClose={closeAuthOnlyModal}
      headerContent={
        <>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 16,
              lineHeight: 16,
              color: Colors.dark25,
            }}
          >
            Нет аккаунта?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Auth", { mode: "register" });
              closeAuthOnlyModal();
            }}
            style={{
              marginTop: 7,
              fontFamily: Fonts.playfairDisplayItalic,
              fontSize: 26,
              color: Colors.violet100,
              lineHeight: 32,
              marginBottom: 32 - 24,
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
              marginTop: 33,
              fontFamily: Fonts.firasansRegular,
              fontSize: 16,
              lineHeight: 16,
              color: Colors.dark25,
            }}
          >
            Уже есть аккаунт?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Auth", { mode: "login" });
              closeAuthOnlyModal();
            }}
            style={{
              marginTop: 7,
              fontFamily: Fonts.playfairDisplayItalic,
              fontSize: 26,
              lineHeight: 32,
              color: Colors.violet100,
              height: 57,
              textDecorationLine: "underline",
            }}
          >
            Войти!
          </Text>
        </>
      }
      buttonProps={{
        children: "Продолжить гостевой доступ",
        onPress: () => {
          closeAuthOnlyModal();
        },
      }}
    />
  );
};
