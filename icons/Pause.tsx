import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none" {...props}>
      <Rect
        x={0.224609}
        y={0.544922}
        width={4.62831}
        height={16.9099}
        rx={2.31415}
        fill="#FBFBFB"
      />
      <Rect
        x={9.15601}
        y={0.544922}
        width={4.62831}
        height={16.9099}
        rx={2.31415}
        fill="#FBFBFB"
      />
    </Svg>
  );
}

export default SvgComponent;
