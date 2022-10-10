import { View, Pressable, Text } from "react-native";
import { Colors, Fonts } from "../resources";
import { Slider } from "@sharcoux/slider";
import { usePlayerHelper } from "../hooks/playerHelper";
import { useEffect } from "react";

import Back15Icon from "../icons/Back15";
import Next15Icon from "../icons/Next15";
import PauseIcon from "../icons/Pause";
import PlayIcon from "../icons/Play";

interface Props {
  url?: string;
  onProgressChange?: (percentage: number) => void;
}

export const Player = ({ url, onProgressChange }: Props) => {
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
            {<PauseIcon />}
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
          {0}
        </Text>
        <Text
          style={{
            color: Colors.dark25,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
          }}
        >
          {0}
        </Text>
      </View>
      <Slider
        // onSlidingComplete={seek}
        style={{ marginTop: 15 }}
        minimumValue={0}
        maximumValue={100}
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
        value={0}
      />
    </>
  );
};
