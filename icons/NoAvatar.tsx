import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 34 34" fill="none" {...props}>
      <Circle cx={17} cy={17} r={17} fill="#fff" />
      <Circle cx={16.5} cy={14.5} r={3.5} fill="#705B9E" />
      <Path
        d="M14.57 17.141a.818.818 0 01.808-.686h2.277c.407 0 .752.298.81.7l.854 5.91a.818.818 0 01-.81.935h-4.092a.818.818 0 01-.808-.95l.961-5.909z"
        fill="#705B9E"
      />
    </Svg>
  );
}

export default SvgComponent;
