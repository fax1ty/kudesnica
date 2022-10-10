import { useMemo } from "react";
import { Text, View, Image as ImageView } from "react-native";
import { Colors, Fonts } from "../resources";
import { IRichBlock } from "../api/stories";
import { LoadableImage } from "./LoadableImage";

import RubyIcon from "../icons/Ruby";

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
  borderRadius?: number;
}) => {
  if (!width || !height) return <ImageView source={{ uri: url }} />;
  return (
    <LoadableImage
      url={url}
      style={{
        width,
        height,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      }}
    />
  );
};

export const generateComponentsFromRichComponents = (data: Array<IRichBlock>) =>
  data.map((token, i) => {
    if (token.type === "h1") return <H1 key={`h1-${i}`}>{token.text}</H1>;
    if (token.type === "h2") return <H2 key={`h2-${i}`}>{token.text}</H2>;
    if (token.type === "h3") return <H3 key={`h3-${i}`}>{token.text}</H3>;
    if (token.type === "p")
      return <Paragraph key={`p-${i}`}>{token.text}</Paragraph>;
    if (token.type === "image")
      return (
        <Image url={token.url} width={token.width} height={token.height} />
      );
    return null;
  });
[];

export const RichView = ({ data }: Props) => {
  const components = useMemo(
    () => generateComponentsFromRichComponents(data),
    [data]
  );
  return <View>{components}</View>;
};
