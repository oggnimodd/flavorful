import { View, Text } from "react-native";
import React, { FC } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import LoadingIndicator from "./LoadingIndicator";
import tw from "twrnc";
import type { Category, Meal } from "@/models";
import RecipeCard from "./RecipeCard";

type RecipesProps = {
  meals: Meal[];
  isLoading?: boolean;
};

const Recipes: FC<RecipesProps> = ({ meals, isLoading = false }) => {
  return (
    <View style={tw`mx-4 gap-y-3 mt-4`}>
      <Text
        style={tw.style("font-semibold text-neutral-600", {
          fontSize: hp(3),
        })}
      >
        Recipes
      </Text>
      <View>
        {isLoading ? (
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

        {/* Handle empty data */}
        {!isLoading && meals?.length === 0 && (
          <View style={tw`flex-1 flex justify-center items-center`}>
            <Text style={tw`text-neutral-600`}>No recipes found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Recipes;
