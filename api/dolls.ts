import useSWR from "swr";
import { fetcher } from "./fetcher";
import { IRichBlock } from "./stories";

export interface IDoll {
  id: string;
  title: string;
  dollsCarouselPhoto: string;
  storyViewCarousel: Array<string>;
  description: Array<IRichBlock>;
  storeLinks: Array<string>;
}

export type IDollShort = Omit<
  IDoll,
  "dollsCarouselPhoto" | "storyViewCarousel" | "description" | "storeLinks"
>;

export const useDolls = () =>
  useSWR<Array<IDoll>>("/dolls", fetcher, { refreshInterval: 0 });

export const useDoll = (dollId: string | null) =>
  useSWR<IDoll>(dollId ? `/dolls/${dollId}` : null, fetcher, {
    refreshInterval: 0,
  });
