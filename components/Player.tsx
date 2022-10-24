import { View, Pressable, Text } from "react-native";
import { Colors, Fonts } from "../resources";
import { Slider } from "@sharcoux/slider";
import { useEffect, useMemo, useState } from "react";
import useBus, { dispatch } from "use-bus";
import { makeTimeStringFromMs } from "../utils/time";
import { toFixed } from "../utils/math";

import Back15Icon from "../icons/Back15";
import Next15Icon from "../icons/Next15";
import PauseIcon from "../icons/Pause";
import PlayIcon from "../icons/Play";

interface Props {
  duration: number;
  storyId?: string;
}

export const Player = ({ storyId, duration }: Props) => {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"paused" | "playing">("paused");

  const now = useMemo(() => makeTimeStringFromMs(progress), [progress]);
  const total = useMemo(() => makeTimeStringFromMs(duration), [duration]);

  useEffect(() => {
    setProgress(0);
  }, [storyId]);

  useBus(
    "REMOTE_AUDIO_PROGRESS",
    ({ id, value }) => {
      console.log(
        "Удалённое аудио",
        id,
        "хочет обновить прогресс. Текущее значение:",
        value
      );
      if (id === storyId) setProgress(value);
    },
    [storyId]
  );
  useBus(
    "REMOTE_AUDIO_STATE_CHANGE",
    ({ id, value }) => {
      console.log(
        "Удалённое аудио",
        id,
        "хочет сменить состояние. Текущее значение:",
        value
      );
      if (id === storyId) setState(value);
    },
    [storyId]
  );

  return (
    <>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Back15Icon />
        <Pressable
          onPress={() => {
            if (!storyId) return;
            if (state === "paused")
              dispatch({ type: "UI_AUDIO_PLAY", id: storyId });
            else dispatch({ type: "UI_AUDIO_PAUSE", id: storyId });
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 50,
            width: 74,
            height: 74,
            borderRadius: 74 / 2,
            backgroundColor: Colors.pink40,
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
        <Next15Icon style={{ marginLeft: 50 }} />
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
        onSlidingComplete={(value) => {
          dispatch({
            type: "UI_AUDIO_SEEK",
            id: storyId,
            value: toFixed(value, 1),
          });
        }}
        style={{ marginTop: 15 }}
        minimumValue={0}
        maximumValue={duration}
        trackHeight={3}
        trackStyle={{ borderRadius: 3 / 2 }}
        thumbSize={17}
        thumbTintColor={Colors.pink100}
        thumbStyle={{
          borderColor: "rgba(255, 140, 186, 0.25)",
          borderWidth: (17 - 13) / 2,
        }}
        maxTrackStyle={{ opacity: 0.5 }}
        minimumTrackTintColor={Colors.pink100}
        maximumTrackTintColor={Colors.dark25}
        value={progress}
      />
    </>
  );
};
