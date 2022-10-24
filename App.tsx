import "react-native-gesture-handler";

import { StoryModal } from "./modals/StoryModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  CommonActions,
  NavigationContainer,
  NavigationContainerRef,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors, Fonts } from "./resources";
import { useFonts } from "expo-font";
import { HomeScreen } from "./screens/HomeScreen";
import { StoriesScreen } from "./screens/StoriesScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { VerifyScreen } from "./screens/VerifyScreen";
import { CongratulationsRegModal } from "./modals/CongratulationsRegModal";
import { useGlobalStore } from "./store";
import MusicControl, { Command } from "react-native-music-control";
import { useEffect, useRef, useState } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { toFixed } from "./utils/math";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  PersistedStateProvider,
  usePersistedState,
} from "react-native-use-persisted-state";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoadingScreen } from "./screens/LoadingScreen";
import { UserScreen } from "./screens/UserScreen";
import { UserEditScreen } from "./screens/UserEditScreen";
import { AddCardScreen } from "./screens/AddCardScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import useBus, { dispatch } from "use-bus";
import { useAudio } from "./hooks/audio";
import * as SplashScreen from "expo-splash-screen";
import { usePreviousImmediate } from "rooks";
import { PremiumStoryModal } from "./modals/PremiumStoryModal";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { PrivacyScreen } from "./screens/PrivacyScreen";
import { LoginWelcomeModal } from "./modals/LoginWelcomeModal";
import analytics from "@react-native-firebase/analytics";
import perf, { FirebasePerformanceTypes } from "@react-native-firebase/perf";
import { getCurrentEnv } from "./utils/misc";

SplashScreen.preventAutoHideAsync();

console.log(getCurrentEnv());

const AuthController = () => {
  const store = useGlobalStore();
  const navigation = useNavigation();
  const route = useNavigationState((state) => state?.index);
  const previousToken = usePreviousImmediate(store.token);
  const [token, setToken] = usePersistedState("@token", "");

  useEffect(() => {
    if (token && token !== store.token) store.setToken(token);
    if (!token) {
      analytics().setAnalyticsCollectionEnabled(false);
      store.closeBottomPlayer();
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
    }
  }, [token]);

  useEffect(() => {
    setToken(store.token);
    axios.defaults.headers.common.authorization = store.token;
  }, [store.token]);

  useEffect(() => {
    if (!store.token && previousToken) {
      console.log("Разлогинились, идём на логин!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth", params: { mode: "login" } }],
        })
      );
    }
  }, [store.token, route]);

  return null;
};

