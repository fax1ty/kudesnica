import { useLink } from "expo-router";
import { useState } from "react";
import { View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toggle from "react-native-toggle-element";

import { useProfile } from "../../api/profile";
import { useFavorites } from "../../api/stories";
import { Avatar } from "../../components/Avatar";
// import { GradientCard } from "../../components/GradientCard";
import { IndependentText as Text } from "../../components/IndependentText";
import { Pin } from "../../components/Pin";
import BackIcon from "../../icons/Back";
// import DelockIcon from "../../icons/Delock";
import EditIcon from "../../icons/Edit";
import ExitIcon from "../../icons/Exit";
import HeartIcon from "../../icons/HeartSmallestFilled";
import HelpIcon from "../../icons/Help";
// import LockIcon from "../../icons/Lock";
import NextIcon from "../../icons/Next";
import NorifyIcon from "../../icons/Notify";
import {
  Colors,
  Fonts,
  // Values
} from "../../resources";
import { useGlobalStore } from "../../stores/global";

export default function Dolls() {
  const { data: profile } = useProfile();
  const [isNotificationActive, setNotificationActive] = useState(true);
  const navigate = useLink();
  const { data: favorites } = useFavorites();
  const openExitConfirmModal = useGlobalStore(
    (state) => state.openExitConfirmModal
  );

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <Image
        source={require("../../assets/user-bg.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <SafeAreaView
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          paddingLeft: 19,
          paddingRight: 20,
        }}
      >
        {/* Шапка */}
        <View
          style={{
            marginTop: 44,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => navigate.back()}
              style={{ aspectRatio: 1 }}
            >
              <BackIcon />
            </Pressable>
            <View style={{ marginLeft: 21 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: Fonts.playfairDisplayItalic,
                  fontSize: 26,
                  lineHeight: 32,
                  color: Colors.violet100,
                  width: 190,
                }}
              >
                {profile?.name.replace(" ", "\n")}
              </Text>
              <Pressable
                onPress={() => navigate.push("/user/edit")}
                style={{
                  flexDirection: "row",
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <EditIcon />
                <Text
                  style={{
                    marginLeft: 4,
                    fontFamily: Fonts.firasansRegular,
                    fontSize: 13,
                    lineHeight: 16,
                    color: Colors.pink100,
                  }}
                >
                  Редактировать
                </Text>
              </Pressable>
            </View>
          </View>
          <Avatar
            avatar={profile?.photo || false}
            onPress={() => navigate.push("/user/edit")}
          />
        </View>
        {/* Разблокировать истории */}
        {/* <GradientCard
          theme={profile?.premium ? "blue" : "red"}
          //   onPress={() => navigate.push("AddCard")}
          icon={profile?.premium ? <DelockIcon /> : <LockIcon />}
          style={{ marginTop: 30 }}
          title={
            <Text
              style={{
                fontFamily: Fonts.firasansBold,
                fontSize: 14,
                lineHeight: 14,
                color: profile?.premium ? Colors.green100 : Colors.violet100,
              }}
            >
              {profile?.premium
                ? "Все истории разблокированы!"
                : "Разблокировать все истории"}
            </Text>
          }
          description={
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text
                style={{
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 13,
                  lineHeight: 13,
                  color: Colors.dark25,
                }}
              >
                {profile?.premium
                  ? "Включена ежемесячная подписка"
                  : "Ежемесячная подписка за"}
              </Text>
              {!profile?.premium && (
                <Text
                  style={{
                    marginLeft: 4,
                    fontFamily: Fonts.firasansBold,
                    fontSize: 13,
                    lineHeight: 13,
                    color: Colors.green80,
                  }}
                >
                  199 ₽
                </Text>
              )}
            </View>
          }
        /> */}
        {/* Меню */}
        <View
          style={{
            backgroundColor: Colors.light100,
            borderRadius: 18,
            marginTop: 35,
            paddingHorizontal: 21,
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={() => navigate.push("favorites")}
            style={{
              flexDirection: "row",
              height: 67 - 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 23,
                height: 23,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HeartIcon />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={{
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 16,
                  lineHeight: 15,
                  color: Colors.dark25,
                }}
              >
                Любимые истории
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pin color={Colors.pink100}>{favorites?.length || 0}</Pin>
              <NextIcon style={{ marginLeft: 3 }} />
            </View>
          </Pressable>
          <View
            style={{
              width: "96%",
              height: 1,
              backgroundColor: Colors.light60,
            }}
          />
          <Pressable
            onPress={() => setNotificationActive(!isNotificationActive)}
            style={{
              flexDirection: "row",
              height: 67 - 1,
              alignItems: "center",
            }}
          >
            <NorifyIcon />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={{
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 16,
                  lineHeight: 15,
                  color: Colors.dark25,
                }}
              >
                Новые истории
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 13,
                  lineHeight: 16,
                  color: Colors.dark25,
                }}
              >
                Присылать уведомления
              </Text>
            </View>
            <Toggle
              containerStyle={{ width: 42, height: 24, alignSelf: "center" }}
              value={isNotificationActive}
              onPress={(value) => setNotificationActive(value || false)}
              trackBar={{
                activeBackgroundColor: Colors.pink100,
                inActiveBackgroundColor: Colors.pink20,
                width: 42 - 2 * 2,
                height: 24 - 2 * 2,
                borderActiveColor: Colors.pink100,
                borderInActiveColor: Colors.pink20,
                borderWidth: 2,
              }}
              thumbButton={{
                activeBackgroundColor: Colors.light80,
                inActiveBackgroundColor: Colors.light80,
                width: 20,
                height: 20,
              }}
            />
          </Pressable>
          <View
            style={{
              width: "96%",
              height: 1,
              backgroundColor: Colors.light60,
            }}
          />
          <Pressable
            onPress={() => openExitConfirmModal()}
            style={{
              flexDirection: "row",
              height: 67 - 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 23,
                height: 23,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ExitIcon />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={{
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 16,
                  lineHeight: 15,
                  color: Colors.dark25,
                }}
              >
                Выйти
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <NextIcon />
            </View>
          </Pressable>
        </View>
        {/* Поддержка */}
        <Pressable
          onPress={() => navigate.push("help")}
          style={{
            position: "absolute",
            flexDirection: "row",
            bottom: 30,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <HelpIcon />
          <Text
            style={{
              marginLeft: 9,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.violet80,
            }}
          >
            Поддержка
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
