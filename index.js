import { PlaybackService } from "./service";
import TrackPlayer from "react-native-track-player";
import "expo-router/entry";

TrackPlayer.registerPlaybackService(() => PlaybackService);
