import create from "zustand";
import { combine } from "zustand/middleware";

interface ICurrentlyPlaying {
  dollId: string | null;
  storyId: string | null;
}

interface TrackData {
  progress: number;
  state: "paused" | "playing";
}

export const useAudioStore = create(
  combine(
    {
      data: {} as Record<string, Partial<TrackData>>,
      currentlyPlaying: {
        dollId: null,
        storyId: null,
      } as ICurrentlyPlaying,
    },
    (set) => ({
      updateTrackData: (id: string, data: Partial<TrackData>) =>
        set((state) => ({
          ...state,
          data: { ...state.data, [id]: { ...state.data[id], ...data } },
        })),
      setCurrentlyPlaying: (data: ICurrentlyPlaying) =>
        set((state) => ({ ...state, currentlyPlaying: data })),
    })
  )
);
