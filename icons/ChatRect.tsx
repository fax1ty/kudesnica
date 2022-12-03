import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={15} height={13} viewBox="0 0 15 13" fill="none" {...props}>
      <Path d="M0 0h15v13L0 0z" fill="#fff" />
    </Svg>
  );
}

export default SvgComponent;
