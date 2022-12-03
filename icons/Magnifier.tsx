import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={37} height={37} viewBox="0 0 37 37" fill="none" {...props}>
      <Path
        d="M29.29 27.575l-4.03-3.984a10.044 10.044 0 10-1.54 1.54l3.985 3.995a1.116 1.116 0 001.584 0 1.116 1.116 0 000-1.551zm-17.364-4.676A7.812 7.812 0 1123.03 11.908a7.812 7.812 0 01-11.105 10.991z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
