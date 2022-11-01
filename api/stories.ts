import axios from "axios";
import useSWR from "swr";
import { authGuard } from "../utils/misc";
import { IDollShort } from "./dolls";
import { fetcher } from "./fetcher";

export type IRichImageBorders = [number, number, number, number];

export interface IRichHeading {
  type: "h1" | "h2" | "h3";
  text: string;
}

export interface IRichParagraph {
  type: "p";
  text: string;
}

export interface IRichAudio {
  type: "audio";
  url: string;
  duration: number;
}

export interface IRichImage {
  type: "image";
  url: string;
  borderRadius?: number | IRichImageBorders;
  width?: number;
  height?: number;
}

export interface IRichVideoAttachment {
  type: "attachment";
  kind: "video";
  ids: Array<string>;
}

export interface IRichImageAttachment {
  type: "attachment";
  kind: "image";
  urls: Array<string>;
}

export type IRichAttachment = IRichVideoAttachment | IRichImageAttachment;

export type IRichBlock =
  | IRichHeading
  | IRichParagraph
  | IRichAudio
  | IRichImage
  | IRichAttachment;

export const useStories = (dollId?: string) =>
  useSWR<{
    items: Array<Omit<IStoryShort, "isLastInSeason">>;
    unwatchedTotal: number;
  }>(dollId ? `/dolls/${dollId}/storiesList` : null, fetcher, {
    refreshInterval: 0,
  });

export const useFavorites = () =>
  useSWR<Array<IStoryShortiest & { doll: IDollShort }>>(
    authGuard("/stories/favorites"),
    fetcher,
    {
      refreshInterval: 0,
    }
  );

export interface IStory {
  id: string;
  season: number;
  episode: number;
  premium: boolean;
  title: string;
  cover: string;
  audio: { duration: number };
  content?: Array<IRichBlock>;
  watched: boolean;
  isFavorite: boolean;
  isLastInSeason: boolean;
  media?: string;
  attachments: Partial<{ video: Array<string>; image: Array<string> }>;
}

export type IStoryShort = Omit<IStory, "content" | "media" | "attachments">;
export type IStoryShortiest = Omit<IStoryShort, "isLastInSeason">;

export const useStory = (dollId: string | null, storyId: string | null) =>
  useSWR<IStory>(
    !dollId || !storyId ? null : `/stories/${dollId}/${storyId}`,
    fetcher,
    {
      refreshInterval: 0,
    }
  );

export const addStoryToFavorites = (dollId: string, storyId: string) =>
  axios.post(`/stories/${dollId}/${storyId}/addToFavorites`);
export const removeStoryFromFavorites = (dollId: string, storyId: string) =>
  axios.post(`/stories/${dollId}/${storyId}/removeFromFavorites`);
export const getNextStoryId = async (dollId: string, storyId: string) => {
  const { data } = await axios.get<{ id: string }>(
    `/stories/${dollId}/${storyId}/nextStory`
  );
  return data.id;
};
export const getStory = async (dollId: string, storyId: string) => {
  const { data } = await axios.get<IStory>(`/stories/${dollId}/${storyId}`);
  return data;
};
