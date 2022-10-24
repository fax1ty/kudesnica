import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={23} height={27} viewBox="0 0 23 27" fill="none" {...props}>
      <Path
        d="M11.5 0C7.537 0 4.313 2.948 4.313 6.571v3.943H2.875C1.29 10.514 0 11.694 0 13.143v10.514c0 1.45 1.29 2.629 2.875 2.629h17.25c1.586 0 2.875-1.18 2.875-2.629V13.143c0-1.45-1.29-2.629-2.875-2.629h-1.437V6.571C18.688 2.948 15.463 0 11.5 0zm8.625 13.143l.003 10.514H2.875V13.143h17.25zM7.188 10.514V6.571c0-2.173 1.935-3.942 4.312-3.942 2.378 0 4.313 1.769 4.313 3.942v3.943H7.188z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
