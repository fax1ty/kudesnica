import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={9} viewBox="0 0 16 9" fill="none" {...props}>
      <Path
        d="M8.19 1.147a.419.419 0 00-.672 0L.79 7.557a.419.419 0 00-.03.677l.337.42c.214.257.397.257.644.031l6.148-5.799 6.113 5.8c.245.225.428.193.612-.065l.306-.419a.421.421 0 00-.06-.676l-6.67-6.38z"
        fill="#432C77"
      />
    </Svg>
  );
}

export default SvgComponent;
