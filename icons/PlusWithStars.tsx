import * as React from "react";
import Svg, { Circle, Path, Rect, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={270} height={74} viewBox="0 0 270 74" fill="none" {...props}>
      <Circle cx={132} cy={37} r={37} fill="#fff" />
      <Path
        d="M132.005 37.004v29.828c-16.472 0-29.835-13.357-29.835-29.828 0-4.059.808-7.927 2.28-11.45v11.45h27.555zM161.84 37.003c0 16.472-13.357 29.828-29.835 29.828V37.003h29.835zM161.84 37.003h-29.835V7.168c16.478 0 29.835 13.357 29.835 29.835z"
        fill="#E1C2FF"
      />
      <Path
        d="M132.005 7.168v29.835H104.45v-11.45c4.486-10.797 15.142-18.385 27.555-18.385z"
        fill="#E1C2FF"
      />
      <Rect
        x={130}
        y={25}
        width={4.62831}
        height={26}
        rx={2.31415}
        fill="#FBFBFB"
      />
      <Rect
        x={119}
        y={40.6284}
        width={4.62831}
        height={26}
        rx={2.31415}
        transform="rotate(-90 119 40.628)"
        fill="#FBFBFB"
      />
      <Path
        d="M41.505 37.432c.201-.576 1.036-.576 1.209 0l.172.575A19.607 19.607 0 0053.852 50.01c.49.201.49.92 0 1.122a19.448 19.448 0 00-10.966 12.002l-.172.575c-.202.576-1.036.576-1.209 0l-.173-.575A19.607 19.607 0 0030.367 51.13c-.49-.201-.49-.92 0-1.122a19.447 19.447 0 0010.965-12.002l.173-.575zM7.363 15.277c.13-.37.663-.37.774 0l.11.37a12.58 12.58 0 007.018 7.711c.313.13.313.592 0 .721a12.477 12.477 0 00-7.018 7.711l-.11.37c-.13.37-.663.37-.774 0l-.11-.37a12.58 12.58 0 00-7.018-7.71c-.313-.13-.313-.592 0-.722a12.477 12.477 0 007.018-7.71l.11-.37zM73.363 15.277c.13-.37.663-.37.774 0l.11.37a12.58 12.58 0 007.018 7.711c.313.13.313.592 0 .721a12.477 12.477 0 00-7.018 7.711l-.11.37c-.13.37-.663.37-.774 0l-.11-.37a12.58 12.58 0 00-7.018-7.71c-.313-.13-.313-.592 0-.722a12.477 12.477 0 007.018-7.71l.11-.37zM196.601 46.285c.133-.38.684-.38.798 0l.114.38a12.954 12.954 0 007.245 7.93c.323.132.323.608 0 .74a12.848 12.848 0 00-7.245 7.93l-.114.38c-.133.38-.684.38-.798 0l-.114-.38a12.953 12.953 0 00-7.245-7.93c-.323-.132-.323-.608 0-.74a12.848 12.848 0 007.245-7.93l.114-.38zM223.451 14.394c.183-.525.941-.525 1.098 0l.157.525a17.855 17.855 0 009.961 10.944c.444.184.444.84 0 1.024a17.708 17.708 0 00-9.961 10.944l-.157.525c-.183.525-.941.525-1.098 0l-.157-.525a17.855 17.855 0 00-9.961-10.944c-.444-.184-.444-.84 0-1.024a17.708 17.708 0 009.961-10.944l.157-.525zM261.178 45.27c.126-.36.647-.36.755 0l.107.361a12.267 12.267 0 006.842 7.517c.305.127.305.577 0 .703a12.167 12.167 0 00-6.842 7.518l-.107.36c-.126.361-.647.361-.755 0l-.107-.36a12.267 12.267 0 00-6.842-7.517c-.305-.127-.305-.577 0-.703a12.167 12.167 0 006.842-7.518l.107-.36z"
        fill="#F1E1FF"
      />
    </Svg>
  );
}

export default SvgComponent;
