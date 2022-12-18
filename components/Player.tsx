import { View, Pressable } from "react-native";
import { Colors, Fonts } from "../resources";
import { Slider } from "react-native-awesome-slider";
import { useEffect, useMemo } from "react";
import { makeTimeStringFromMs } from "../utils/time";
import TrackPlayer from "react-native-track-player";
import { useTrackProgress, useTrackState } from "../hooks/audio";
import { useSharedValue } from "react-native-reanimated";
import { IndependentText as Text } from "./IndependentText";

import Back15Icon from "../icons/Back15";
import Next15Icon from "../icons/Next15";
import PauseIcon from "../icons/Pause";
import PlayIcon from "../icons/Play";

interface Props {
  duration: number;
  storyId?: string;
}

export const Player = ({ storyId, duration }: Props) => {
  const progress = useTrackProgress(storyId);
  const state = useTrackState(storyId);

  const now = useMemo(() => makeTimeStringFromMs(progress), [progress]);
  const total = useMemo(() => makeTimeStringFromMs(duration), [duration]);

  const sharedMin = useSharedValue(0);
  const sharedDuration = useSharedValue(0);
  const sharedProgress = useSharedValue(0);
  const isScrubbing = useSharedValue(false);

  useEffect(() => {
    if (isScrubbing.value) return;
    sharedProgress.value = progress;
  }, [progress, isScrubbing.value]);
  useEffect(() => {
    sharedDuration.value = duration;
  }, [duration]);

  return (
    <>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Back15Icon
          onPress={async () => {
            const nextTick = Math.floor(progress / 1000) - 15;
            if (nextTick > 0) await TrackPlayer.seekTo(nextTick);
            else await TrackPlayer.seekTo(0);
            if (state === "paused") await TrackPlayer.play();
          }}
        />
        <Pressable
          onPress={async () => {
            if (!storyId) return;
            if (state === "playing") await TrackPlayer.pause();
            else await TrackPlayer.play();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 50,
            width: 74,
            height: 74,
            borderRadius: 74 / 2,
            backgroundColor: "rgba(255, 196, 220, 0.3)",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              backgroundColor: Colors.pink80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {state === "paused" ? <PlayIcon /> : <PauseIcon />}
          </View>
        </Pressable>
        <Next15Icon
          style={{ marginLeft: 50 }}
          onPress={async () => {
            const nextTick = Math.floor(progress / 1000) + 15;
            const durationSec = Math.floor(duration / 1000);
            if (nextTick < durationSec) await TrackPlayer.seekTo(nextTick);
            if (state === "paused") await TrackPlayer.play();
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Colors.dark25,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
          }}
        >
          {now}
        </Text>
        <Text
          style={{
            color: Colors.dark25,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
          }}
        >
          {total}
        </Text>
      </View>
      <Slider
        onSlidingStart={async () => {
          isScrubbing.value = true;
          await TrackPlayer.pause();
        }}
        onSlidingComplete={async (value) => {
          isScrubbing.value = false;
          await TrackPlayer.seekTo(Math.floor(value / 1000));
          await TrackPlayer.play();
        }}
        renderBubble={() => null}
        renderThumb={() => (
          <View
            style={{
              backgroundColor: Colors.pink100,
              width: 17,
              borderRadius: 17 / 2,
              aspectRatio: 1,
              overflow: "hidden",
              borderColor: "rgba(255, 140, 186, 0.25)",
              borderWidth: (17 - 13) / 2,
            }}
          />
        )}
        theme={{
          maximumTrackTintColor: "rgba(122, 126, 128, 0.5)",
          minimumTrackTintColor: Colors.pink100,
        }}
        style={{ marginTop: 15 }}
        containerStyle={{ borderRadius: 3, overflow: "hidden" }}
        progress={sharedProgress}
        minimumValue={sharedMin}
        maximumValue={sharedDuration}
        isScrubbing={isScrubbing}
      />
    </>
  );
};
