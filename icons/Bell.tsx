import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none" {...props}>
      <Path
        d="M11.625 10.094a1.738 1.738 0 01-1.75 1.406h-7.75a1.738 1.738 0 01-1.75-1.406 1.687 1.687 0 01.855-1.76.523.523 0 00.27-.468v-1.99a4.5 4.5 0 012.813-4.18 1.688 1.688 0 113.375.017A4.703 4.703 0 0110.5 6.038v1.828a.523.523 0 00.248.467 1.687 1.687 0 01.877 1.76zM6 13.75a2.25 2.25 0 001.935-1.125h-3.87A2.25 2.25 0 006 13.75z"
        fill="#705B9E"
      />
    </Svg>
  );
}

export default SvgComponent;
