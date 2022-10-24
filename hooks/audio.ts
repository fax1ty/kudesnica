import { Audio, AVPlaybackStatus } from "expo-av";
import { useCallback, useEffect, useState } from "react";

export const useAudio = (url?: string, autoPlay = false) => {
  const [buffered, setBuffered] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [sound] = useState(new Audio.Sound());
  const [isReady, setReady] = useState(false);
  const [isError, setError] = useState(false);
  const play = useCallback(() => {
    // if (!isReady) return console.info("Not yet ready!");
    sound
      .playAsync()
      .then(() => setPlaying(true))
      .catch((err) => console.error(err));
  }, [sound, isReady]);
  const pause = useCallback(() => {
    // if (!isReady) return console.info("Not yet ready!");
    sound
      .pauseAsync()
      .then(() => setPlaying(false))
      .catch((err) => console.error(err));
  }, [sound, isReady]);
  const seekTo = useCallback(
    (to: number) => {
      // if (!isReady) return console.info("Not yet ready!");
      sound
        .setPositionAsync(to)
        .then(() => setProgress(to))
        .catch((err) => console.error(err));
    },
    [sound, isReady]
  );
  const onPlaybackStatusUpdate = useCallback(
    (data: AVPlaybackStatus) => {
      if (!data.isLoaded) return;
      if (data.durationMillis) {
        setDuration(data.durationMillis);
        setReady(true);
      }
      // if (data.isPlaying && !isPlaying) setPlaying(true);
      if (data.didJustFinish) setPlaying(false);
      // if (data.positionMillis) setProgress(data.positionMillis);
    },
    [isPlaying]
  );

  useEffect(() => {
    const updateInterval = 1000;
    if (!isReady || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((old) => Math.min(old + updateInterval, duration));
    }, updateInterval);
    return () => clearInterval(interval);
  }, [isReady, isPlaying]);

  useEffect(() => {
    if (!url) return;

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    sound
      .loadAsync(
        { uri: url, headers: { authorization: "testtoken" } },
        autoPlay ? { shouldPlay: true } : {},
        true
      )
      .then((data) => {
        onPlaybackStatusUpdate(data);
        if (autoPlay) setPlaying(true);
        console.log("Sound was loaded", url);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });

    return () => {
      sound
        .unloadAsync()
        .then(() => console.log("Sound was unloaded", url))
        .catch((err) => console.error(err));
      setReady(false);
      setError(false);
      setProgress(0);
      setDuration(-1);
      setPlaying(false);
      setBuffered(0);
    };
  }, [url, autoPlay]);

  return {
    isReady,
    isError,
    play,
    pause,
    seekTo,
    progress,
    duration,
    isPlaying,
    buffered,
  };
};
