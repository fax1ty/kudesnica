import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={38} height={41} viewBox="0 0 38 41" fill="none" {...props}>
      <Path
        d="M19 40.37c10.493 0 19-8.821 19-19.703S29.493.963 19 .963 0 9.785 0 20.667C0 31.549 8.507 40.37 19 40.37z"
        fill="#fff"
      />
      <Path
        d="M18.21 26.333a.83.83 0 00.288.243.798.798 0 001.012-.243l8.15-7.332a.803.803 0 00.255-.268.838.838 0 00-.155-1.039l-.63-.798a.751.751 0 00-.251-.266.718.718 0 00-.974.193l-7.07 6.497-6.855-6.497c-.455-.435-.805-.399-1.155.11l-.56.798a.887.887 0 00-.147 1.065.844.844 0 00.257.278l7.835 7.259z"
        fill="#CCB4FF"
      />
    </Svg>
  );
}

export default SvgComponent;
