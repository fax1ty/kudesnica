import useSWR from "swr";
import { fetcher } from "./fetcher";
import { IRichBlock } from "./stories";

export interface IDollData {
  id: string;
  title: string;
  dollsCarouselPhoto: string;
  storyViewCarousel: Array<string>;
  description: Array<IRichBlock>;
}

export const useDolls = () =>
  useSWR<Array<IDollData>>("/dolls", fetcher, { refreshInterval: 0 });

export const useDoll = (dollId: string | null) =>
  useSWR<IDollData>(dollId ? `/dolls/${dollId}` : null, fetcher, {
    refreshInterval: 0,
  });
