import useSWR from "swr";
import { fetcher } from "./fetcher";

interface IRichHeading {
  type: "h1" | "h2" | "h3";
  text: string;
}

interface IRichParagraph {
  type: "p";
  text: string;
}

interface IRichAudio {
  type: "audio";
  url: string;
  duration: number;
}

interface IRichImage {
  type: "image";
  url: string;
  borderRadius?: number | IRichImageBorders;
  width?: number;
  height?: number;
}

export type IRichBlock =
  | IRichHeading
  | IRichParagraph
  | IRichAudio
  | IRichImage;
type IRichImageBorders = [number, number, number, number];

export const useStories = (dollId?: string) =>
  useSWR<
    Array<{
      id: string;
      season: number;
      episode: number;
      duration: number;
      title: string;
      premium: boolean;
      cover: string;
    }>
  >(dollId ? `/dolls/${dollId}/storiesList` : null, fetcher, {
    refreshInterval: 0,
  });

export const useStory = (dollId: string | null, storyId: string | null) =>
  useSWR<{
    season: number;
    episode: number;
    premium: boolean;
    title: string;
    cover: string;
    audio: { url: string; duration: number };
    content: Array<IRichBlock>;
  }>(!dollId || !storyId ? null : `/stories/${dollId}/${storyId}`, fetcher, {
    refreshInterval: 0,
  });
