import React, { FC } from "react";
import { Text, Pressable, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import type { Meal } from "@/models";
import { RootStackParamList } from "@/screens/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RecipeCardProps = {
  item: Meal;
  index: number;
};

const RecipeCard: FC<RecipeCardProps> = ({ item, index }) => {
  const navigation =
    useNavigation<
      NativeStackScreenProps<RootStackParamList, "RecipeDetailScreen">
    >();

  const isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          ...tw`flex justify-center mb-4 space-y-1`,
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() =>
          navigation.navigation.navigate("RecipeDetailScreen", { item })
        }
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            ...tw`bg-black/5`,
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />

        <Text
          style={tw.style("font-semibold ml-2 text-neutral-600", {
            fontSize: hp(1.5),
          })}
        >
          {item.strMeal.length > 20
            ? `${item.strMeal.slice(0, 20)}...`
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
