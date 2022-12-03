import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

export const IndependentText = ({
  children,
  ...props
}: { children: ReactNode } & TextProps) => {
  return (
    <Text allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};
