import MaskInput from "react-native-mask-input";
import { TextInput, TextInputProps } from "react-native";
import { Colors, Fonts } from "../resources";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useMemo, useState } from "react";
import { IndependentText as Text } from "./IndependentText";

type Props = {
  error?: string;
  value: string;
  mask?: Array<string | RegExp>;
  disabled?: boolean;
} & TextInputProps;

const inputStyle = {
  borderRadius: 16,
  borderWidth: 1,
  backgroundColor: Colors.light80,
  color: Colors.dark25,
  fontFamily: Fonts.firasansRegular,
  fontSize: 16,
  lineHeight: 15,
  height: 56,
  paddingVertical: 8,
  paddingHorizontal: 16,
};

export const Input = ({
  disabled = false,
  error,
  style,
  mask,
  ...props
}: Props) => {
  const [value, setValue] = useState("");
  const showTitle = useMemo(() => value.length > 0, [value]);

  useEffect(() => {
    if (props.value === value) return;
    setValue(props.value);
  }, [props.value]);

  return (
    <Animated.View
      pointerEvents={disabled ? "none" : undefined}
      style={useAnimatedStyle(() => ({
        ...(style as any),
        height: withSpring(showTitle ? 78 : inputStyle.height),
        transform: [
          { translateY: withSpring(showTitle ? 0 : inputStyle.height - 78) },
        ],
      }))}
    >
      <Animated.Text
        style={useAnimatedStyle(() => ({
          height: 12 + 6,
          fontFamily: Fonts.firasansRegular,
          fontSize: 12,
          lineHeight: 12,
          color: Colors.dark25,
          opacity: withSpring(showTitle ? 1 : 0),
        }))}
      >
        {props.placeholder}
      </Animated.Text>
      {mask ? (
        <MaskInput
          {...props}
          allowFontScaling={false}
          // onBlur={() => Keyboard.dismiss()}
          placeholderTextColor={Colors.light20}
          style={{
            ...inputStyle,
            backgroundColor: !disabled
              ? inputStyle.backgroundColor
              : Colors.light60,
            borderColor: error ? Colors.red80 : "#e1e1e1",
          }}
          mask={mask}
          onChangeText={(e) => {
            setValue(e);
            if (typeof props.onChangeText === "function") props.onChangeText(e);
          }}
        />
      ) : (
        <TextInput
          {...props}
          allowFontScaling={false}
          // onBlur={() => Keyboard.dismiss()}
          placeholderTextColor={Colors.light20}
          style={{
            ...inputStyle,
            backgroundColor: !disabled
              ? inputStyle.backgroundColor
              : Colors.light60,
            borderColor: error ? Colors.red80 : "#e1e1e1",
          }}
          onChangeText={(e) => {
            setValue(e);
            if (typeof props.onChangeText === "function") props.onChangeText(e);
          }}
        />
      )}
      {error && (
        <Text
          style={{
            color: Colors.red80,
            fontFamily: Fonts.firasansRegular,
            fontSize: 13,
            lineHeight: 16,
            marginTop: 7,
          }}
        >
          {error}
        </Text>
      )}
    </Animated.View>
  );
};
