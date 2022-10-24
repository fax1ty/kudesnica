import { useMemo } from "react";
import { Text, View, Image as ImageView } from "react-native";
import { Colors, Fonts } from "../resources";
import { IRichBlock, IRichImageBorders } from "../api/stories";
import { LoadableImage } from "./LoadableImage";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";

import RubyIcon from "../icons/Ruby";
import PlusWithStars from "../icons/PlusWithStars";

interface Props {
  data: Array<IRichBlock>;
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
        fontFamily: Fonts.playfairdisplayItalic,
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
        fontFamily: Fonts.playfairdisplayItalic,
        fontSize: 15,
        lineHeight: 24,
        ...horizontalPadding,
      }}
    >
      {children}
    </Text>
  );
};

const Image = ({
  url,
  width,
  height,
  borderRadius = 0,
}: {
  url: string;
  width?: number;
  height?: number;
  borderRadius?: number | IRichImageBorders;
}) => {
  if (!width || !height) return <ImageView source={{ uri: url }} />;
  const sameBorder = typeof borderRadius === "number";
  return (
    <LoadableImage
      url={url}
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

const Attachment = ({ kind }: { kind: "image" | "video" }) => {
  return (
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
        }}
      >
        <Text
          style={{
            marginTop: 21,
            fontFamily: Fonts.playfairdisplayItalic,
            fontSize: 26,
            lineHeight: 30,
            paddingLeft: 14,
            paddingRight: 17,
            textAlign: "center",
          }}
        >
          Пришли своё видео!
        </Text>
        <PlusWithStars style={{ marginTop: 18, alignSelf: "center" }} />
        <View style={{ paddingLeft: 26, paddingRight: 29, marginTop: 26 }}>
          <Button disabled>Загрузить!</Button>
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
          Не более 200 Мб
        </Text>
      </View>
    </View>
  );
};

export const generateComponentsFromRichComponents = (
  data?: Array<IRichBlock>
) => {
  if (!data)
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
          url={token.url}
          width={token.width}
          height={token.height}
          borderRadius={token.borderRadius}
        />
      );
    if (token.type === "attachment")
      return <Attachment key={`attachment-${i}`} kind="video" />;
    return null;
  });
};

export const RichView = ({ data }: Props) => {
  const components = useMemo(
    () => generateComponentsFromRichComponents(data),
    [data]
  );
  return <View>{components}</View>;
};
