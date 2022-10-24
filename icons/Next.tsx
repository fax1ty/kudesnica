import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.442 19.117a.75.75 0 01-.532-.225.75.75 0 010-1.057l4.245-4.245a2.25 2.25 0 000-3.18L8.91 6.165a.75.75 0 011.057-1.057l4.283 4.237a3.75 3.75 0 010 5.31l-4.245 4.237a.75.75 0 01-.563.226z"
        fill="#FF8CBA"
      />
    </Svg>
  );
}

export default SvgComponent;
