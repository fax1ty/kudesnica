import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.104:1234";

export const fetcher = async <T>(url: string) => {
  console.log(url);
  const response = await axios.get<T>(url);
  console.log(response.data);
  return response.data;
};
