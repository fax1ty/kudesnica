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
import useBus from "use-bus";
import { useState } from "react";
import { AuthScreen } from "./screens/AuthScreen";
import { VerifyScreen } from "./screens/VerifyScreen";
import { CongratulationsRegModal } from "./modals/CongratulationsRegModal";
import { useGlobalStore } from "./store";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
} from "react-native-track-player";

TrackPlayer.registerPlaybackService(() => async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
});
TrackPlayer.setupPlayer()
  .then(() => console.log("Player init done!"))
  .catch(console.error);
TrackPlayer.updateOptions({
  android: {
    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
  },
  // Media controls capabilities
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Stop,
  ],

  // Capabilities that will show up when the notification is in the compact form on Android
  compactCapabilities: [Capability.Play, Capability.Pause],

  // Icons for the notification on Android (if you don't like the default ones)
  // playIcon: require("./play-icon.png"),
  // pauseIcon: require("./pause-icon.png"),
  // stopIcon: require("./stop-icon.png"),
  // previousIcon: require("./previous-icon.png"),
  // nextIcon: require("./next-icon.png"),
  // icon: require("./notification-icon.png"),
});

export default function App() {
  const Stack = createNativeStackNavigator();
  const store = useGlobalStore();

  const [fontsLoaded] = useFonts({
    [Fonts.playfairdisplayItalic]: require("./assets/fonts/PlayfairDisplay-Italic.ttf"),
    [Fonts.firasansRegular]: require("./assets/fonts/FiraSans-Regular.ttf"),
    [Fonts.firasansBold]: require("./assets/fonts/FiraSans-Bold.ttf"),
  });

  const [currentDollId, setCurrentDollId] = useState<string | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [isCongratulationsRegModalVisible, setCongratulationsRegModalVisible] =
    useState(false);

  useBus("UI_BOTTOM_PLAYER_SET_DOLL_ID", ({ value }) =>
    setCurrentDollId(value)
  );
  useBus("UI_BOTTOM_PLAYER_SET_STORY_ID", ({ value }) =>
    setCurrentStoryId(value)
  );
  useBus("UI_MODAL_CONGRATULATIIONS_REG_OPEN", () =>
    setCongratulationsRegModalVisible(true)
  );
  useBus("UI_MODAL_CONGRATULATIIONS_REG_CLOSE", () =>
    setCongratulationsRegModalVisible(false)
  );

  if (!fontsLoaded) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        linking={{
          prefixes: ["kudesnica://"],
          config: {
            screens: {
              Stories: "story/:doll",
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
          <StoryModal dollId={currentDollId} storyId={currentStoryId} />
        )}
        {isCongratulationsRegModalVisible && <CongratulationsRegModal />}
        {/* #endregion Modals */}
        <StatusBar style="dark" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
