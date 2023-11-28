import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { FC } from "react";
import { SparklesIcon } from "react-native-heroicons/solid";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
};

export default HomeScreen;
