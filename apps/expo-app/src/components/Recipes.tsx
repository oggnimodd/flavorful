import { View, Text } from "react-native";
import React, { FC } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import LoadingIndicator from "./LoadingIndicator";
import tw from "twrnc";
import type { Category, Meal } from "@/models";
import RecipeCard from "./RecipeCard";

type RecipesProps = {
  categories: Category[];
  meals: Meal[];
};

const Recipes: FC<RecipesProps> = ({ categories, meals }) => {
  return (
    <View style={tw`mx-4 space-y-3`}>
      <Text
        style={tw.style("font-semibold text-neutral-600", {
          fontSize: hp(3),
        })}
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <LoadingIndicator size="large" style={tw`mt-20`} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => (item as Meal).idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item as Meal} index={i} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;
