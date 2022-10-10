import MaskInput from "react-native-mask-input";
import { TextInput, TextInputProps, View, Text } from "react-native";
import { Colors, Fonts } from "../resources";

type Props = {
  error?: string;
  value: string;
  mask?: Array<string | RegExp>;
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

export const Input = ({ error, style, mask, ...props }: Props) => {
  return (
    <View>
      {mask ? (
        <MaskInput
          placeholderTextColor={Colors.light20}
          style={{
            ...inputStyle,
            ...(style as any),
            borderColor: error ? Colors.red80 : "#e1e1e1",
          }}
          {...props}
        />
      ) : (
        <TextInput
          placeholderTextColor={Colors.light20}
          style={{
            ...inputStyle,
            ...(style as any),
            borderColor: error ? Colors.red80 : "#e1e1e1",
          }}
          {...props}
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
    </View>
  );
};
