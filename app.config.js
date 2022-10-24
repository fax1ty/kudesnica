const ENV = process.env.APP_ENV || "local";

module.exports = {
  expo: {
    jsEngine: "hermes",
    name: ENV === "local" ? "Кудесница (local)" : "Кудесница",
    slug: "kudesnica",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "ru.kudesnica.app",
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
      supportsTablet: true,
      googleServicesFile: "./GoogleService-Info.plist",
    },
    androidStatusBar: {
      barStyle: "dark-content",
      translucent: true,
    },
    android: {
      package: ENV === "local" ? "ru.kudesnica.app.local" : "ru.kudesnica.app",
      permissions: ["android.permission.FOREGROUND_SERVICE"],
      googleServicesFile: "./google-services.json",
    },
    extra: {
      env: ENV,
      apiUrl:
        ENV === "local"
          ? "http://192.168.0.104:1234"
          : "https://kudesnica.tech",
      eas: {
        projectId: "2d3324de-da98-455f-8093-c57f91c23833",
      },
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "Allow to upload your profile picture and artworks.",
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "./rnf-disable-ad-id-support.plugin.js",
    ],
  },
};
