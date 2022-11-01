import { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  Image as ImageView,
  Pressable,
  ScrollView,
  Linking,
  ImageURISource,
} from "react-native";
import { Colors, Fonts, Values } from "../resources";
import { IRichBlock, IRichImageBorders, IStory } from "../api/stories";
import { LoadableImage } from "./LoadableImage";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { useGlobalStore } from "../stores/global";
import { useProfile } from "../api/profile";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import Video from "react-native-video";
import { deleteMedia } from "../api/media";
import { mutate } from "swr";
import * as VideoThumbnails from "expo-video-thumbnails";

import RubyIcon from "../icons/Ruby";
import PlusIcon from "../icons/Plus";
import Stars from "../icons/Stars";
import Instagram from "../icons/InstagramBig";
import VK from "../icons/VKBig";
import Telegram from "../icons/TelegramBig";
import EditIcon from "../icons/Edit";

interface Props {
  data: Array<IRichBlock>;
  dollId: string;
  storyId: string;
  mediaId?: string;
  attachments?: IStory["attachments"];
}

const horizontalPadding = {
  paddingLeft: 27,
  paddingRight: 14,
};

export const H1 = ({ children }: { children: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        ...horizontalPadding,
      }}
    >
      <RubyIcon />
      <Text
        style={{
          color: Colors.violet100,
          fontFamily: Fonts.firasansRegular,
          fontSize: 13,
          lineHeight: 16,
          marginLeft: 6,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export const H2 = ({ children }: { children: string }) => {
  return (
    <Text
      style={{
        marginTop: 16,
        color: Colors.dark25,
        fontFamily: Fonts.firasansRegular,
        fontSize: 13,
        lineHeight: 16,
        ...horizontalPadding,
      }}
    >
      {children}
    </Text>
  );
};

const H3 = ({ children }: { children: string }) => {
  return (
    <Text
      style={{
        marginTop: 16,
        color: "#df387b",
        fontFamily: Fonts.playfairDisplayItalic,
        fontSize: 20,
        lineHeight: 32,
        ...horizontalPadding,
      }}
    >
      {children}
    </Text>
  );
};

const Paragraph = ({ children }: { children: string }) => {
  return (
    <Text
      style={{
        marginTop: 25,
        color: Colors.dark100,
        fontFamily: Fonts.playfairDisplayRegular,
        fontSize: 15,
        lineHeight: 24,
        ...horizontalPadding,
      }}
    >
      {children}
    </Text>
  );
};

const VideoPreview = ({
  width,
  height,
  url,
}: {
  width: number;
  height: number;
  url: string;
}) => {
  const [showUrl, setShowUrl] = useState("");

  useEffect(() => {
    VideoThumbnails.getThumbnailAsync(url, { quality: 0.5 }).then(({ uri }) =>
      setShowUrl(uri)
    );
  }, []);

  return <LoadableImage source={{ uri: showUrl }} style={{ width, height }} />;
};

const Image = ({
  source,
  width,
  height,
  borderRadius = 0,
}: {
  source: ImageURISource;
  width?: number;
  height?: number;
  borderRadius?: number | IRichImageBorders;
}) => {
  if (!width || !height) return <ImageView source={source} />;
  const sameBorder = typeof borderRadius === "number";
  return (
    <LoadableImage
      source={source}
      style={{
        marginTop: 19,
        alignSelf: "center",
        width,
        height,
        borderTopLeftRadius: sameBorder ? borderRadius : borderRadius[0],
        borderTopRightRadius: sameBorder ? borderRadius : borderRadius[1],
        borderBottomLeftRadius: sameBorder ? borderRadius : borderRadius[2],
        borderBottomRightRadius: sameBorder ? borderRadius : borderRadius[3],
      }}
    />
  );
};

const Attachment = ({
  kind,
  storyId,
  dollId,
  mediaId,
  attachments,
}: {
  kind: "image" | "video";
  storyId: string;
  dollId: string;
  mediaId?: string;
  attachments?: IStory["attachments"];
}) => {
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);
  const { data: profile } = useProfile();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [error, setError] = useState("");
  const token = useGlobalStore((state) => state.token);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(0);
  const [viewableAsset, setViewableAsset] = useState("");
  const setGallery = useGlobalStore((state) => state.setGallery);
  const openGalleryModal = useGlobalStore((state) => state.openGalleryModal);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!url && mediaId) {
      setViewableAsset(
        new URL(`/media/${mediaId}`, axios.defaults.baseURL).href
      );
      setStep(1);
    }
  }, [mediaId, url]);

  const BUTTON_SIZE = 59;
  const BUTTON_PROGRESS_WIDTH = 8;

  return (
    <>
      <View
        style={{
          height: 274,
          position: "relative",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          overflow: "hidden",
          marginTop: 55,
          marginLeft: 14,
          marginRight: 16,
        }}
      >
        <ImageView
          source={require("../assets/attachment-bg.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            paddingTop: 21,
            paddingBottom: 16,
            paddingLeft: 14,
            paddingRight: 17,
          }}
        >
          {step === 0 && (
            <>
              <Text
                style={{
                  fontFamily: Fonts.playfairDisplayItalic,
                  fontSize: 26,
                  lineHeight: 30,
                  textAlign: "center",
                  color: Colors.violet100,
                }}
              >
                Пришли своё {kind === "image" ? "фото" : "видео"}!
              </Text>
              <View
                style={{
                  marginTop: 18,
                  height: BUTTON_SIZE + BUTTON_PROGRESS_WIDTH,
                  width: "100%",
                  position: "relative",
                }}
              >
                <Stars style={{ alignSelf: "center", position: "absolute" }} />
                <Pressable
                  onPress={async () => {
                    if (isUploading) return;
                    setError("");
                    if (!profile) openAuthOnlyModal();
                    if (!status?.granted) await requestPermission();
                    const result = await ImagePicker.launchImageLibraryAsync({
                      base64: kind === "video" ? false : true,
                      mediaTypes:
                        kind === "video"
                          ? ImagePicker.MediaTypeOptions.Videos
                          : ImagePicker.MediaTypeOptions.Images,
                      quality: 0.95,
                      exif: false,
                    });
                    if (result.cancelled) return;
                    const fileInfo = await FileSystem.getInfoAsync(result.uri, {
                      size: true,
                    });
                    if (
                      fileInfo.size! >
                      1024 * 1024 * (kind === "video" ? 200 : 15)
                    )
                      return setError(
                        "Объект слишком большой, выберите другой"
                      );
                    setUrl(result.uri);
                    setViewableAsset(
                      kind === "video"
                        ? result.uri
                        : `data:image/png;base64,${result.base64}`
                    );
                  }}
                  style={{
                    alignSelf: "center",
                    position: "relative",
                    width: BUTTON_SIZE + BUTTON_PROGRESS_WIDTH,
                    borderRadius: (BUTTON_SIZE + BUTTON_PROGRESS_WIDTH) / 2,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  >
                    <CircularProgressBase
                      value={progress}
                      maxValue={100}
                      radius={(BUTTON_SIZE + BUTTON_PROGRESS_WIDTH) / 2}
                      inActiveStrokeWidth={BUTTON_PROGRESS_WIDTH}
                      activeStrokeWidth={BUTTON_PROGRESS_WIDTH}
                      activeStrokeColor={Colors.violet80}
                      inActiveStrokeColor={Colors.light100}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      width: BUTTON_SIZE - BUTTON_PROGRESS_WIDTH / 2,
                      borderRadius:
                        (BUTTON_SIZE - BUTTON_PROGRESS_WIDTH / 2) / 2,
                      aspectRatio: 1,
                      backgroundColor: Colors.violet40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!isUploading && !url && <PlusIcon />}
                    {!isUploading && url && <EditIcon />}
                  </View>
                </Pressable>
              </View>
              <View
                style={{ paddingLeft: 26, paddingRight: 29, marginTop: 26 }}
              >
                <Button
                  disabled={!profile ? false : !url || isUploading}
                  onPress={async () => {
                    if (isUploading) return;
                    if (!profile) openAuthOnlyModal();
                    if (!url) return;
                    const uploadTask = FileSystem.createUploadTask(
                      new URL(
                        `/stories/${dollId}/${storyId}/uploadMedia`,
                        axios.defaults.baseURL
                      ).href,
                      url,
                      {
                        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                        fieldName: "file",

                        headers: {
                          authorization: token,
                        },
                        mimeType: kind === "video" ? "video/mp4" : "image/png",
                        httpMethod: "POST",
                        sessionType:
                          FileSystem.FileSystemSessionType.BACKGROUND,
                      },
                      ({ totalByteSent, totalBytesExpectedToSend }) => {
                        setProgress(
                          (totalByteSent / totalBytesExpectedToSend) * 100
                        );
                      }
                    );
                    setIsUploading(true);
                    const uploadResult = await uploadTask.uploadAsync();
                    setIsUploading(false);
                    setProgress(0);
                    if (!uploadResult) return;
                    if (uploadResult.status === 200) {
                      console.log(
                        "Объект успешно загружено",
                        uploadResult.body
                      );
                      await mutate(
                        `stories/${dollId}/${storyId}`,
                        (old: IStory) => ({ ...old, media: uploadResult.body }),
                        false
                      );
                      setStep(1);
                    } else {
                      console.error(
                        "Изображение не загружено. Ошибка",
                        uploadResult.status
                      );
                    }
                  }}
                >
                  Загрузить!
                </Button>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 12,
                  lineHeight: 12,
                  color: "#b0b0b0",
                }}
              >
                Не более {kind === "image" ? 15 : 200} Мб
              </Text>
              {error && (
                <Text
                  style={{
                    color: Colors.red80,
                    fontFamily: Fonts.firasansRegular,
                    fontSize: 13,
                    lineHeight: 16,
                    marginTop: 7,
                  }}
                >
                  {error}
                </Text>
              )}
            </>
          )}
          {step === 1 && (
            <>
              <Text
                style={{
                  marginTop: 40 - 21,
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 18,
                  lineHeight: 23,
                  color: Colors.green100,
                  textAlign: "center",
                }}
              >
                {kind === "video" ? "Видео" : "Рисунок"} успешно загружен
                {kind === "video" ? "о" : ""}
              </Text>
              <Text
                style={{
                  marginTop: 21,
                  fontFamily: Fonts.playfairDisplayItalic,
                  fontSize: 26,
                  lineHeight: 30,
                  color: "#df387b",
                  textAlign: "center",
                }}
              >
                Спасибо за {kind === "video" ? "видео" : "рисунок"}!{"\n"}Ты
                молодец!
              </Text>
              <Button
                style={{ marginTop: 32 }}
                onPress={() => setStep(2)}
              >{`Посмотреть ${kind === "video" ? "видео" : "рисунок"}`}</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Text
                style={{
                  alignSelf: "center",
                  fontFamily: Fonts.playfairDisplayItalic,
                  fontSize: 26,
                  lineHeight: 30,
                  color: Colors.violet100,
                }}
              >
                {kind === "video" ? "Твоё видео" : "Твой рисунок"}
              </Text>
              <View style={{ alignSelf: "center", marginTop: 5 }}>
                {kind === "video" && (
                  <Video
                    controls
                    source={{
                      headers: {
                        authorization: axios.defaults.headers.common
                          .authorization as string,
                      },
                      uri: viewableAsset,
                    }}
                    style={{
                      width: 226,
                      height: 161,
                      backgroundColor: Colors.light100,
                    }}
                  />
                )}
                {kind === "image" && (
                  <Image
                    width={226}
                    height={161}
                    source={{
                      uri: viewableAsset,
                      headers: {
                        authorization: axios.defaults.headers.common
                          .authorization as string,
                      },
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.firasansRegular,
                    fontSize: 14,
                    lineHeight: 18,
                    color: Colors.violet80,
                  }}
                  onPress={async () => {
                    if (mediaId) await deleteMedia(mediaId);
                    await mutate(
                      `stories/${dollId}/${storyId}`,
                      (old: IStory) => ({ ...old, media: undefined }),
                      false
                    );
                    setStep(0);
                    setUrl("");
                  }}
                >
                  Удалить
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      {attachments && attachments[kind]?.length && step === 0 && (
        <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 34 }}>
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 10,
              lineHeight: 12,
              color: Colors.dark25,
              letterSpacing: 0.08,
              textTransform: "uppercase",
            }}
          >
            {kind === "video" ? "Видео" : "Рисунки"} других пользователей
          </Text>
          <ScrollView
            style={{ marginTop: 9, height: 64 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {attachments[kind]!.map(
              (id) =>
                new URL(
                  `/stories/${dollId}/${storyId}/attachment?id=${id}`,
                  axios.defaults.baseURL
                ).href
            ).map((url, i, urls) => (
              <Pressable
                style={{ marginLeft: i === 0 ? 0 : 24 }}
                key={`${storyId}-attach-${i}`}
                onPress={() => {
                  setGallery({
                    urls,
                    kind,
                    preselectedIndex: i,
                  });
                  openGalleryModal();
                }}
              >
                {kind === "video" && (
                  <VideoPreview width={90} height={64} url={url} />
                )}
                {kind === "image" && (
                  <Image width={90} height={64} source={{ uri: url }} />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      {step !== 0 && (
        <View style={{ marginTop: 22, marginLeft: 14, marginRight: 16 }}>
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              fontFamily: Fonts.firasansRegular,
              fontSize: 14,
              lineHeight: 18,
              color: Colors.dark25,
            }}
          >
            Следи за нашими социальными сетями, и{"\n"}возможно твой рисунок
            попадет в{"\n"}подборку интересных работ!
          </Text>
          <View
            style={{
              marginTop: 14,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Instagram
              onPress={async () => await Linking.openURL(Values.instagramUrl)}
            />
            <VK
              style={{ marginLeft: 33 }}
              onPress={async () => await Linking.openURL(Values.vkUrl)}
            />
            <Telegram
              style={{ marginLeft: 27 }}
              onPress={async () => await Linking.openURL(Values.tgUrl)}
            />
          </View>
        </View>
      )}
    </>
  );
};

export const generateComponentsFromRichComponents = (
  dollId?: string,
  storyId?: string,
  mediaId?: string,
  data?: Array<IRichBlock>,
  attachments?: IStory["attachments"]
) => {
  if (!dollId || !storyId || !data)
    return [
      <View style={{ ...horizontalPadding }}>
        <Skeleton width={200} height={12} borderRadius={8} />
        <Skeleton
          width={200}
          height={12}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
        <Skeleton
          width={"100%"}
          height={18}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
        <Skeleton
          width={"100%"}
          height={18}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
        <Skeleton
          width={"100%"}
          height={18}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
      </View>,
    ];
  return data.map((token, i) => {
    if (token.type === "h1") return <H1 key={`h1-${i}`}>{token.text}</H1>;
    if (token.type === "h2") return <H2 key={`h2-${i}`}>{token.text}</H2>;
    if (token.type === "h3") return <H3 key={`h3-${i}`}>{token.text}</H3>;
    if (token.type === "p")
      return <Paragraph key={`p-${i}`}>{token.text}</Paragraph>;
    if (token.type === "image")
      return (
        <Image
          source={{ uri: token.url }}
          width={token.width}
          height={token.height}
          borderRadius={token.borderRadius}
        />
      );
    if (token.type === "attachment")
      return (
        <Attachment
          key={`attachment-${i}`}
          kind="video"
          dollId={dollId}
          storyId={storyId}
          mediaId={mediaId}
          attachments={attachments}
        />
      );
    return null;
  });
};

export const RichView = ({
  data,
  dollId,
  storyId,
  mediaId,
  attachments,
}: Props) => {
  const components = useMemo(
    () =>
      generateComponentsFromRichComponents(
        dollId,
        storyId,
        mediaId,
        data,
        attachments
      ),
    [data]
  );
  return <View>{components}</View>;
};
