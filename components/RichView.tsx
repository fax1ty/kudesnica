import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  Image as ImageView,
  ImageURISource,
  ViewStyle,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Video from "react-native-video";
import { mutate } from "swr";

import { IDoll } from "../api/dolls";
import { deleteMedia } from "../api/media";
import { useProfile } from "../api/profile";
import { IRichBlock, IRichImageBorders, IStory } from "../api/stories";
import ChatRect from "../icons/ChatRect";
import MagnifierIcon from "../icons/Magnifier";
import Notes from "../icons/Notes";
import RubyIcon from "../icons/Ruby";
import { Colors, Fonts } from "../resources";
import { useGlobalStore } from "../stores/global";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { LoadableImage } from "./LoadableImage";
import { Skeleton } from "./Skeleton";

interface Props {
  dollAvatar: IStory["cover"];
  data: IRichBlock[];
  dollId: string;
  storyId: string;
  mediaId?: string;
  chat?: IStory["chat"];
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
  }, [url]);

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

const ChatMessage = ({
  avatar,
  message,
  style,
  firstMessage = true,
  attachment,
  galleryUrls,
  position = "left",
}: {
  avatar?: string | null | boolean;
  firstMessage?: boolean;
  message?: string;
  attachment?: {
    preview: boolean;
    url: string;
    kind: "video" | "image";
  };
  style?: ViewStyle;
  galleryUrls?: string[];
  position?: "left" | "right";
}) => {
  const openGalleryModal = useGlobalStore((state) => state.openGalleryModal);
  const setGallery = useGlobalStore((state) => state.setGallery);

  console.log(attachment);

  return (
    <View
      style={{
        ...style,
        flexDirection: position === "left" ? "row" : "row-reverse",
      }}
    >
      <View
        style={{
          marginTop: 5,
          height: 29,
          aspectRatio: 1,
          borderRadius: 29 / 2,
          opacity: firstMessage ? 1 : 0,
        }}
      >
        <Avatar avatar={avatar || null} size="small" />
      </View>
      <View
        style={{
          borderRadius: 6,
          marginLeft: position === "left" ? 9 : 0,
          marginRight: position === "right" ? 9 : 0,
          flex: 1,
          backgroundColor: Colors.light100,
          paddingTop: 9,
          paddingBottom: 7,
          paddingLeft: 11,
          paddingRight: 8,
        }}
      >
        {message && (
          <Text
            style={{
              fontFamily: Fonts.firasansRegular,
              fontSize: 13,
              lineHeight: 16,
              color: Colors.dark100,
            }}
          >
            {message}
          </Text>
        )}
        {attachment && (
          <>
            {attachment.preview && (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!galleryUrls) return;
                  setGallery({
                    urls: galleryUrls,
                    preselectedIndex: 0,
                    kind: attachment.kind,
                  });
                  openGalleryModal();
                }}
              >
                <View
                  style={{
                    height: 139,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {attachment.kind === "image" && (
                    <Image
                      width={196}
                      height={139}
                      source={{ uri: attachment.url }}
                    />
                  )}
                  {attachment.kind === "video" && (
                    <VideoPreview
                      width={196}
                      height={139}
                      url={attachment.url}
                    />
                  )}
                  <View
                    style={{
                      width: 54,
                      aspectRatio: 1,
                      borderRadius: 54 / 2,
                      backgroundColor: Colors.pink100,
                      opacity: 0.9,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                    }}
                  >
                    <MagnifierIcon />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            {!attachment.preview && (
              <View style={{ alignSelf: "center" }}>
                {attachment.kind === "video" && (
                  <Video
                    paused
                    controls
                    source={{
                      headers: {
                        authorization: axios.defaults.headers.common
                          .authorization as string,
                      },
                      uri: attachment.url,
                    }}
                    style={{
                      width: 226,
                      height: 161,
                      backgroundColor: Colors.light100,
                    }}
                  />
                )}
                {attachment.kind === "image" && (
                  <Image
                    width={226}
                    height={161}
                    source={{
                      uri: attachment.url,
                      headers: {
                        authorization: axios.defaults.headers.common
                          .authorization as string,
                      },
                    }}
                  />
                )}
              </View>
            )}
          </>
        )}
        <ChatRect
          style={{
            position: "absolute",
            top: 0,
            left: position === "left" ? 0 : undefined,
            right: position === "right" ? 0 : undefined,
            width: 15,
            height: 13,
            transform: [
              { translateX: position === "left" ? -15 + 8 : 15 - 8 },
              { scaleX: position === "left" ? 1 : -1 },
            ],
          }}
        />
      </View>
    </View>
  );
};

type IChatMessage = NonNullable<IStory["chat"]>[0][0];

const ChatChunk = ({
  dollAvatar,
  dollId,
  storyId,
  messages,
  style,
}: {
  dollAvatar?: IStory["cover"];
  dollId: IDoll["id"];
  storyId: IStory["id"];
  messages: (
    | IChatMessage
    | { kind: "media"; url: string; mediaType: "video" | "image" }
  )[];
  style?: ViewStyle;
}) => {
  const id = useId();

  const getCommonMessageProps = (i: number) => ({
    firstMessage: i === 0,
    style: { marginTop: i === 0 ? 0 : 7 },
    avatar: dollAvatar,
    key: `${id}-message-${i}`,
  });

  return (
    <View style={style}>
      {messages?.map((message, i) => (
        <>
          {message.kind === "gallery" && (
            <ChatMessage
              {...getCommonMessageProps(i)}
              attachment={{
                kind: message.mediaType,
                url: new URL(
                  `/stories/${dollId}/${storyId}/attachment?id=${message.ids[0]}`,
                  axios.defaults.baseURL
                ).href,
                preview: true,
              }}
              galleryUrls={message.ids.map(
                (id) =>
                  new URL(
                    `/stories/${dollId}/${storyId}/attachment?id=${id}`,
                    axios.defaults.baseURL
                  ).href
              )}
            />
          )}
          {message.kind === "media" && (
            <ChatMessage
              {...getCommonMessageProps(i)}
              avatar
              attachment={{
                kind: message.mediaType,
                url: message.url,
                preview: false,
              }}
              position="right"
            />
          )}
          {message.kind === "text" && (
            <ChatMessage {...getCommonMessageProps(i)} message={message.text} />
          )}
        </>
      ))}
    </View>
  );
};

const Chat = ({
  kind,
  storyId,
  dollId,
  mediaId,
  messages,
  dollAvatar,
}: {
  dollAvatar?: IStory["cover"];
  kind: "image" | "video";
  storyId: string;
  dollId: string;
  mediaId?: string;
  messages?: IStory["chat"];
}) => {
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);
  const { data: profile } = useProfile();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [, setError] = useState("");
  const token = useGlobalStore((state) => state.token);
  const [progress, setProgress] = useState(0);
  const [viewableAsset, setViewableAsset] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const chatRef = useRef<FlatList>(null);

  const viewableMessages = useMemo(
    () => [
      ...(messages || []),
      viewableAsset
        ? [{ mediaType: kind, kind: "media", url: viewableAsset }]
        : [],
    ],
    [kind, messages, viewableAsset]
  );

  useEffect(() => {
    if (mediaId) {
      setViewableAsset(
        new URL(`/media/${mediaId}`, axios.defaults.baseURL).href
      );
    }
  }, [mediaId]);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollToEnd({ animated: true });
  }, [viewableMessages]);

  return (
    <View style={{ paddingTop: 72, paddingLeft: 16, paddingRight: 14 }}>
      <Text
        style={{
          fontFamily: Fonts.playfairDisplayItalic,
          fontSize: 26,
          lineHeight: 30,
          color: Colors.violet100,
          textAlign: "center",
          height: 41,
        }}
      >
        Секретный чатик
      </Text>
      <View
        style={{
          marginTop: 4,
          height: 656,
          borderRadius: 25,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ImageView
          source={require("../assets/chat-bg.png")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            padding: 3,
          }}
        >
          <FlatList
            ref={chatRef}
            showsVerticalScrollIndicator={false}
            data={viewableMessages}
            contentContainerStyle={{
              paddingHorizontal: 17 - 3,
            }}
            renderItem={({ index, item }) => (
              <ChatChunk
                dollAvatar={dollAvatar}
                storyId={storyId}
                dollId={dollId}
                messages={item}
                style={{
                  marginTop: index === 0 ? 30 : 7,
                  marginBottom:
                    index === (viewableMessages?.length || 0) - 1 ? 17 : 0,
                }}
              />
            )}
          />
          <View
            style={{
              height: 104,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              backgroundColor: Colors.light100,
              paddingVertical: 12,
              paddingHorizontal: 24,
            }}
          >
            {!viewableAsset && (
              <Button
                progress={progress}
                onPress={async () => {
                  setError("");
                  if (!profile) return openAuthOnlyModal();
                  if (!status?.granted) await requestPermission();
                  const result = await ImagePicker.launchImageLibraryAsync({
                    base64: kind !== "video",
                    mediaTypes:
                      kind === "video"
                        ? ImagePicker.MediaTypeOptions.Videos
                        : ImagePicker.MediaTypeOptions.Images,
                    quality: 0.95,
                    exif: false,
                  });
                  if (!result.assets) return;
                  const fileInfo = await FileSystem.getInfoAsync(
                    result.assets[0].uri,
                    {
                      size: true,
                    }
                  );
                  if (
                    fileInfo.size! >
                    1024 * 1024 * (kind === "video" ? 250 : 15)
                  )
                    return setError("Объект слишком большой, выберите другой");
                  setViewableAsset(
                    kind === "video"
                      ? result.assets[0].uri
                      : `data:image/png;base64,${result.assets[0].base64}`
                  );

                  const uploadTask = FileSystem.createUploadTask(
                    new URL(
                      `/stories/${dollId}/${storyId}/uploadMedia`,
                      axios.defaults.baseURL
                    ).href,
                    result.assets[0].uri,
                    {
                      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                      fieldName: "file",

                      headers: {
                        authorization: token,
                      },
                      mimeType: kind === "video" ? "video/mp4" : "image/png",
                      httpMethod: "POST",
                      sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
                    },
                    ({ totalByteSent, totalBytesExpectedToSend }) => {
                      setProgress(
                        (totalByteSent / totalBytesExpectedToSend) * 100
                      );
                    }
                  );
                  setIsUploading(true);
                  const uploadResult = await uploadTask.uploadAsync();
                  if (!uploadResult) return;
                  if (uploadResult.status === 200) {
                    console.log("Объект успешно загружено", uploadResult.body);
                    await mutate<IStory>(
                      `stories/${dollId}/${storyId}`,
                      (old) => ({ ...old!, media: uploadResult.body }),
                      false
                    );
                  } else {
                    setViewableAsset("");
                    console.error(
                      "Изображение не загружено. Ошибка",
                      uploadResult.status
                    );
                  }
                  setIsUploading(false);
                  setProgress(0);
                }}
                disabled={isUploading}
              >
                {isUploading
                  ? "Загружается..."
                  : `Выбрать ${kind === "video" ? "видео" : "рисунок"}`}
              </Button>
            )}
            {Boolean(viewableAsset) && (
              <Button
                onPress={async () => {
                  if (mediaId) await deleteMedia(mediaId);
                  await mutate<IStory>(
                    `stories/${dollId}/${storyId}`,
                    (old) => ({ ...old!, media: undefined }),
                    false
                  );
                  setViewableAsset("");
                }}
              >
                Удалить
              </Button>
            )}
            <Text
              style={{
                marginTop: 9,
                textAlign: "center",
                fontFamily: Fonts.firasansRegular,
                fontSize: 12,
                lineHeight: 12,
                color: "#aea8a8",
              }}
            >
              Не более 15 мб для фото, и 250 мб для видео
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Lyrics = ({ children }: { children: string }) => {
  return (
    <View style={{ marginTop: 25, ...horizontalPadding }}>
      <Notes style={{ alignSelf: "center" }} />
      <Text
        style={{
          marginTop: 10,
          fontSize: 15,
          lineHeight: 24,
          fontFamily: Fonts.playfairDisplayItalic,
          color: "#705b9e",
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export const generateComponentsFromRichComponents = (
  dollAvatar?: string,
  dollId?: string,
  storyId?: string,
  mediaId?: string,
  data?: IRichBlock[],
  chat?: IStory["chat"]
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
          width="100%"
          height={18}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
        <Skeleton
          width="100%"
          height={18}
          borderRadius={8}
          style={{ marginTop: 12 }}
        />
        <Skeleton
          width="100%"
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
    if (token.type === "chat")
      return (
        <Chat
          dollAvatar={dollAvatar}
          key={`chat-${i}`}
          kind="video"
          dollId={dollId}
          storyId={storyId}
          mediaId={mediaId}
          messages={chat}
        />
      );
    if (token.type === "lyrics") return <Lyrics>{token.text}</Lyrics>;
    return null;
  });
};

export const RichView = ({
  data,
  dollId,
  storyId,
  mediaId,
  chat,
  dollAvatar,
}: Props) => {
  const components = useMemo(
    () =>
      generateComponentsFromRichComponents(
        dollAvatar,
        dollId,
        storyId,
        mediaId,
        data,
        chat
      ),
    [chat, data, dollAvatar, dollId, mediaId, storyId]
  );
  return <View>{components}</View>;
};
