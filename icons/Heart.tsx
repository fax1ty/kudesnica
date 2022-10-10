import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={29} height={25} viewBox="0 0 29 25" fill="none" {...props}>
      <Path
        d="M14.05 25c-.4 0-.786-.145-1.086-.408a325.922 325.922 0 00-3.195-2.748l-.005-.005c-2.831-2.412-5.276-4.496-6.977-6.548C.886 12.997 0 10.821 0 8.445c0-2.309.792-4.44 2.23-5.998C3.683.869 5.68 0 7.85 0c1.622 0 3.107.513 4.415 1.524a9.034 9.034 0 011.785 1.864 9.035 9.035 0 011.785-1.864C17.143.513 18.628 0 20.25 0c2.17 0 4.166.869 5.621 2.447C27.309 4.006 28.1 6.136 28.1 8.445c0 2.376-.885 4.552-2.787 6.846-1.7 2.052-4.145 4.136-6.976 6.548a322.76 322.76 0 00-3.2 2.753c-.301.263-.687.408-1.087.408zM7.85 1.646c-1.705 0-3.271.68-4.41 1.916-1.157 1.255-1.794 2.989-1.794 4.883 0 1.999.743 3.786 2.408 5.796 1.61 1.942 4.005 3.983 6.777 6.346l.005.004c.97.826 2.068 1.762 3.212 2.762 1.15-1.002 2.25-1.94 3.222-2.767 2.772-2.362 5.166-4.403 6.776-6.345 1.665-2.01 2.408-3.797 2.408-5.796 0-1.894-.637-3.628-1.793-4.883-1.14-1.235-2.706-1.916-4.41-1.916-1.25 0-2.396.397-3.409 1.18-.902.698-1.531 1.58-1.9 2.198a1.03 1.03 0 01-.892.507c-.37 0-.703-.19-.893-.507-.368-.618-.996-1.5-1.899-2.198-1.012-.783-2.16-1.18-3.408-1.18z"
        fill="#FF8CBA"
      />
    </Svg>
  );
}

export default SvgComponent;