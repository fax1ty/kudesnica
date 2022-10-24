import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={14} height={15} viewBox="0 0 14 15" fill="none" {...props}>
      <Path
        d="M6.917.741c.105-.3.54-.3.63 0l.09.3a10.21 10.21 0 005.71 6.25c.254.104.254.48 0 .584a10.21 10.21 0 00-5.71 6.25l-.09.3c-.105.299-.54.299-.63 0l-.09-.3a10.21 10.21 0 00-5.71-6.25c-.254-.105-.254-.48 0-.584a10.127 10.127 0 005.71-6.25l.09-.3z"
        fill="#CCB4FF"
      />
    </Svg>
  );
}

export default SvgComponent;
