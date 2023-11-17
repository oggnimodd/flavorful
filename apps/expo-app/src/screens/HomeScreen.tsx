import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { FC } from "react";
import { Button } from "@/components";
import { SparklesIcon } from "react-native-heroicons/solid";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const width = useSharedValue(100);

  const increaseWidth = () => {
    width.value = withSpring(width.value + 50);
  };

  const decreaseWidth = () => {
    width.value = withSpring(width.value - 50);
  };

  return (
    <View style={tw`mt-10 flex items-center`}>
      <Button onPress={() => navigation.goBack()}>Go back !</Button>
      <Text style={tw`mt-20`}>This is so cool</Text>
      <View style={tw`mt-10 mx-auto`}>
        <SparklesIcon style={tw`w-12 h-12 text-blue-500`} />
      </View>

      <View>
        <View style={tw`mt-10 flex flex-col gap-y-4`}>
          <Animated.View
            style={{
              width,
              height: 100,
              backgroundColor: "violet",
            }}
          />
          <Button onPress={increaseWidth} title="Increase" />
          <Button onPress={decreaseWidth} title="Decrease" />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
