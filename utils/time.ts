import pms from "parse-ms";

import { leadWithZero } from "../utils/math";

export const makeTimeString = (h: number, m: number, s: number) => {
  const parts: string[] = [];
  if (h > 0) parts.push(leadWithZero(h));
  parts.push(leadWithZero(m));
  parts.push(leadWithZero(s));
  return parts.join(":");
};
export const makeTimeStringFromMs = (ms: number) => {
  const { hours, minutes, seconds } = pms(ms);
  return makeTimeString(hours, minutes, seconds);
};
