import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={9} height={10} viewBox="0 0 9 10" fill="none" {...props}>
      <Path
        d="M3.947.156c.069-.208.355-.208.414 0l.06.208c.602 1.958 1.974 3.54 3.76 4.342.169.073.169.333 0 .406-1.796.802-3.168 2.384-3.76 4.342l-.06.208c-.069.208-.355.208-.414 0l-.06-.208C3.285 7.496 1.913 5.914.126 5.112c-.168-.073-.168-.333 0-.406C1.923 3.904 3.295 2.322 3.887.364l.06-.208z"
        fill="#B38FFF"
      />
    </Svg>
  );
}

export default SvgComponent;
