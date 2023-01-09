import TrackPlayer from "react-native-track-player";

import { PlaybackService } from "./service";
import "expo-router/entry";

TrackPlayer.registerPlaybackService(() => PlaybackService);
