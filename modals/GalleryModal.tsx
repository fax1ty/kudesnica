import { View, StyleSheet, Image } from "react-native";
import { Colors } from "../resources";
import Carousel from "react-native-snap-carousel";
import { useGlobalStore } from "../stores/global";
import Video from "react-native-video";
import { useDimensions } from "@react-native-community/hooks";
import { Portal } from "@gorhom/portal";
import { FullWindowOverlay } from "react-native-screens";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import X from "../icons/XCircle";

export const GalleryModal = () => {
  const urls = useGlobalStore((state) => state.gallery.urls);
  const kind = useGlobalStore((state) => state.gallery.kind);
  const preselectedIndex = useGlobalStore(
    (state) => state.gallery.preselectedIndex
  );
  const closeGalleryModal = useGlobalStore((state) => state.closeGalleryModal);
  const { screen: screenSize } = useDimensions();
  const [carousel, setCarousel] = useState<Carousel<any> | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!carousel) return;
    carousel.snapToItem(preselectedIndex, false);
  }, [preselectedIndex, carousel]);

  return (
    <Portal>
      <FullWindowOverlay style={StyleSheet.absoluteFill}>
        <View style={{ flex: 1, position: "relative" }}>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: Colors.violet100,
              opacity: 0.9,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Carousel
              ref={(ref) => setCarousel(ref)}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              vertical={false}
              data={urls}
              renderItem={({ item: url }) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {kind === "video" && (
                    <Video
                      playInBackground={false}
                      paused
                      controls
                      style={{
                        backgroundColor: "black",
                        width: screenSize.width - 15 * 2,
                        aspectRatio: 16 / 9,
                      }}
                      source={{ uri: url }}
                      resizeMode="contain"
                      posterResizeMode="contain"
                    />
                  )}
                  {kind === "image" && (
                    <Image
                      style={{
                        width: screenSize.width - 15 * 2,
                        aspectRatio: 16 / 9,
                      }}
                      source={{ uri: url }}
                    />
                  )}
                </View>
              )}
              sliderWidth={screenSize.width}
              itemWidth={screenSize.width}
            />
          </View>
          <X
            onPress={closeGalleryModal}
            style={{ position: "absolute", top: insets.top + 12, right: 14 }}
          />
        </View>
      </FullWindowOverlay>
    </Portal>
  );
};
