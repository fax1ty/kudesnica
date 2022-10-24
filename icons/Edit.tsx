import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M14.595 8.23l-6 6a1.03 1.03 0 01-.5.27l-1.77.355A1 1 0 015.15 13.68l.35-1.755a1.03 1.03 0 01.27-.5L11.69 5.5a2.075 2.075 0 012.97 0 2 2 0 01-.065 2.755V8.23z"
        stroke="#FF8CBA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
