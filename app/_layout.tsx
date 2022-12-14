import { FiraMono_700Bold } from "@expo-google-fonts/fira-mono";
import {
  FiraSans_400Regular,
  FiraSans_700Bold,
  FiraSans_500Medium,
} from "@expo-google-fonts/fira-sans";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
} from "@expo-google-fonts/playfair-display";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import perf, { FirebasePerformanceTypes } from "@react-native-firebase/perf";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useFonts } from "expo-font";
import { useLink, useHref, Children, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createElement, useEffect, useRef } from "react";
import { Linking, View, Image, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  PersistedStateProvider,
  usePersistedState,
} from "react-native-use-persisted-state";
import { usePreviousImmediate } from "rooks";
import useBus from "use-bus";

import InstagramIcon from "../icons/Instagram";
import LogoFull from "../icons/LogoFull";
import TelegramIcon from "../icons/Telegram";
import VKIcon from "../icons/VK";
import { AuthOnlyModal } from "../modals/AuthOnlyModal";
import { CongratulationsRegModal } from "../modals/CongratulationsRegModal";
import { ExitConfirmModal } from "../modals/ExitConfirmModal";
import { GalleryModal } from "../modals/GalleryModal";
import { LoginWelcomeModal } from "../modals/LoginWelcomeModal";
import { PremiumStoryModal } from "../modals/PremiumStoryModal";
import { StoreLinksModal } from "../modals/StoreLinksModal";
import { StoryModal } from "../modals/StoryModal";
import { Colors, Fonts, Values } from "../resources";
import { useAudioStore } from "../stores/audio";
import { useGlobalStore } from "../stores/global";
import { getCurrentEnv } from "../utils/misc";

const AuthController = () => {
  const pathname = useHref();
  const navigate = useLink();
  const token = useGlobalStore((state) => state.token);
  const closeBottomPlayer = useGlobalStore((state) => state.closeBottomPlayer);
  const openBottomPlayer = useGlobalStore((state) => state.openBottomPlayer);
  const previousToken = usePreviousImmediate(token);
  const [persistToken, setPersistToken] = usePersistedState("@token", "");
  const setToken = useGlobalStore((state) => state.setToken);

  useEffect(() => {
    if (persistToken && persistToken !== token && previousToken !== token) {
      console.log("?????????????????? ?????????? ?? ?????????? ????-???? ?????????????????? ???????????? ?? ??????????????????");
      setToken(persistToken);
    }
  }, [persistToken, token, previousToken]);

  useEffect(() => {
    console.log("?????????????????? ?????????? ?? ?????????????????? ????-???? ?????????????????? ???????????? ?? ??????????");

    setPersistToken(token);
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
      console.log("??????????????????????????, ???????? ???? ??????????!");
      navigate.replace("auth/login");
    }
  }, [token, previousToken]);

  useEffect(() => {
    console.log(pathname);
    if (
      pathname.href === "/" ||
      pathname.href.includes("/auth") ||
      pathname.href.includes("/verify") ||
      pathname.href.includes("/user") ||
      pathname.href.includes("/welcome")
    )
      closeBottomPlayer();
    else openBottomPlayer();
  }, [pathname]);

  return null;
};

export default function MainLayout() {
  const [fontsLoaded] = useFonts({
    [Fonts.playfairDisplayRegular]: PlayfairDisplay_400Regular,
    [Fonts.playfairDisplayItalic]: PlayfairDisplay_400Regular_Italic,
    [Fonts.firasansRegular]: FiraSans_400Regular,
    [Fonts.firasansBold]: FiraSans_700Bold,
    [Fonts.firasansMedium]: FiraSans_500Medium,
    [Fonts.firamonoBold]: FiraMono_700Bold,
  });

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

  const { href: route } = useHref();

  const setToken = useGlobalStore((state) => state.setToken);

  const currentlyPlayingStoryId = useAudioStore(
    (state) => state.currentlyPlaying.storyId
  );
  const currentlyPlayingDollId = useAudioStore(
    (state) => state.currentlyPlaying.dollId
  );

  type AxiosConfig = AxiosRequestConfig & {
    metadata: { httpMetric: FirebasePerformanceTypes.HttpMetric };
  };

  const insets = useSafeAreaInsets();
  const drawer = useRef<DrawerLayout>(null);
  const navigate = useLink();

  useEffect(() => {
    if (route)
      analytics().logScreenView({
        screen_name: route,
        screen_class: route,
      });
  }, [route]);

  useBus("UI_DRAWER_OPEN", () => drawer.current?.openDrawer());

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fontsLoaded) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PersistedStateProvider>
          <BottomSheetModalProvider>
            <PortalProvider>
              <View style={{ flex: 1, position: "relative" }}>
                <StatusBar style="dark" />
                <DrawerLayout
                  // https://github.com/software-mansion/react-native-gesture-handler/issues/2208#issuecomment-1249748435
                  useNativeAnimations={false}
                  ref={drawer}
                  overlayColor="rgba(67, 44, 119, 0.5)"
                  drawerType="front"
                  drawerWidth={300}
                  drawerLockMode="unlocked"
                  drawerPosition="left"
                  renderNavigationView={() => (
                    <View style={{ flex: 1 }}>
                      <Image
                        source={require("../assets/drawer-bg.png")}
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                        }}
                      />
                      <View
                        style={{
                          position: "relative",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          paddingBottom: 30,
                          paddingTop: 30 + insets.top,
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <LogoFull />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            paddingBottom: Values.bottomPlayerHeight,
                          }}
                        >
                          <View
                            style={{
                              height: 200,
                              justifyContent: "center",
                              width: 300,
                            }}
                          >
                            {[
                              { label: "?? ??????????????????", url: "/about/company" },
                              {
                                label: "?????? ????????????",
                                url: "/about/wheretobuy",
                              },
                              {
                                label: "?? ????????????????????",
                                url: "/about/application",
                              },
                            ].map(({ label, url }, i) => (
                              <Text
                                onPress={() => {
                                  navigate.push(url);
                                  drawer.current?.closeDrawer();
                                }}
                                key={`url-${i}`}
                                style={{
                                  textAlign: "center",
                                  fontFamily: Fonts.playfairDisplayItalic,
                                  fontSize: 20,
                                  lineHeight: 27,
                                  color: Colors.violet100,
                                  marginTop: i === 0 ? 0 : 32,
                                }}
                              >
                                {label}
                              </Text>
                            ))}
                          </View>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              bottom: Values.bottomPlayerHeight + 30,
                              position: "absolute",
                              justifyContent: "center",
                            }}
                          >
                            {[
                              {
                                icon: InstagramIcon,
                                url: Values.instagramUrl,
                              },
                              { icon: VKIcon, url: Values.vkUrl },
                              { icon: TelegramIcon, url: Values.tgUrl },
                            ].map(({ icon, url }, i) =>
                              createElement(icon, {
                                onPress: () => Linking.openURL(url),
                                key: `social-${i}`,
                                style: { marginLeft: i === 0 ? 0 : 20 },
                              })
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                >
                  <Children />
                </DrawerLayout>
              </View>
              <AuthController />
              {/* <View
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
              </View> */}

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
            </PortalProvider>
          </BottomSheetModalProvider>
        </PersistedStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
