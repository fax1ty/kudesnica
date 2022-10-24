import axios from "axios";
import Constants from "expo-constants";

axios.defaults.baseURL = Constants.expoConfig?.extra?.apiUrl;

export const fetcher = async <T>(url: string) => {
  console.log(url);
  const response = await axios.get<T>(url);
  console.log(response.data);
  return response.data;
};
