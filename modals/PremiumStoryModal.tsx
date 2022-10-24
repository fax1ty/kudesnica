import { Text } from "react-native";
import { Colors, Fonts } from "../resources";
import { CircleModal } from "./CircleModal";
import { useGlobalStore } from "../store";

import LockCircled from "../icons/LockCircled";

interface Props {
  visible: boolean;
}

export const PremiumStoryModal = ({ visible }: Props) => {
  const store = useGlobalStore();

  return (
    <CircleModal
      visible={visible}
      onClose={store.closePremiumStoryModal}
      headerContent={
        <>
          <LockCircled style={{ marginBottom: 14 }} />
          <Text
            style={{
              fontFamily: Fonts.firasansBold,
              fontSize: 18,
              lineHeight: 22,
              color: Colors.violet100,
            }}
          >
            История доступна по подписке
          </Text>
          <Text
            style={{
              marginTop: 7,
              fontFamily: Fonts.firasansRegular,
              fontSize: 14,
              lineHeight: 18,
              color: Colors.green100,
            }}
          >
            Ежемесяная подписка всего за 199 ₽!
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
            {
              "Оформите ежемесячную подписку и\nкаждый месяц вас ждут новые\nувлекательные истории из\nжизни кукол!"
            }
          </Text>
        </>
      }
      buttonProps={{
        children: "Оформить подписку за 199 ₽!",
        onPress: store.closePremiumStoryModal,
      }}
    />
  );
};
