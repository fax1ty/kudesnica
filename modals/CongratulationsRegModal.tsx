import { Text } from "react-native";
import { Colors, Fonts } from "../resources";
import { CircleModal } from "./CircleModal";
import { useGlobalStore } from "../store";

import Ura from "../icons/Ura";
import AddPhotoIcon from "../icons/AddPhoto";

interface Props {
  visible: boolean;
}

export const CongratulationsRegModal = ({ visible }: Props) => {
  const store = useGlobalStore();

  return (
    <CircleModal
      visible={visible}
      onClose={store.closeCongratulationsRegModal}
      headerContent={
        <>
          <Ura />
          <Text
            style={{
              fontFamily: Fonts.firasansBold,
              fontSize: 18,
              lineHeight: 22,
              color: Colors.violet100,
            }}
          >
            Вы зарегистрировались!
          </Text>
        </>
      }
      footerContent={
        <>
          <Text
            style={{
              width: 230,
              height: 46,
              marginTop: 18,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.dark25,
              textAlign: "center",
            }}
          >
            Еще можно загрузить фото для аватара и указать e-mail
          </Text>
          <AddPhotoIcon />
        </>
      }
      buttonProps={{ children: "Перейти к историям!" }}
    />
  );
};
