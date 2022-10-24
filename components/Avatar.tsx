import { Pressable, Image, View } from "react-native";
import { Colors } from "../resources";
import { useMemo } from "react";
import axios from "axios";

import NoAvatarBig from "../icons/NoAvatarBig";
import NoAvatar from "../icons/NoAvatar";

interface Props {
  size?: "small" | "normal";
  avatar: string | null | boolean;
  onPress?: () => void;
  noGradient?: boolean;
}

export const Avatar = ({
  size = "normal",
  avatar,
  onPress,
  noGradient,
}: Props) => {
  const url = useMemo(() => {
    if (avatar === true)
      return new URL("/me/photo", axios.defaults.baseURL).href;
    if (typeof avatar === "string") return avatar;
    return null;
  }, [avatar]);

  if (size === "normal") {
    if (!url)
      return (
        <Pressable
          onPress={onPress}
          style={{ width: 72, height: 72, position: "relative" }}
        >
          {!noGradient && (
            <Image
              source={require("../assets/no-avatar-big-bg.png")}
              style={{ width: "100%", height: "100%", position: "absolute" }}
            />
          )}
          <NoAvatarBig style={{ position: "absolute" }} />
        </Pressable>
      );
    else
      return (
        <Pressable
          onPress={onPress}
          style={{
            width: 72,
            height: 72,
            borderRadius: 72 / 2,
            backgroundColor: Colors.violet40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              overflow: "hidden",
              borderColor: "white",
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: url }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </Pressable>
      );
  } else {
    if (!url)
      return (
        <Pressable
          onPress={onPress}
          style={{
            width: 32,
            height: 32,
            borderRadius: 32 / 2,
            backgroundColor: Colors.violet40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 29,
              height: 29,
              borderRadius: 29 / 2,
              borderColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NoAvatar />
          </View>
        </Pressable>
      );
    else
      return (
        <Pressable
          onPress={onPress}
          style={{
            width: 32,
            height: 32,
            borderRadius: 32 / 2,
            backgroundColor: Colors.violet40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 29,
              height: 29,
              borderRadius: 29 / 2,
              overflow: "hidden",
              borderColor: "white",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: url }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </Pressable>
      );
  }
};