export default function App() {
  const store = useGlobalStore();
  const [url, setUrl] = useState("");
  const [currentAudioAutoPlay, setCurrentAudioAutoPlay] = useState(false);
  const {
    play,
    pause,
    seekTo,
    isReady,
    progress,
    duration,
    isPlaying,
    buffered,
  } = useAudio(url, currentAudioAutoPlay);
  const [currentAudioStoryId, setCurrentAudioStoryId] = useState<string | null>(
    null
  );
  const [currentAudioTitle, setCurrentAudioTitle] = useState("");
  const [currentAudioArtist, setCurrentAudioArtist] = useState("");
  const [currentAudioArtwork, setCurrentAudioArtwork] = useState("");
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });

    MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);

    MusicControl.on(Command.play, async () => {
      console.log("play!!");
      dispatch({ type: "UI_AUDIO_PLAY", id: currentAudioStoryId });
    });
    MusicControl.on(Command.pause, async () => {
      dispatch({ type: "UI_AUDIO_PAUSE", id: currentAudioStoryId });
    });
    MusicControl.on(Command.stop, async () => {
      dispatch({ type: "UI_AUDIO_PAUSE", id: currentAudioStoryId });
    });
    MusicControl.on(
      Command.changePlaybackPosition,
      async (playbackPosition) => {
        dispatch({
          type: "UI_AUDIO_SEEK",
          id: currentAudioStoryId,
          value: playbackPosition * 1000,
        });
      }
    );
    MusicControl.on(Command.seekForward, (e) => console.log(e, "seek_forward"));
    MusicControl.on(Command.seekBackward, (e) =>
      console.log(e, "seek_backward")
    );
    MusicControl.on(Command.seek, async (playbackPosition) => {
      dispatch({
        type: "UI_AUDIO_SEEK",
        id: currentAudioStoryId,
        value: playbackPosition * 1000,
      });
    });
    MusicControl.on(Command.togglePlayPause, () => {
      console.log("toggle_play_pause");
      dispatch({
        type: "UI_AUDIO_TOGGLE",
        id: currentAudioStoryId,
      });
    });
    MusicControl.on(Command.setRating, (rating) => {
      console.log(rating, "set_rating");
    });
    MusicControl.on(Command.closeNotification, async () => {
      dispatch({
        type: "UI_AUDIO_PAUSE",
        id: currentAudioStoryId,
      });
    });

    return () => {
      MusicControl.off(Command.play);
      MusicControl.off(Command.pause);
      MusicControl.off(Command.stop);
      MusicControl.off(Command.changePlaybackPosition);
      MusicControl.off(Command.seekForward);
      MusicControl.off(Command.seekBackward);
      MusicControl.off(Command.seek);
      MusicControl.off(Command.togglePlayPause);
      MusicControl.off(Command.setRating);
      MusicControl.off(Command.closeNotification);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (
      !currentAudioStoryId ||
      !currentAudioTitle ||
      !currentAudioArtist ||
      !currentAudioArtwork
    )
      return;

    MusicControl.enableControl(Command.closeNotification, true, {
      when: "always",
    });
    MusicControl.enableControl(Command.play, true);
    MusicControl.enableControl(Command.pause, true);
    MusicControl.enableControl(Command.stop, false);
    MusicControl.enableControl(Command.changePlaybackPosition, true);
    MusicControl.enableControl(Command.seekForward, true); // iOS only
    MusicControl.enableControl(Command.seekBackward, true); // iOS only
    MusicControl.enableControl(Command.seek, true); // Android only
    MusicControl.setNowPlaying({
      title: currentAudioTitle,
      artwork: currentAudioArtwork,
      artist: currentAudioArtist,
      duration: toFixed(duration / 1000, 1),
      colorized: true,
      rating: MusicControl.RATING_HEART,
      state: MusicControl.STATE_BUFFERING,
    });

    return () => {
      MusicControl.stopControl();
    };
  }, [
    duration,
    isReady,
    currentAudioStoryId,
    currentAudioTitle,
    currentAudioArtist,
    currentAudioArtwork,
  ]);

  useEffect(() => {
    if (!isReady) return;

    MusicControl.updatePlayback({
      elapsedTime: toFixed(progress / 1000, 1),
      bufferedTime: toFixed(buffered / 1000, 1),
    });
    dispatch({
      type: "REMOTE_AUDIO_PROGRESS",
      id: currentAudioStoryId,
      value: progress,
    });
  }, [isReady, progress, buffered]);

  useEffect(() => {
    if (!isReady) return;

    MusicControl.updatePlayback({
      state: !isPlaying
        ? MusicControl.STATE_STOPPED
        : MusicControl.STATE_PLAYING,
    });
    dispatch({
      type: "REMOTE_AUDIO_STATE_CHANGE",
      id: currentAudioStoryId,
      value: isPlaying ? "playing" : "paused",
    });
    if (currentAudioStoryId)
      store.setCurrentlyPlaying({
        dollId: store.currentlyPlaying.dollId,
        storyId: currentAudioStoryId,
        state: isPlaying ? "playing" : "paused",
      });
  }, [isReady, isPlaying]);

  useBus("UI_AUDIO_METADATA", ({ url, id, title, artist, cover, autoPlay }) => {
    console.log(
      "Мы получили новые аудиоданные от",
      id,
      "/",
      title,
      artist,
      cover,
      autoPlay
    );
    setUrl(url);
    setCurrentAudioStoryId((oldId) => {
      dispatch({
        type: "REMOTE_AUDIO_STATE_CHANGE",
        id: oldId,
        value: "paused",
      });
      dispatch({
        type: "REMOTE_AUDIO_PROGRESS",
        id: oldId,
        value: 0,
      });
      return id;
    });
    setCurrentAudioTitle(title);
    setCurrentAudioArtist(artist);
    setCurrentAudioArtwork(cover);
    setCurrentAudioAutoPlay(autoPlay);
  });
  useBus(
    "UI_AUDIO_PLAY",
    ({ id }) => {
      console.log(
        id,
        "попытался запустить текущее воспроизведение. Текущий ID:",
        currentAudioStoryId
      );
      if (id !== currentAudioStoryId) return;
      play();
      dispatch({ type: "REMOTE_AUDIO_STATE_CHANGE", id, value: "playing" });
    },
    [currentAudioStoryId]
  );
  useBus(
    "UI_AUDIO_PAUSE",
    ({ id }) => {
      console.log(
        id,
        "попытался остановить текущее воспроизведение. Текущий ID:",
        currentAudioStoryId
      );
      if (id !== currentAudioStoryId) return;
      pause();
      dispatch({ type: "REMOTE_AUDIO_STATE_CHANGE", id, value: "paused" });
    },
    [currentAudioStoryId]
  );
  useBus(
    "UI_AUDIO_TOGGLE",
    ({ id }) => {
      console.log(
        id,
        "попытался затоглить текущее воспроизведение. Текущий ID:",
        currentAudioStoryId
      );
      if (id !== currentAudioStoryId) return;
      if (isPlaying) pause();
      else play();
      dispatch({
        type: "REMOTE_AUDIO_STATE_CHANGE",
        id,
        value: isPlaying ? "paused" : "playing",
      });
    },
    [currentAudioStoryId]
  );
  useBus(
    "UI_AUDIO_SEEK",
    ({ id, value }) => {
      console.log(
        id,
        "попытался использовать перемотку к",
        value,
        "/ Текущий ID:",
        currentAudioStoryId
      );
      if (id !== currentAudioStoryId) return;
      seekTo(value);
    },
    [currentAudioStoryId]
  );

  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    [Fonts.playfairdisplayItalic]: require("./assets/fonts/PlayfairDisplay-Italic.ttf"),
    [Fonts.firasansRegular]: require("./assets/fonts/FiraSans-Regular.ttf"),
    [Fonts.firasansBold]: require("./assets/fonts/FiraSans-Bold.ttf"),
    [Fonts.firasansMedium]: require("./assets/fonts/FiraSans-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) store.setFontsLoaded(true);
  }, [fontsLoaded]);

  type AxiosConfig = AxiosRequestConfig & {
    metadata: { httpMetric: FirebasePerformanceTypes.HttpMetric };
  };

  useEffect(() => {
    axios.interceptors.request.use(async (config) => {
      try {
        const httpMetric = perf().newHttpMetric(
          config.url!,
          config.method as any
        );
        (config as AxiosConfig).metadata = { httpMetric };
        httpMetric.putAttribute("instance", getCurrentEnv());
        await httpMetric.start();
      } finally {
        return config;
      }
    });
    axios.interceptors.response.use(
      async (response) => {
        try {
          const {
            metadata: { httpMetric },
          } = response.config as AxiosConfig;
          httpMetric.setHttpResponseCode(response.status);
          httpMetric.setResponseContentType(response.headers["content-type"]);
          await httpMetric.stop();
        } finally {
          return response;
        }
      },
      function (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) store.setToken("");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  if (!fontsLoaded) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PersistedStateProvider>
        <BottomSheetModalProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              if (!navigationRef.current) return;
              const route = navigationRef.current.getCurrentRoute();
              if (!route) return;
              routeNameRef.current = route.name;
            }}
            onStateChange={async () => {
              if (!navigationRef.current) return;
              const route = navigationRef.current.getCurrentRoute();
              if (!route) return;
              const previousRouteName = routeNameRef.current;
              const currentRouteName = route.name;

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }
              routeNameRef.current = currentRouteName;
            }}
            linking={{
              prefixes: ["kudesnica://"],
              config: {
                screens: {
                  Stories: "story/:doll",
                  Verify: "verify/:requestId/:mode",
                  Auth: "auth/:mode",
                },
              },
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.light100,
              }}
            >
              <Stack.Navigator
                screenOptions={{
                  animation: "fade",
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.light100 },
                }}
                initialRouteName="Loading"
              >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Stories" component={StoriesScreen} />
                <Stack.Screen
                  name="Auth"
                  component={AuthScreen}
                  initialParams={{ mode: "register" }}
                />
                <Stack.Screen
                  name="Verify"
                  component={VerifyScreen}
                  initialParams={{ mode: "register" }}
                />
                <Stack.Screen name="User" component={UserScreen} />
                <Stack.Screen name="UserEdit" component={UserEditScreen} />
                <Stack.Screen name="AddCard" component={AddCardScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Privacy" component={PrivacyScreen} />
              </Stack.Navigator>
              <StatusBar style="dark" />
            </View>
            <AuthController />
            {/* #region Modals */}
            {store.isBottomPlayerOpen && (
              <StoryModal
                dollId={store.currentlyPlaying.dollId}
                storyId={store.currentlyPlaying.storyId}
              />
            )}
            <CongratulationsRegModal
              visible={store.isCongratulationsRegModalVisible}
            />
            <PremiumStoryModal visible={store.isPremiumStoryModalVisible} />
            <LoginWelcomeModal visible={store.isLoginWelcomeModalVisible} />
            {/* #endregion Modals */}
            <StatusBar style="dark" />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </PersistedStateProvider>
    </GestureHandlerRootView>
  );
}
