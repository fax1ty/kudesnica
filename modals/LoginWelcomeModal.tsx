import { IndependentText as Text } from "../components/IndependentText";
import { Colors, Fonts } from "../resources";
import { CircleModal } from "./CircleModal";
import { useGlobalStore } from "../stores/global";
import { useProfile } from "../api/profile";

interface Props {
  visible: boolean;
}

export const LoginWelcomeModal = ({ visible }: Props) => {
  const { data: profile } = useProfile();
  const closeLoginWelcomeModal = useGlobalStore(
    (state) => state.closeLoginWelcomeModal
  );

  return (
    <CircleModal
      visible={visible}
      onClose={closeLoginWelcomeModal}
      headerContent={
        <>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: Fonts.playfairDisplayItalic,
              fontSize: 26,
              lineHeight: 32,
              color: Colors.violet100,
            }}
          >
            {profile?.name.replace(" ", "\n") || "Загрузка..."}
          </Text>
          <Text
            style={{
              marginTop: 7,
              fontFamily: Fonts.firasansRegular,
              fontSize: 14,
              lineHeight: 18,
              color: Colors.violet80,
            }}
          >
            вы успешно вошли!
          </Text>
        </>
      }
      footerContent={
        <>
          <Text
            style={{
              marginTop: 21,
              fontFamily: Fonts.firasansRegular,
              fontSize: 14,
              lineHeight: 18,
              color: Colors.green100,
            }}
          >
            {profile?.premium
              ? "Включена ежемесячная подписка"
              : "Все истории всего за 199 ₽!"}
          </Text>
          <Text
            style={{
              marginTop: 9,
              width: 250,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.dark25,
              textAlign: "center",
            }}
          >
            {profile?.premium ? (
              <>
                Включена ежемесячная автоподписка за 199 ₽ в месяц. Вы можете её
                отключить в любой момент в{" "}
                <Text
                  style={{
                    color: Colors.pink100,
                    textDecorationLine: "underline",
                  }}
                >
                  настройках подписки.
                </Text>
              </>
            ) : (
              "Оформите ежемесячную подписку и\nкаждый месяц вас ждут новые\nувлекательные истории из\nжизни кукол!"
            )}
          </Text>
        </>
      }
      buttonProps={{
        children: "Перейти к историям!",
        onPress: closeLoginWelcomeModal,
      }}
    />
  );
};
