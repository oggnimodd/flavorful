import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { FC } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetailScreen">;

const RecipeDetailScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Recipe details</Text>
    </View>
  );
};

export default RecipeDetailScreen;
