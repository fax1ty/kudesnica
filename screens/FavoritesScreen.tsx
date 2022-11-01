import { FlatList, View, Pressable, Text } from "react-native";
import { useProfile } from "../api/profile";
import { useGlobalStore } from "../stores/global";
import { LowPlayer } from "../components/LowPlayer";
import { Colors, Fonts } from "../resources";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { ScreenTitle } from "../components/ScreenTitle";
import {
  addStoryToFavorites,
  IStory,
  removeStoryFromFavorites,
  useFavorites,
} from "../api/stories";
import { mutate } from "swr";
import { dispatch } from "use-bus";
import { updateCurrentlyPlaying } from "../utils/audio";

import HeartIcon from "../icons/HeartSmall";
import HeartFilledIcon from "../icons/HeartSmallFilled";

export const FavoritesScreen = () => {
  const { data: profile } = useProfile();
  const { data: favorites, mutate: mutateFavorites } = useFavorites();
  const openPremiumStoryModal = useGlobalStore(
    (state) => state.openPremiumStoryModal
  );
  const openAuthOnlyModal = useGlobalStore((state) => state.openAuthOnlyModal);

  return (
    <ScreenTemplate>
      <ScreenTitle pinNumber={profile?.favorites?.length || 0}>
        Любимые истории
      </ScreenTitle>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          favorites && favorites.length === 0 ? (
            <View style={{ marginTop: 45 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: Fonts.playfairDisplayItalic,
                  fontSize: 32,
                  lineHeight: 37,
                  color: Colors.violet100,
                }}
              >
                Пока нет историй
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 19,
                  fontFamily: Fonts.firasansRegular,
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dark50,
                }}
              >
                Поставьте лайк любимой истории, и она{"\n"}отобразится в этом
                списке
              </Text>
            </View>
          ) : undefined
        }
        renderItem={({ item, index }) => (
          <View key={`story-${item.season}-${item.episode}`}>
            <Pressable
              onPress={() => {
                if (!profile) return;

                if (item.premium && !profile.premium)
                  return openPremiumStoryModal();

                const { doll, ...story } = item;

                updateCurrentlyPlaying(doll, story);
                dispatch("UI_STORY_EXPAND");
              }}
            >
              {
                <LowPlayer
                  dollId={item.doll.id}
                  duration={item.audio.duration}
                  id={item.id}
                  title={item.doll.title}
                  description={item.title}
                  cover={item.cover}
                  titleHilighted={!item.watched}
                  icon={
                    item.isFavorite ? (
                      <HeartFilledIcon
                        onPress={async () => {
                          await removeStoryFromFavorites(item.doll.id, item.id);
                          await mutate<IStory>(
                            `/stories/${item.doll.id}/${item.id}`,
                            (old) => ({ ...old!, isFavorite: false }),
                            false
                          );
                          await mutateFavorites();
                        }}
                      />
                    ) : (
                      <HeartIcon
                        onPress={async () => {
                          if (!profile) return openAuthOnlyModal();
                          await addStoryToFavorites(item.doll.id, item.id);
                          await mutate<IStory>(
                            `/stories/${item.doll.id}/${item.id}`,
                            (old) => ({ ...old!, isFavorite: true }),
                            false
                          );
                          await mutateFavorites();
                        }}
                      />
                    )
                  }
                />
              }
              {(favorites
                ? index !== favorites.length - 1 &&
                  favorites[index + 1].season === item.season
                : false) && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.light60,
                    marginHorizontal: 22,
                  }}
                />
              )}
            </Pressable>
          </View>
        )}
        data={favorites || []}
      />
    </ScreenTemplate>
  );
};
