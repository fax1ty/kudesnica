import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" {...props}>
      <Path
        d="M18.688 15.453a2.221 2.221 0 01-2.236 1.797H6.548a2.22 2.22 0 01-2.235-1.797 2.156 2.156 0 011.092-2.25.668.668 0 00.345-.596v-2.544a5.75 5.75 0 013.594-5.34 2.156 2.156 0 114.312.02 6.008 6.008 0 013.594 5.528v2.336a.668.668 0 00.316.596 2.156 2.156 0 011.122 2.25zM11.5 20.125a2.875 2.875 0 002.473-1.438H9.028a2.875 2.875 0 002.472 1.438z"
        fill="#FF8CBA"
      />
    </Svg>
  );
}

export default SvgComponent;
