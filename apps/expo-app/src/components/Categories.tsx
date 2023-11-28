import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import tw from "twrnc";
import { FC } from "react";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Category } from "@/models";

type CategoryProps = {
  categories: Category[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
};

const Categories: FC<CategoryProps> = ({
  categories,
  activeCategory,
  handleChangeCategory,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      style={tw`mt-5`}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4 gap-x-4`}
      >
        {categories.map((cat) => {
          const isActive = cat.strCategory === activeCategory;
          const activeButtonClass = isActive ? "bg-blue-400" : "bg-black/10";
          const activeCategoryTextClass = isActive
            ? "text-blue-400 font-semibold"
            : "text-black";
          return (
            <TouchableOpacity
              key={cat.idCategory}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={tw`flex items-center gap-y-1`}
            >
              <View style={tw`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={tw.style("rounded-full", {
                    width: hp(6),
                    height: hp(6),
                  })}
                />
              </View>
              <Text
                style={tw.style("text-neutral-600", activeCategoryTextClass, {
                  fontSize: hp(1.6),
                })}
              >
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
