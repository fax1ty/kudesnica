import { IndependentText as Text } from "../components/IndependentText";
import { Colors, Fonts } from "../resources";
import { CircleModal } from "./CircleModal";
import { useGlobalStore } from "../stores/global";
import { useNavigation } from "@react-navigation/native";

interface Props {
  visible: boolean;
}

export const AuthOnlyModal = ({ visible }: Props) => {
  const closeAuthOnlyModal = useGlobalStore(
    (state) => state.closeAuthOnlyModal
  );
  const closeBottomPlayer = useGlobalStore((state) => state.closeBottomPlayer);
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
              lineHeight: 15,
              color: Colors.dark25,
            }}
          >
            Нет аккаунта?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Auth", { mode: "register" });
              closeAuthOnlyModal();
              closeBottomPlayer();
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
              navigation.navigate("Auth", { mode: "login" });
              closeAuthOnlyModal();
              closeBottomPlayer();
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
