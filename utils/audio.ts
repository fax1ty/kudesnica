import axios from "axios";
import { dispatch } from "use-bus";
import { IDoll } from "../api/dolls";
import { IStory } from "../api/stories";

export const updateCurrentlyPlaying = (
  store: any,
  doll: IDoll,
  story: IStory,
  autoPlay = false
) => {
  store.setCurrentlyPlaying({
    dollId: doll.id,
    storyId: story.id,
    state: autoPlay ? "playing" : "paused",
  });
  dispatch({
    type: "UI_AUDIO_METADATA",
    url: new URL(
      `/stories/${doll.id}/${story.id}/audio`,
      axios.defaults.baseURL
    ).href,
    id: story.id,
    title: story.title,
    artist: doll.title,
    cover: story.cover,
    autoPlay,
  });
  store.openBottomPlayer();
};
