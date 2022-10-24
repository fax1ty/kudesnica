import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={74} height={74} viewBox="0 0 74 74" fill="none" {...props}>
      <Circle
        cx={37.0166}
        cy={37.0166}
        r={34}
        stroke="#E1C2FF"
        strokeWidth={4.25}
      />
      <Path
        d="M37 37a6 6 0 100-12 6 6 0 000 12zM40 38.93h-6a7 7 0 00-7 7 3 3 0 003 3h14a3 3 0 003-3 7 7 0 00-7-7z"
        fill="#CCB4FF"
      />
      <Circle cx={61} cy={62} r={10} fill="#E1C2FF" />
      <Path
        d="M61 67.385v-10.77M66.385 62h-10.77"
        stroke="#fff"
        strokeWidth={2.69231}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
