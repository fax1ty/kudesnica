import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={19} viewBox="0 0 17 19" fill="none" {...props}>
      <Path
        d="M15.708 7.068L3.874.343C2.15-.633 0 .59 0 2.541V16c0 1.96 2.151 3.182 3.874 2.198l11.834-6.726c1.723-.975 1.723-3.42 0-4.404z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
