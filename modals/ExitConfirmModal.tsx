import axios from "axios";
import { View } from "react-native";
import { usePersistedState } from "react-native-use-persisted-state";
import { mutate } from "swr";

import { Button } from "../components/Button";
import { IndependentText as Text } from "../components/IndependentText";
import { Colors, Fonts } from "../resources";
import { useGlobalStore } from "../stores/global";
import { AutoHeightModal } from "./AutoHeightModal";

interface Props {
  visible: boolean;
}

export const ExitConfirmModal = ({ visible }: Props) => {
  const setToken = useGlobalStore((state) => state.setToken);
  const [, setPersistToken] = usePersistedState("@token", "");
  const closeExitConfirmModal = useGlobalStore(
    (state) => state.closeExitConfirmModal
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
            onPress={async () => {
              await mutate(() => true, undefined, false);
              axios.defaults.headers.common.authorization = "";
              setToken("");
              setPersistToken("");
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
