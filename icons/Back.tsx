import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M5.375 15.5l.863-.855 5.41-5.36L5.375 15.5zm0 0H6.59m-1.215 0H6.59m0 0H27a.5.5 0 010 1H5.383l.853.854 5.36 5.36.002.001a.5.5 0 010 .71h0a.5.5 0 01-.355.145h0a.5.5 0 01-.35-.144v-.001l-5.66-5.658s0 0 0 0a2.5 2.5 0 010-3.533s0 0 0 0l5.709-5.659h0a.5.5 0 01.706 0h0M6.59 15.5l5.058-6.925m0 0a.5.5 0 010 .71v-.71z"
        fill="#FF8CBA"
        stroke="#CCB4FF"
      />
    </Svg>
  );
}

export default SvgComponent;
