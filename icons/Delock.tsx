import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={62} height={62} viewBox="0 0 62 62" fill="none" {...props}>
      <Circle cx={31} cy={31} r={31} fill="#FBFBFB" />
      <Path
        d="M30.5 17c-3.963 0-7.188 2.948-7.188 6.571v3.943h-1.437c-1.586 0-2.875 1.18-2.875 2.629v10.514c0 1.45 1.29 2.629 2.875 2.629h17.25c1.586 0 2.875-1.18 2.875-2.629V30.143c0-1.45-1.29-2.629-2.875-2.629h-1.438v-3.943c0-3.623-3.224-6.571-7.187-6.571zm8.625 13.143l.003 10.514H21.875V30.143h17.25zm-12.938-2.629v-3.943c0-2.173 1.935-3.942 4.313-3.942 2.378 0 4.313 1.769 4.313 3.942v3.943h-8.626z"
        fill="#65D1AA"
      />
      <Path fill="#FBFBFB" d="M33 24.5H38V27.5H33z" />
      <Path
        stroke="#65D1AA"
        strokeWidth={3}
        d="M41.4687 19.5379L49.5799 16.6729"
      />
      <Path
        stroke="#65D1AA"
        strokeWidth={3}
        d="M38.1823 15.5628L44.3356 9.55141"
      />
      <Path
        stroke="#65D1AA"
        strokeWidth={3}
        d="M42.1266 24.5054L50.6982 25.2314"
      />
    </Svg>
  );
}

export default SvgComponent;
