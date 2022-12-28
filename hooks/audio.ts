import { useCallback } from "react";

import { useAudioStore } from "../stores/audio";

export const useTrackProgress = (id?: string) => {
  return useAudioStore(
    useCallback((state) => (!id ? 0 : state.data[id]?.progress || 0), [id])
  );
};

export const useTrackState = (id?: string) => {
  return useAudioStore(
    useCallback(
      (state) => (!id ? "paused" : state.data[id]?.state || "paused"),
      [id]
    )
  );
};
