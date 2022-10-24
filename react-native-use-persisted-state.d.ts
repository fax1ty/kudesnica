declare module "react-native-use-persisted-state" {
  import { FC, ReactNode } from "react";

  export const PersistedStateProvider: FC<{ children: ReactNode }>;
  export const usePersistedState: <T>(
    key: string,
    value: T
  ) => [T, (value: T) => void];
}
