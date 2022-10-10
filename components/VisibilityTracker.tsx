import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions } from "react-native";

export interface IDimensionData {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
}

export interface Props {
  /** Function that is triggered when component enters the viewport */
  onChange(visible: boolean): any;
  /** The component that needs to be in the viewport */
  children: React.ReactNode;
}

const VisibilitySensor: React.FC<Props> = (props) => {
  const myView = useRef<View>(null);
  const [lastValue, setLastValue] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<IDimensionData>({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });

  let interval: NodeJS.Timer | null = null;

  useEffect(() => {
    setLastValue(false);
    startWatching();
    isInViewPort();
    return stopWatching;
  }, [dimensions.rectTop, dimensions.rectBottom, dimensions.rectWidth]);

  const startWatching = () => {
    if (interval) {
      return;
    }

    interval = setInterval(() => {
      if (!myView || !myView.current) {
        return;
      }

      myView.current.measure(
        async (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setDimensions({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        }
      );
    }, 100);
  };

  const stopWatching = () => {
    if (interval) clearInterval(interval);
    interval = null;
  };

  const isInViewPort = () => {
    const window = Dimensions.get("window");
    const isVisible =
      dimensions.rectBottom != 0 &&
      dimensions.rectTop >= 0 &&
      dimensions.rectBottom <= window.height &&
      dimensions.rectWidth > 0 &&
      dimensions.rectWidth <= window.width;

    if (lastValue !== isVisible) {
      setLastValue(isVisible);
      props.onChange(isVisible);
    } else {
      props.onChange(isVisible);
    }
  };

  return (
    <View {...props} collapsable={false} ref={myView}>
      {props.children}
      <View />
    </View>
  );
};

export default VisibilitySensor;
