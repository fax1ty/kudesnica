import useSWR from "swr";
import { authGuard } from "../utils/misc";
import { fetcher } from "./fetcher";
import { IRichBlock } from "./stories";

export interface IDoll {
  id: string;
  title: string;
  dollsCarouselPhoto: string;
  storyViewCarousel: Array<string>;
  description: Array<IRichBlock>;
}

export const useDolls = () =>
  useSWR<Array<IDoll>>(authGuard("/dolls"), fetcher, { refreshInterval: 0 });

export const useDoll = (dollId: string | null) =>
  useSWR<IDoll>(authGuard(dollId ? `/dolls/${dollId}` : null), fetcher, {
    refreshInterval: 0,
  });
