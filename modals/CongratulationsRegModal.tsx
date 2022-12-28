import { useLink } from "expo-router";

import { IndependentText as Text } from "../components/IndependentText";
import AddPhotoIcon from "../icons/AddPhoto";
import Ura from "../icons/Ura";
import { Colors, Fonts } from "../resources";
import { useGlobalStore } from "../stores/global";
import { CircleModal } from "./CircleModal";

interface Props {
  visible: boolean;
}

export const CongratulationsRegModal = ({ visible }: Props) => {
  const closeCongratulationsRegModal = useGlobalStore(
    (state) => state.closeCongratulationsRegModal
  );
  const navigate = useLink();

  return (
    <CircleModal
      visible={visible}
      onClose={closeCongratulationsRegModal}
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
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.dark25,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Еще можно загрузить фото для аватара и указать e-mail
          </Text>
          <AddPhotoIcon onPress={() => navigate.push("/user/edit")} />
        </>
      }
      buttonProps={{
        children: "Перейти к историям!",
        onPress: closeCongratulationsRegModal,
      }}
    />
  );
};
