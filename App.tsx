import "react-native-gesture-handler";

import { StoryModal } from "./modals/StoryModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
import { useEffect, useState } from "react";
import { dispatch } from "use-bus";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { toFixed } from "./utils/math";
import useAudio from "./hooks/audio";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  // const [url, setUrl] = useState(
  //   "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ef3cd164-016f-42b4-b89a-8552dc1b211b/bensound-oblivion.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221014%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221014T153820Z&X-Amz-Expires=86400&X-Amz-Signature=38ee27002e295bc2e9250b7477da2d60dc9647819d041243ec29ceb70228e1a3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bensound-oblivion.mp3%22&x-id=GetObject"
  // );
  // const { play, pause, seek, isLoadingAudio, setOnPlaybackStatusUpdate } =
  //   useAudio({ uri: url });
  // const [duration, setDuration] = useState(0);

  // useEffect(() => {
  //   Audio.setAudioModeAsync({
  //     playsInSilentModeIOS: true,
  //     staysActiveInBackground: true,
  //     interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  //     interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  //   });

  //   MusicControl.enableBackgroundMode(true);
  //   // MusicControl.handleAudioInterruptions(true);

  //   MusicControl.on(Command.play, async () => {
  //     // dispatch("REMOTE_AUDIO_PLAY");
  //     console.log("play");
  //     play();
  //   });
  //   MusicControl.on(Command.pause, async () => {
  //     // dispatch("REMOTE_AUDIO_PAUSE");
  //     console.log("pause");
  //     pause();
  //   });
  //   MusicControl.on(Command.stop, async () => {
  //     // dispatch("REMOTE_AUDIO_STOP");
  //     pause();
  //   });
  //   MusicControl.on(
  //     Command.changePlaybackPosition,
  //     async (playbackPosition) => {
  //       console.log(playbackPosition, "changePlaybackPosition");
  //       // dispatch({ type: "REMOTE_AUDIO_SET_POSITION", value: playbackPosition });
  //       seek(playbackPosition * 1000);
  //     }
  //   );
  //   MusicControl.on(Command.seekForward, (e) => console.log(e, "seek_forward"));
  //   MusicControl.on(Command.seekBackward, (e) =>
  //     console.log(e, "seek_backward")
  //   );
  //   MusicControl.on(Command.seek, async (playbackPosition) => {
  //     console.log(playbackPosition, "seek");
  //     seek(playbackPosition * 1000);
  //   });
  //   MusicControl.on(Command.togglePlayPause, () => {
  //     console.log("toggle_play_pause");
  //   });
  //   MusicControl.on(Command.setRating, (rating) => {
  //     console.log(rating, "set_rating");
  //   });
  //   MusicControl.on(Command.closeNotification, async () => {
  //     // dispatch("REMOTE_AUDIO_STOP");
  //     pause();
  //   });
  // }, []);

  // useEffect(() => {
  //   if (isLoadingAudio) return;
  //   (async () => {
  //     try {
  //       play();
  //       setOnPlaybackStatusUpdate((data) => {
  //         if (!data.isLoaded) return;
  //         if (!duration) {
  //           setDuration(data.durationMillis || 0);

  //           MusicControl.enableControl(Command.closeNotification, true, {
  //             when: "always",
  //           });
  //           MusicControl.enableControl(Command.play, true);
  //           MusicControl.enableControl(Command.pause, true);
  //           MusicControl.enableControl(Command.stop, false);
  //           MusicControl.enableControl(Command.changePlaybackPosition, true);
  //           MusicControl.enableControl(Command.seekForward, true); // iOS only
  //           MusicControl.enableControl(Command.seekBackward, true); // iOS only
  //           MusicControl.enableControl(Command.seek, true); // Android only
  //           MusicControl.setNowPlaying({
  //             title: "Как Алина стала балериной",
  //             artwork: "https://i.imgur.com/RdPQUVb.png",
  //             artist: "Алина-балерина",
  //             duration: toFixed((data.durationMillis || 0) / 1000, 1),
  //             colorized: true,
  //             rating: MusicControl.RATING_HEART,
  //             state: MusicControl.STATE_BUFFERING,
  //           });
  //         }
  //         MusicControl.updatePlayback({
  //           state: data.didJustFinish
  //             ? MusicControl.STATE_STOPPED
  //             : MusicControl.STATE_PLAYING,
  //           elapsedTime: toFixed(data.positionMillis / 1000, 1),
  //           bufferedTime: toFixed((data.playableDurationMillis || 0) / 1000, 1),
  //         });
  //       });
  //       console.log("Its playing!");
  //       return () => setDuration(0);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  //   return () => {
  //     MusicControl.stopControl();
  //   };
  // }, []);

  const Stack = createNativeStackNavigator();
  const store = useGlobalStore();

  const [fontsLoaded] = useFonts({
    [Fonts.playfairdisplayItalic]: require("./assets/fonts/PlayfairDisplay-Italic.ttf"),
    [Fonts.firasansRegular]: require("./assets/fonts/FiraSans-Regular.ttf"),
    [Fonts.firasansBold]: require("./assets/fonts/FiraSans-Bold.ttf"),
  });

  if (!fontsLoaded) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer
          linking={{
            prefixes: ["kudesnica://"],
            config: {
              screens: {
                Stories: "story/:doll",
                Verify: "verify/:requestId",
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
              initialRouteName="Auth"
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Stories" component={StoriesScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Verify" component={VerifyScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </View>
          {/* #region Modals */}
          {store.isBottomPlayerOpen && (
            <StoryModal
              dollId={store.currentlyPlaying.dollId}
              storyId={store.currentlyPlaying.storyId}
            />
          )}
          <CongratulationsRegModal visible />
          {/* #endregion Modals */}
          <StatusBar style="dark" />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
