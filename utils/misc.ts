import axios from "axios";
import Constants from "expo-constants";

export const getCurrentEnv = (): "local" | "dev" => {
  return Constants.expoConfig?.extra?.env || "local";
};

export const authGuard = (path: string | null) => {
  return axios.defaults.headers.common.authorization ? path : null;
};
