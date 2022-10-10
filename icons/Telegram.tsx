import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={22} height={20} viewBox="0 0 22 20" fill="none" {...props}>
      <Path
        d="M8.697 12.868l-.363 5.094c.518 0 .743-.223 1.012-.49l2.43-2.322 5.034 3.687c.923.514 1.573.243 1.822-.85l3.305-15.483v-.001c.293-1.365-.493-1.898-1.393-1.564L1.122 8.376C-.204 8.89-.184 9.629.896 9.963l4.966 1.544 11.534-7.217c.543-.36 1.037-.16.63.199l-9.33 8.378z"
        fill="#FF7AAF"
      />
    </Svg>
  );
}

export default SvgComponent;
