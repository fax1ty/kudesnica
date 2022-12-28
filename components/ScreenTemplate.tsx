import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../resources";

interface Props {
  children: ReactNode;
}

export const ScreenTemplate = ({ children }: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.light100,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
