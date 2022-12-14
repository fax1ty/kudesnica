const info = require("./package.json");

const ENV = process.env.APP_ENV || "local";

const version = info.version.split(".").map((value) => parseInt(value, 10));
const buildNumber = version[0] * 100 + version[1] * 10 + version[2];

module.exports = {
  expo: {
    scheme: "kudesnica",
    jsEngine: "hermes",
    name: ENV === "local" ? "Кудесница (local)" : "Кудесница",
    slug: "kudesnica",
    version: version.join("."),
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
      buildNumber: buildNumber.toString(),
      bundleIdentifier:
        ENV === "local" ? "ru.kudesnica.app.local" : "ru.kudesnica.app",
      infoPlist: {
        UIBackgroundModes: ["audio", "fetch", "remote-notification"],
      },
      supportsTablet: true,
      googleServicesFile: "./GoogleService-Info.plist",
    },
    androidStatusBar: {
      barStyle: "dark-content",
      translucent: false,
      backgroundColor: "#00000000",
    },
    android: {
      versionCode: buildNumber,
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
          android: {
            compileSdkVersion: 33,
            targetSdkVersion: 33,
            buildToolsVersion: "33.0.0",
          },
          // ios: {
          //   useFrameworks: "static",
          // },
        },
      ],
    ],
  },
};
