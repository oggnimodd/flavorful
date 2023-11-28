import { Image, Text, ScrollView, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { FC } from "react";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useQuery } from "@tanstack/react-query";
import { collectIngredients, collectMeasures, getMealDetail } from "@/api";
import { LoadingIndicator } from "@/components";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import * as Linking from "expo-linking";
import { RootStackParamList } from "@/screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nanoid } from "nanoid";

type RecipeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "RecipeDetailScreen"
>;

const RecipeDetailScreen: FC<RecipeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const item = route.params.item;
  const [isFavourite, setIsFavourite] = useState(false);

  const { data: meal, isLoading } = useQuery({
    queryKey: ["mealDetail", item.idMeal],
    queryFn: () => getMealDetail(item.idMeal),
  });

  console.log(meal);

  const getYoutubeVideoId = (url?: string) => {
    if (!url) return null;

    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match?.[1]) {
      return match[1];
    }
    return null;
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const videoId = getYoutubeVideoId(meal?.strYoutube);

  return (
    <View style={tw`flex-1 bg-white relative`}>
      <StatusBar style={"light"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* recipe image */}
        <View style={tw`flex-row justify-center`}>
          <Image
            source={{ uri: item.strMealThumb }}
            style={tw.style({
              width: wp(100),
              height: hp(50),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            })}
          />
        </View>

        {/* back button */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={tw`w-full absolute flex-row justify-between items-center pt-14`}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 rounded-full ml-5 bg-white`}
          >
            <ChevronLeftIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              style={tw`text-black/80`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            style={tw`p-2 rounded-full mr-5 bg-white`}
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavourite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        {isLoading ? (
          <LoadingIndicator size="large" style={tw`mt-16`} />
        ) : (
          <View style={tw`px-4 flex justify-between gap-y-4 pt-8`}>
            {/* name and area */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              style={tw`gap-y-2`}
            >
              <Text
                style={tw.style("font-bold flex-1 text-neutral-700", {
                  fontSize: hp(3),
                })}
              >
                {meal?.strMeal}
              </Text>
              <Text
                style={tw.style("font-medium flex-1 text-neutral-500", {
                  fontSize: hp(2),
                })}
              >
                {meal?.strArea}
              </Text>
            </Animated.View>

            {/* misc */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              style={tw`flex-row justify-around`}
            >
              <View style={[tw`flex rounded-full bg-blue-300 p-2`]}>
                <View
                  style={[
                    tw`bg-white rounded-full flex items-center justify-center`,
                    { height: hp(6.5), width: hp(6.5) },
                  ]}
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                </View>
                <View style={tw`flex items-center py-2 gap-y-1`}>
                  <Text
                    style={[
                      { fontSize: hp(2) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    35
                  </Text>
                  <Text
                    style={[
                      { fontSize: hp(1.3) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View style={[tw`flex rounded-full bg-blue-300 p-2`]}>
                <View
                  style={[
                    tw`bg-white rounded-full flex items-center justify-center`,
                    { height: hp(6.5), width: hp(6.5) },
                  ]}
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                </View>
                <View style={tw`flex items-center py-2 gap-y-1`}>
                  <Text
                    style={[
                      { fontSize: hp(2) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    03
                  </Text>
                  <Text
                    style={[
                      { fontSize: hp(1.3) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View style={[tw`flex rounded-full bg-blue-300 p-2`]}>
                <View
                  style={[
                    tw`bg-white rounded-full flex items-center justify-center`,
                    { height: hp(6.5), width: hp(6.5) },
                  ]}
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                </View>
                <View style={tw`flex items-center py-2 gap-y-1`}>
                  <Text
                    style={[
                      { fontSize: hp(2) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    103
                  </Text>
                  <Text
                    style={[
                      { fontSize: hp(1.3) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    Cal
                  </Text>
                </View>
              </View>
              <View style={[tw`flex rounded-full bg-blue-300 p-2`]}>
                <View
                  style={[
                    tw`bg-white rounded-full flex items-center justify-center`,
                    { height: hp(6.5), width: hp(6.5) },
                  ]}
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color="gray"
                  />
                </View>
                <View style={tw`flex items-center py-2 gap-y-1`}>
                  {/* <Text
                    style={[
                      { fontSize: hp(2) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  ></Text> */}
                  <Text
                    style={[
                      { fontSize: hp(1.3) },
                      tw`font-bold text-neutral-700`,
                    ]}
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              style={tw`gap-y-4`}
            >
              <Text
                style={tw.style("font-bold flex-1 text-neutral-700", {
                  fontSize: hp(2),
                })}
              >
                Ingredients
              </Text>
              <View style={tw`gap-y-2 ml-3`}>
                {collectIngredients(meal).map((ingredient, index) => {
                  return (
                    <View
                      key={ingredient + nanoid(5)}
                      style={tw`flex-row gap-x-4`}
                    >
                      <View
                        style={tw.style("bg-amber-300 rounded-full", {
                          height: hp(1.5),
                          width: hp(1.5),
                        })}
                      />
                      <Text
                        style={tw.style("font-extrabold text-neutral-700", {
                          fontSize: hp(1.7),
                        })}
                      >
                        {collectMeasures(meal)[index]} {ingredient}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Animated.View>

            {/* instructions */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              style={tw`gap-y-2`}
            >
              <Text
                style={tw.style("font-bold flex-1 text-neutral-700", {
                  fontSize: hp(2.5),
                })}
              >
                Instructions
              </Text>
              <Text
                style={tw.style("flex-1 text-neutral-700", {
                  fontSize: hp(2),
                })}
              >
                {meal?.strInstructions}
              </Text>
            </Animated.View>

            {/* recipe video */}
            {meal?.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                style={tw`gap-y-4`}
              >
                <Text
                  style={tw.style("font-bold flex-1 text-neutral-700", {
                    fontSize: hp(2.5),
                  })}
                >
                  Recipe Video
                </Text>
                <View>
                  {videoId ? (
                    <YouTubeIframe
                      webViewProps={{
                        overScrollMode: "never",
                      }}
                      videoId={videoId}
                      height={hp(30)}
                    />
                  ) : (
                    <TouchableOpacity
                      style={tw`mb-5`}
                      onPress={() => handleOpenLink(meal?.strYoutube)}
                    >
                      <Text
                        style={tw.style("text-blue-600", {
                          fontSize: hp(2),
                        })}
                      >
                        {meal.strYoutube}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;
