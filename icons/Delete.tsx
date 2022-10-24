import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M16.875 3.75H12.5v-.625a1.875 1.875 0 00-1.875-1.875h-1.25A1.875 1.875 0 007.5 3.125v.625H3.125a.625.625 0 000 1.25h.681l.969 9.688A3.125 3.125 0 007.9 17.5h4.225a3.125 3.125 0 003.125-2.813L16.194 5h.681a.625.625 0 100-1.25zM8.75 3.125a.625.625 0 01.625-.625h1.25a.625.625 0 01.625.625v.625h-2.5v-.625zm.056 10H8.75a.625.625 0 01-.625-.569L7.8 8.806A.627.627 0 019.05 8.7l.331 3.75a.626.626 0 01-.575.675zm3.069-.569a.625.625 0 01-.625.569h-.056a.625.625 0 01-.569-.681l.331-3.75a.627.627 0 111.25.106l-.331 3.756z"
        fill={props.color || "#C8C8C8"}
      />
    </Svg>
  );
}

export default SvgComponent;
