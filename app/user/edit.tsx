import axios, { AxiosError } from "axios";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useLink } from "expo-router";
import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { usePreviousImmediate } from "rooks";

import {
  deleteProfilePhoto,
  editProfileEmail,
  editProfileName,
  useProfile,
} from "../../api/profile";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { IndependentText as Text } from "../../components/IndependentText";
import { Input } from "../../components/Input";
import { ScreenTemplate } from "../../components/ScreenTemplate";
import { ScreenTitle } from "../../components/ScreenTitle";
import AddIcon from "../../icons/Add";
import DeleteIcon from "../../icons/Delete";
import { Colors, Fonts } from "../../resources";
import { useGlobalStore } from "../../stores/global";

export default function UserEdit() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data: profile, mutate } = useProfile();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const previousEmail = usePreviousImmediate(email);
  const previousName = usePreviousImmediate(name);
  const naviagte = useLink();
  const token = useGlobalStore((state) => state.token);

  useEffect(() => {
    if (!profile) return;
    if (profile.email) setEmail(profile.email);
    setName(profile.name);
  }, [profile]);

  const uploadPhoto = async () => {
    if (!status?.granted) await requestPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.95,
    });
    if (result.cancelled) return;
    const uploadResult = await FileSystem.uploadAsync(
      new URL("/me/photo", axios.defaults.baseURL).href,
      result.uri,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        headers: {
          authorization: token,
        },
        mimeType: "image/png",
        httpMethod: "PUT",
        sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
      }
    );
    if (uploadResult.status === 200) {
      console.log("Изображение успешно загружено");
      mutate((old) => ({ ...old!, photo: true }), false);
    } else {
      console.error("Изображение не загружено. Ошибка", uploadResult.status);
    }
  };

  return (
    <ScreenTemplate>
      <ScreenTitle>Личные данные</ScreenTitle>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <Avatar
          avatar={profile?.photo || false}
          noGradient
          onPress={uploadPhoto}
        />
        <View style={{ marginLeft: 14 }}>
          <Pressable
            onPress={uploadPhoto}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <AddIcon />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: Fonts.firasansRegular,
                fontSize: 16,
                lineHeight: 15,
                color: Colors.violet100,
              }}
            >
              Загрузить фото
            </Text>
          </Pressable>
          <Pressable
            disabled={!profile?.photo}
            onPress={async () => {
              await deleteProfilePhoto();
              await mutate((old) => ({ ...old!, photo: false }), false);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <DeleteIcon
              color={profile?.photo ? Colors.violet100 : Colors.light20}
            />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: Fonts.firasansRegular,
                fontSize: 16,
                lineHeight: 15,
                color: profile?.photo ? Colors.violet100 : Colors.light20,
              }}
            >
              Удалить фото
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 36 }}>
        <Input
          placeholder="Ваше имя"
          autoComplete="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Ваша эл. почта"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ marginTop: 23 }}
        />
        {error && (
          <Text
            style={{
              marginTop: 14,
              color: Colors.red80,
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
            }}
          >
            {error}
          </Text>
        )}
        <Button
          disabled={!name}
          style={{ marginTop: 22 }}
          onPress={async () => {
            try {
              if (previousEmail && previousEmail !== email) {
                await editProfileEmail(email);
                await mutate((old) => ({ ...old!, email }));
              }
              if (previousName && previousName !== name) {
                await editProfileName(name);
                await mutate((old) => ({ ...old!, name }));
              }
              naviagte.back();
            } catch (error) {
              console.error(error);
              if (error instanceof AxiosError) {
                setError(
                  "Произошла непредвиденная ошибка. Повторите попытку чуть позже"
                );
              }
            }
          }}
        >
          Обновить
        </Button>
      </View>
    </ScreenTemplate>
  );
}
