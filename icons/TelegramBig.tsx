import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={38} height={32} viewBox="0 0 38 32" fill="none" {...props}>
      <Path
        d="M15.273 20.982l-.618 8.703c.885 0 1.268-.38 1.728-.837l4.15-3.966 8.6 6.298c1.578.879 2.689.416 3.114-1.451l5.645-26.451.002-.002c.5-2.331-.843-3.243-2.38-2.671L2.334 13.308c-2.265.88-2.231 2.142-.386 2.714l8.483 2.638L30.135 6.33c.928-.613 1.77-.274 1.077.34L15.273 20.983z"
        fill="#CCB4FF"
      />
    </Svg>
  );
}

export default SvgComponent;
