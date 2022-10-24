import { ReactNode } from "react";
import { View, Image, ViewStyle, Pressable } from "react-native";
import { Colors } from "../resources";

interface Props {
  icon?: ReactNode;
  style?: ViewStyle;
  title: ReactNode;
  description: ReactNode;
  theme?: "red" | "blue";
  onPress?: () => void;
}

export const GradientCard = ({
  icon,
  style,
  title,
  description,
  theme = "red",
  onPress,
}: Props) => {
  return (
    <Pressable
      style={{
        ...style,
        height: 89,
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
      }}
      onPress={onPress}
    >
      <Image
        source={
          theme === "red"
            ? require("../assets/unlock-bg.png")
            : require("../assets/unlock-bg-blue.png")
        }
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 18,
        }}
      >
        {icon && (
          <View
            style={{
              overflow: "hidden",
              width: 62,
              height: 62,
              borderRadius: 62 / 2,
              backgroundColor: Colors.light80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </View>
        )}
        <View style={{ marginLeft: 15 }}>
          {title}
          {description}
        </View>
      </View>
    </Pressable>
  );
};
