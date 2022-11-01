import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { View, Text, Image, Pressable } from "react-native";
import { useState, ReactNode, useMemo, createElement } from "react";
import { Colors, Fonts, Values } from "../resources";
import { Skeleton } from "./Skeleton";
import { percentageOf } from "../utils/math";
import { useGlobalStore } from "../stores/global";
import { useDoll } from "../api/dolls";
import { useStory } from "../api/stories";
import { useProfile } from "../api/profile";
import { updateCurrentlyPlaying } from "../utils/audio";
import { useAudioStore } from "../stores/audio";
import TrackPlayer from "react-native-track-player";
import { useTrackProgress, useTrackState } from "../hooks/audio";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";

import PlayIcon from "../icons/Play";
import PauseIcon from "../icons/Pause";
import LockIcon from "../icons/PlayerLock";

const PLAYER_COVER_SIZE = 59;
const PLAYER_COVER_PROGRESS_WIDTH = 4;

interface Props {
  PressableComponent?: typeof TouchableWithoutFeedback;
  cover?: string;
  title?: string;
  description?: string;
  titleHilighted?: boolean;
  icon?: ReactNode;
  id?: string;
  duration?: number;
  dollId?: string;
}

export const LowPlayer = ({
  PressableComponent,
  cover,
  title,
  description,
  titleHilighted = false,
  icon,
  id: storyId,
  dollId,
  duration,
}: Props) => {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const { data: doll } = useDoll(dollId || null);
  const { data: story } = useStory(dollId || null, storyId || null);
  const { data: profile } = useProfile();
  const locked = useMemo(
    () =>
      !story
        ? true
        : !profile
        ? story.premium
        : story.premium && !profile.premium,
    [story, profile]
  );
  const progress = useTrackProgress(story?.id);
  const state = useTrackState(story?.id);
  const total = useMemo(
    () => percentageOf(progress, duration || 1000),
    [progress]
  );
  const openPremiumStoryModal = useGlobalStore(
    (state) => state.openPremiumStoryModal
  );
  const currentlyPlayingStoryId = useAudioStore(
    (state) => state.currentlyPlaying.storyId
  );
  const PressableElement = useMemo(
    () => PressableComponent || Pressable,
    [PressableComponent]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: Values.bottomPlayerHeight,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PressableElement
          onPress={async () => {
            if (!story || !doll) return;
            if (locked) return openPremiumStoryModal();
            if (story.id === currentlyPlayingStoryId)
              if (state === "playing") await TrackPlayer.pause();
              else await TrackPlayer.play();
            else {
              updateCurrentlyPlaying(doll, story, true);
            }
          }}
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
                  {locked ? (
                    <LockIcon style={{ position: "absolute" }} />
                  ) : state === "playing" ? (
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
            <CircularProgressBase
              value={total}
              maxValue={100}
              radius={PLAYER_COVER_SIZE / 2}
              inActiveStrokeWidth={PLAYER_COVER_PROGRESS_WIDTH}
              activeStrokeWidth={PLAYER_COVER_PROGRESS_WIDTH}
              activeStrokeColor={Colors.pink100}
              inActiveStrokeColor={Colors.light60}
            />
          </View>
        </PressableElement>
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
