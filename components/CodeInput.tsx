import { useEffect, useState } from "react";
import { View, Text, TextInput, ViewStyle } from "react-native";
import { Colors, Fonts } from "../resources";

interface Props {
  length: number;
  onDone?: (code: string) => void;
  onChange?: (code: string) => void;
  style?: ViewStyle;
  value?: string;
}

export const CodeInput = ({
  length,
  onChange,
  onDone,
  style,
  value: initialValue,
}: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!initialValue) return;
    setValue(initialValue);
  }, [initialValue]);

  return (
    <View
      style={{
        ...style,
        height: 39,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
        }}
      >
        {value.split("").map((num, i) => (
          <Text
            key={`code-entered-key-${i}`}
            style={{
              marginLeft: i === 0 ? 0 : 16,
              fontFamily: Fonts.firasansBold,
              fontSize: 32,
              lineHeight: 39,
              color: Colors.dark75,
            }}
          >
            {num}
          </Text>
        ))}
        {new Array(length - value.length).fill(0).map((_, i) => (
          <View
            key={`code-empty-key-${i}`}
            style={{
              marginLeft: i === 0 ? (value.length === 0 ? 0 : 16) : 16,
              width: 16,
              height: 16,
              borderRadius: 16 / 2,
              backgroundColor: "#e0e2e9",
            }}
          />
        ))}
      </View>
      <TextInput
        value={value}
        onChangeText={(v) => {
          if (v.length > length) return;
          setValue(v);
          if (v.length === length && onDone) onDone(v);
          if (onChange) onChange(v);
        }}
        keyboardType="number-pad"
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
};
