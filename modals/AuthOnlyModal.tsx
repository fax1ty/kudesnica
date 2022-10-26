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
          <LockCircled style={{ marginBottom: 14 }} />
          <Text
            style={{
              fontFamily: Fonts.firasansBold,
              fontSize: 18,
              lineHeight: 22,
              color: Colors.violet100,
              textAlign: "center",
            }}
          >
            Функция доступна только зарегистрированным
          </Text>
        </>
      }
      footerContent={
        <>
          <Text
            style={{
              width: 250,
              marginTop: 18,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.dark25,
              textAlign: "center",
            }}
          >
            Придумайте классный текст сюда, пожалуйста
          </Text>
        </>
      }
      buttonProps={{
        children: "Зарегистрироваться",
        onPress: () => {
          navigation.navigate("Auth", { mode: "register" });
          closeAuthOnlyModal();
        },
      }}
    />
  );
};
