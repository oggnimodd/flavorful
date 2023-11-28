// HomeScreen.tsx
import { Image, Text, ScrollView, TextInput, View } from "react-native";
import tw from "twrnc";
import { FC } from "react";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getRecipes } from "@/api";
import { Categories, Recipes } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: FC<HomeScreenProps> = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const {
    data: meals,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["recipes", activeCategory],
    queryFn: () => getRecipes(activeCategory),
  });

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tw`gap-y-6 pt-14`}
      >
        {/* avatar and bell icon */}
        <View style={tw`mx-4 flex-row justify-between items-center mb-2`}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings and punchline */}
        <View style={tw`mx-4 gap-y-2 my-2`}>
          <Text style={{ fontSize: hp(1.7) }}>Hello, Noman!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }}>Make your own food,</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }}>
            stay at <Text style={tw`text-blue-400`}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View
          style={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}
        >
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={tw.style("flex-1 text-base mb-1 pl-3 tracking-wider", {
              fontSize: hp(1.7),
            })}
          />
          <View style={tw`bg-white rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories && categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <Recipes
          meals={meals || []}
          isLoading={isLoading && fetchStatus !== "idle"}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
