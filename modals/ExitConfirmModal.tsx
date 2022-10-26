import { View, Text } from "react-native";
import { Button } from "../components/Button";
import { Colors, Fonts } from "../resources";
import { useGlobalStore } from "../stores/global";
import { AutoHeightModal } from "./AutoHeightModal";

interface Props {
  visible: boolean;
}

export const ExitConfirmModal = ({ visible }: Props) => {
  const setToken = useGlobalStore((state) => state.setToken);
  const closeExitConfirmModal = useGlobalStore(
    (store) => store.closeExitConfirmModal
  );

  return (
    <AutoHeightModal visible={visible} onClose={closeExitConfirmModal}>
      <View>
        <Text
          style={{
            height: 48,
            textAlign: "center",
            fontFamily: Fonts.firasansBold,
            fontSize: 18,
            lineHeight: 22,
            color: "#000",
          }}
        >
          Выйти
        </Text>
        <Text
          style={{
            fontFamily: Fonts.firasansRegular,
            fontSize: 18,
            lineHeight: 23,
            color: Colors.dark25,
            textAlign: "center",
          }}
        >
          {`Вы уверены что хотите выйти\nиз своего аккаунта?`}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Button
            action="secondary"
            style={{ flex: 1, flexShrink: 0 }}
            onPress={closeExitConfirmModal}
          >
            Отмена
          </Button>
          <Button
            style={{ flex: 1, marginLeft: 16, flexShrink: 0 }}
            onPress={() => {
              setToken("");
              closeExitConfirmModal();
            }}
          >
            Выйти
          </Button>
        </View>
      </View>
    </AutoHeightModal>
  );
};
