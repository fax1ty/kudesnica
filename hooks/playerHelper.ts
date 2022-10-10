import { useMemo } from "react";
import { leadWithZero, percentageOf } from "../utils/math";
import pms from "parse-ms";

export const makeTimeString = (h: number, m: number, s: number) => {
  let parts = new Array<string>();
  if (h > 0) parts.push(leadWithZero(h));
  parts.push(leadWithZero(m));
  parts.push(leadWithZero(s));
  return parts.join(":");
};
export const makeTimeStringFromMs = (ms: number) => {
  const { hours, minutes, seconds } = pms(ms);
  return makeTimeString(hours, minutes, seconds);
};

export const usePlayerHelper = (positionMs: number, durationMs: number) => {
  const current = useMemo(() => pms(positionMs), [positionMs]);
  const duration = useMemo(() => pms(durationMs), [durationMs]);

  return {
    playPercentage: useMemo(
      () => parseFloat(percentageOf(positionMs, durationMs).toFixed(1)),
      [positionMs, durationMs]
    ),
    playerCurrentTime: useMemo(
      () => makeTimeString(current.hours, current.minutes, current.seconds),
      [current]
    ),
    playerDurationTime: useMemo(
      () => makeTimeString(duration.hours, duration.minutes, duration.seconds),
      [duration]
    ),
  };
};
