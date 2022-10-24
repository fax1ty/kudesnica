import { ReactNode } from "react";
import { View } from "react-native";
import { Colors } from "../resources";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
}

export const ScreenTemplate = ({ children }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.light100,
      }}
    >
      {children}
    </View>
  );
};
