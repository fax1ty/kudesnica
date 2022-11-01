import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
      <Path
        d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19z"
        fill="#fff"
      />
      <Path
        d="M20.41 19l5.66-5.66a1.001 1.001 0 10-1.41-1.41L19 17.59l-5.66-5.66a1 1 0 00-1.41 1.41L17.59 19l-5.66 5.66a1 1 0 000 1.41 1 1 0 001.41 0L19 20.41l5.66 5.66a1 1 0 001.41 0 1 1 0 000-1.41L20.41 19z"
        fill="#705B9E"
      />
    </Svg>
  );
}

export default SvgComponent;
