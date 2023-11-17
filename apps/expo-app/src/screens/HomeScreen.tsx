import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { FC } from "react";
import { Button } from "@/components";
import { SparklesIcon } from "react-native-heroicons/solid";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={tw`mt-10 flex items-center`}>
      <Button onPress={() => navigation.goBack()}>Press me</Button>
      <Text style={tw`mt-20`}>This is so cool</Text>
      <View style={tw`mt-10 mx-auto`}>
        <SparklesIcon style={tw`w-12 h-12 text-blue-500`} />
      </View>
    </View>
  );
};

export default HomeScreen;
