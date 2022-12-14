import axios from "axios";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  RatingType,
  IOSCategoryOptions,
  IOSCategory,
} from "react-native-track-player";
import { mutate } from "swr";

import { IDollShort } from "../api/dolls";
import { IStoryShortiest } from "../api/stories";
import { useAudioStore } from "../stores/audio";
import { useGlobalStore } from "../stores/global";

export const updateCurrentlyPlaying = async (
  doll: IDollShort,
  story: IStoryShortiest,
  autoPlay = false
) => {
  if (useAudioStore.getState().currentlyPlaying.storyId === story.id) return;

  // const currentlyPlaying = useAudioStore.getState().currentlyPlaying;
  const setCurrentlyPlaying = useAudioStore.getState().setCurrentlyPlaying;
  const openBottomPlayer = useGlobalStore.getState().openBottomPlayer;
  // if (currentlyPlayingStoryId === story.id) return;
  setCurrentlyPlaying({
    dollId: doll.id,
    storyId: story.id,
    state: autoPlay ? "playing" : "paused",
  } as any);
  await mutate(`/stories/${doll.id}/${story.id}`);
  openBottomPlayer();
  await TrackPlayer.add({
    id: story.id,
    url: new URL(
      `/stories/${doll.id}/${story.id}/audio`,
      axios.defaults.baseURL
    ).href,
    title: story.title,
    artist: doll.title,
    artwork: story.cover,
    duration: Math.ceil(story.audio.duration / 1000),
    headers: { authorization: axios.defaults.headers.common.authorization },
  });
  await TrackPlayer.skipToNext();
  if (autoPlay) await TrackPlayer.play();
};

export const initAudio = async () => {
  try {
    await TrackPlayer.getCurrentTrack();
  } catch {
    await TrackPlayer.setupPlayer({
      iosCategoryOptions: [IOSCategoryOptions.DuckOthers],
      iosCategory: IOSCategory.Playback,
    });
    await TrackPlayer.updateOptions({
      progressUpdateEventInterval: 1,
      ratingType: RatingType.Heart,
      capabilities: [0, 3, 5, 9, 10, 12],
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
    });
  }
};
