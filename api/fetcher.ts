import axios from "axios";
import Constants from "expo-constants";

axios.defaults.baseURL = Constants.expoConfig?.extra?.apiUrl;

export const fetcher = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  console.log(url, response.data);
  return response.data;
};
