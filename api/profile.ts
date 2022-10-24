import axios from "axios";
import useSWR from "swr";
import { authGuard } from "../utils/misc";
import { fetcher } from "./fetcher";

export const useProfile = () =>
  useSWR<{
    name: string;
    phone: number;
    photo: boolean;
    premium: boolean;
    email?: string;
    favorites: Array<string>;
  }>(authGuard("/me"), fetcher, {
    refreshInterval: 0,
  });

export const deleteProfilePhoto = () => axios.delete("/me/photo");
export const editProfileName = (value: string) =>
  axios.put("/me/name", { value });
export const editProfileEmail = (value: string) =>
  axios.put("/me/email", { value });
