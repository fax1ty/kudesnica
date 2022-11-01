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
import { useGlobalStore } from "./stores/global";
import { useEffect, useRef } from "react";
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
import * as SplashScreen from "expo-splash-screen";
import { usePreviousImmediate } from "rooks";
import { PremiumStoryModal } from "./modals/PremiumStoryModal";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { PrivacyScreen } from "./screens/PrivacyScreen";
import { LoginWelcomeModal } from "./modals/LoginWelcomeModal";
import analytics from "@react-native-firebase/analytics";
import perf, { FirebasePerformanceTypes } from "@react-native-firebase/perf";
import { getCurrentEnv } from "./utils/misc";
import { useAudioStore } from "./stores/audio";
import { AuthOnlyModal } from "./modals/AuthOnlyModal";
import crashlytics from "@react-native-firebase/crashlytics";
import { ExitConfirmModal } from "./modals/ExitConfirmModal";
import { StoreLinksModal } from "./modals/StoreLinksModal";
import { HelpScreen } from "./screens/HelpScreen";
import { GalleryModal } from "./modals/GalleryModal";
import { PortalProvider } from "@gorhom/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const AuthController = () => {
  const navigation = useNavigation();
  const route = useNavigationState((state) => state?.index);
  const token = useGlobalStore((state) => state.token);
  const closeBottomPlayer = useGlobalStore((state) => state.closeBottomPlayer);
  const previousToken = usePreviousImmediate(token);
  // const [persistToken, setPersistToken] = usePersistedState("@token", "");

  // useEffect(() => {
  //   if (persistToken && persistToken !== token) setToken(persistToken);
  // }, [persistToken, token]);

  useEffect(() => {
    // setPersistToken(token);
    axios.defaults.headers.common.authorization = token;

    if (!token) {
      analytics().setAnalyticsCollectionEnabled(false);
      crashlytics().setCrashlyticsCollectionEnabled(false);
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
      crashlytics().setCrashlyticsCollectionEnabled(true);
    }
  }, [token]);

  useEffect(() => {
    if (!token && previousToken) {
      console.log("Разлогинились, идём на логин!");
      closeBottomPlayer();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth", params: { mode: "login" } }],
        })
      );
    }
  }, [token, previousToken, route]);

  return null;
};

export default function App() {
  const isLoginWelcomeModalVisible = useGlobalStore(
    (state) => state.isLoginWelcomeModalVisible
  );
  const isPremiumStoryModalVisible = useGlobalStore(
    (state) => state.isPremiumStoryModalVisible
  );
  const isBottomPlayerOpen = useGlobalStore(
    (state) => state.isBottomPlayerOpen
  );
  const isCongratulationsRegModalVisible = useGlobalStore(
    (state) => state.isCongratulationsRegModalVisible
  );
  const isAuthOnlyModalVisible = useGlobalStore(
    (state) => state.isAuthOnlyModalVisible
  );
  const isExitConfirmModalVisible = useGlobalStore(
    (state) => state.isExitConfirmModalVisible
  );
  const isStoreLinksModalVisible = useGlobalStore(
    (state) => state.isStoreLinksModalVisible
  );
  const isGalleryModalVisible = useGlobalStore(
    (state) => state.isGalleryModalVisible
  );
  const setFontsLoaded = useGlobalStore((state) => state.setFontsLoaded);
  const setToken = useGlobalStore((state) => state.setToken);
  const currentlyPlayingStoryId = useAudioStore(
    (state) => state.currentlyPlaying.storyId
  );
  const currentlyPlayingDollId = useAudioStore(
    (state) => state.currentlyPlaying.dollId
  );
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);

  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    [Fonts.playfairDisplayRegular]: require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    [Fonts.playfairDisplayItalic]: require("./assets/fonts/PlayfairDisplay-Italic.ttf"),
    [Fonts.firasansRegular]: require("./assets/fonts/FiraSans-Regular.ttf"),
    [Fonts.firasansBold]: require("./assets/fonts/FiraSans-Bold.ttf"),
    [Fonts.firasansMedium]: require("./assets/fonts/FiraSans-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) setFontsLoaded(true);
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
          if (error.response?.status === 401) setToken("");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  if (!fontsLoaded) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PersistedStateProvider>
          <BottomSheetModalProvider>
            <PortalProvider>
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
                    <Stack.Screen
                      name="Favorites"
                      component={FavoritesScreen}
                    />
                    <Stack.Screen name="Privacy" component={PrivacyScreen} />
                    <Stack.Screen name="Help" component={HelpScreen} />
                  </Stack.Navigator>
                  <StatusBar style="dark" />
                </View>
                <AuthController />
                {/* #region Modals */}
                {isBottomPlayerOpen && (
                  <StoryModal
                    dollId={currentlyPlayingDollId}
                    storyId={currentlyPlayingStoryId}
                  />
                )}
                <CongratulationsRegModal
                  visible={isCongratulationsRegModalVisible}
                />
                <PremiumStoryModal visible={isPremiumStoryModalVisible} />
                <LoginWelcomeModal visible={isLoginWelcomeModalVisible} />
                <AuthOnlyModal visible={isAuthOnlyModalVisible} />
                <ExitConfirmModal visible={isExitConfirmModalVisible} />
                <StoreLinksModal visible={isStoreLinksModalVisible} />
                {isGalleryModalVisible && <GalleryModal />}
                {/* #endregion Modals */}
                <StatusBar style="dark" />
              </NavigationContainer>
            </PortalProvider>
          </BottomSheetModalProvider>
        </PersistedStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
