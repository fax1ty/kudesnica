import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
      <Rect x={11} width={4.62831} height={26} rx={2.31415} fill="#FBFBFB" />
      <Rect
        y={15.6284}
        width={4.62831}
        height={26}
        rx={2.31415}
        transform="rotate(-90 0 15.628)"
        fill="#FBFBFB"
      />
    </Svg>
  );
}

export default SvgComponent;
