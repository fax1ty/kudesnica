import { Portal } from "@gorhom/portal";
import { PickerIOS, Picker as PickerAndoid } from "@react-native-picker/picker";
import { useEffect, useId, useMemo, useState } from "react";
import { Pressable, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts } from "../resources";
import { Button } from "./Button";
import { IndependentText as Text } from "./IndependentText";

interface Props {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (v: string) => void;
}

export const Picker = ({ onChange, options, value: externalValue }: Props) => {
  const [value, setValue] = useState(options[0].value);
  const [isOpen, setOpen] = useState(false);
  const id = useId();
  const currentLabel = useMemo(
    () => options.find((v) => v.value === value)?.label,
    [options, value]
  );

  const onValueChange = (v: string) => {
    setValue(v);
    if (onChange) onChange(v);
  };

  useEffect(() => {
    if (externalValue) setValue(externalValue);
  }, [externalValue]);

  if (Platform.OS === "ios")
    return (
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: Colors.light40,
          backgroundColor: Colors.light80,
          height: 56,
          borderRadius: 16,
          overflow: "hidden",
          marginTop: 12,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: Fonts.firasansRegular,
            fontSize: 14,
            lineHeight: 18,
            color: Colors.dark75,
          }}
        >
          {currentLabel}
        </Text>
        {isOpen && (
          <Portal>
            <Pressable
              onPress={() => setOpen(false)}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.violet100,
                  opacity: 0.9,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              />
              <SafeAreaView
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  paddingBottom: 24,
                }}
              >
                <PickerIOS
                  style={{ flex: 1 }}
                  selectedValue={value}
                  onValueChange={(_, i) => onValueChange(options[i].value)}
                >
                  {options.map((item, i) => (
                    <PickerIOS.Item
                      key={`${id}-${i}`}
                      color={Colors.light100}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </PickerIOS>
                <View style={{ paddingHorizontal: 12 }}>
                  <Button onPress={() => setOpen(false)}>Готово</Button>
                </View>
              </SafeAreaView>
            </Pressable>
          </Portal>
        )}
      </Pressable>
    );
  else
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.light40,
          backgroundColor: Colors.light80,
          height: 56,
          borderRadius: 16,
          overflow: "hidden",
          marginTop: 12,
        }}
      >
        <PickerAndoid
          selectedValue={value}
          onValueChange={(_, i) => onValueChange(options[i].value)}
          style={{
            fontFamily: Fonts.firasansRegular,
            fontSize: 16,
            lineHeight: 18,
            color: Colors.dark100,
            backgroundColor: Colors.light80,
          }}
        >
          {options.map((item, i) => (
            <PickerAndoid.Item
              key={`help-list-item-${i}`}
              label={item.label}
              value={item.value}
            />
          ))}
        </PickerAndoid>
      </View>
    );
};
