import { CircularProgressBase } from "react-native-circular-progress-indicator";
import useBus from "use-bus";
import { View, Text, Image, Pressable } from "react-native";
import { useState, ReactNode } from "react";
import { Colors, Fonts } from "../resources";
import { Skeleton } from "./Skeleton";

import PlayIcon from "../icons/Play";
import PauseIcon from "../icons/Pause";

const PLAYER_HEIGHT = 80;
const PLAYER_COVER_SIZE = 59;
const PLAYER_COVER_PROGRESS_WIDTH = 59 - 51;

interface Props {
  cover?: string;
  title?: string;
  description?: string;
  titleHilighted?: boolean;
  icon?: ReactNode;
  onCoverClick?: () => void;
  isPlaying?: boolean;
  id: string;
}

const IndependentCircularProgress = ({ progress = 0 }) => {
  // VERY BIG PERFORMANCE IMAPCT!!!
  return (
    <CircularProgressBase
      value={progress}
      maxValue={100}
      radius={PLAYER_COVER_SIZE / 2}
      activeStrokeWidth={PLAYER_COVER_PROGRESS_WIDTH}
      activeStrokeColor={Colors.pink100}
      inActiveStrokeColor={Colors.light60}
    />
  );
};

export const LowPlayer = ({
  cover,
  title,
  description,
  titleHilighted = false,
  icon,
  onCoverClick,
  isPlaying = false,
  id,
}: Props) => {
  const [progress, setProgress] = useState(0);
  const [coverLoaded, setCoverLoaded] = useState(false);

  useBus(`UI_BOTTOM_PLAYER_SET_PROGRESS/${id}`, ({ value }) => {
    setProgress(value);
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: PLAYER_HEIGHT,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={onCoverClick}
          style={{
            width: PLAYER_COVER_SIZE,
            height: PLAYER_COVER_SIZE,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "relative",
              width: PLAYER_COVER_SIZE - PLAYER_COVER_PROGRESS_WIDTH,
              aspectRatio: 1,
              borderRadius:
                (PLAYER_COVER_SIZE - PLAYER_COVER_PROGRESS_WIDTH) / 2,
              overflow: "hidden",
              transform: [
                {
                  translateX: PLAYER_COVER_PROGRESS_WIDTH / 2,
                },
                {
                  translateY: PLAYER_COVER_PROGRESS_WIDTH / 2,
                },
              ],
            }}
          >
            {cover && (
              <Image
                onLoad={() => setCoverLoaded(true)}
                style={{
                  position: "absolute",
                  width: "100%",
                  aspectRatio: 1,
                }}
                source={{ uri: cover }}
              />
            )}
            <View
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: 1,
                backgroundColor: "rgba(29, 29, 29, 0.27)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(!cover || !coverLoaded) && (
                <Skeleton
                  width="100%"
                  height="100%"
                  style={{ position: "absolute" }}
                />
              )}
              {title && (
                <>
                  {isPlaying ? (
                    <PauseIcon style={{ position: "absolute" }} />
                  ) : (
                    <PlayIcon style={{ position: "absolute" }} />
                  )}
                </>
              )}
            </View>
          </View>
          <View
            style={{
              width: PLAYER_COVER_SIZE,
              height: PLAYER_COVER_SIZE,
              position: "absolute",
              opacity: progress === 0 ? 0 : 1,
            }}
          >
            <IndependentCircularProgress progress={progress} />
          </View>
        </Pressable>
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {titleHilighted && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8 / 2,
                  backgroundColor: Colors.pink100,
                }}
              />
            )}
            {title ? (
              <Text
                style={{
                  marginLeft: titleHilighted ? 5 : 0,
                  lineHeight: 17,
                  fontSize: 12,
                  fontFamily: Fonts.firasansRegular,
                  color: Colors.dark50,
                }}
              >
                {title}
              </Text>
            ) : (
              <Skeleton width={200} height={17} borderRadius={8} />
            )}
          </View>
          {description ? (
            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,
                lineHeight: 17,
                fontSize: 12,
                fontFamily: Fonts.firasansRegular,
                color: Colors.dark25,
              }}
            >
              {description}
            </Text>
          ) : (
            <Skeleton
              width={150}
              height={14}
              borderRadius={8}
              style={{ marginTop: 4 }}
            />
          )}
        </View>
      </View>
      {icon}
    </View>
  );
};
