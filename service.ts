import TrackPlayer, { Event, State } from "react-native-track-player";

import { useAudioStore } from "./stores/audio";

export const PlaybackService = async function () {
  const updateTrackData = useAudioStore.getState().updateTrackData;

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    console.log("play");
    await TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.log("pause");
    await TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => {
    console.log("pause");
    await TrackPlayer.seekTo(position);
  });
  TrackPlayer.addEventListener(Event.PlaybackState, async ({ state }) => {
    const storyId = useAudioStore.getState().currentlyPlaying.storyId;
    if (!storyId) return;
    updateTrackData(storyId, {
      state: state === State.Playing ? "playing" : "paused",
    });
  });
  TrackPlayer.addEventListener(
    Event.PlaybackProgressUpdated,
    async ({ position }) => {
      const storyId = useAudioStore.getState().currentlyPlaying.storyId;
      if (!storyId) return;
      updateTrackData(storyId, { progress: position * 1000 });
    }
  );
};
