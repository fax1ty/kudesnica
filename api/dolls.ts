import useSWR from "swr";

import { fetcher } from "./fetcher";
import { IRichBlock } from "./stories";

export interface IDoll {
  id: string;
  title: string;
  dollsCarouselPhoto: Partial<{
    doll: string;
    background: string;
    label: string;
  }>;
  storyViewCarousel: string[];
  description: IRichBlock[];
  storeLinks: string[];
}

export type IDollShort = Omit<
  IDoll,
  "dollsCarouselPhoto" | "storyViewCarousel" | "description" | "storeLinks"
>;

export const useDolls = () =>
  useSWR<IDoll[]>("/dolls", fetcher, { refreshInterval: 0 });

export const useDoll = (dollId: string | null) =>
  useSWR<IDoll>(dollId ? `/dolls/${dollId}` : null, fetcher, {
    refreshInterval: 0,
  });
