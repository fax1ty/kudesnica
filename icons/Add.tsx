import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none" {...props}>
      <Path
        d="M14.969.906H4.03A3.125 3.125 0 00.906 4.031V14.97c0 1.726 1.4 3.125 3.125 3.125H14.97c1.726 0 3.125-1.4 3.125-3.125V4.03c0-1.726-1.4-3.125-3.125-3.125zM9.5 12.625v-6.25M12.625 9.5h-6.25"
        stroke="#705B9E"
        strokeWidth={1.5625}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
