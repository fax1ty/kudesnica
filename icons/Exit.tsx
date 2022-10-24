import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M12.469 5.25v-.656a1.312 1.312 0 00-1.313-1.313H4.594A1.313 1.313 0 003.28 4.594v11.812a1.312 1.312 0 001.313 1.313h6.562a1.312 1.312 0 001.313-1.313v-.656M7.219 10.5h10.388M15.481 7.718l1.85 1.857a1.313 1.313 0 010 1.85l-1.85 1.857"
        stroke="#FF8CBA"
        strokeWidth={1.3125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
