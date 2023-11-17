import { Text, View } from "react-native";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { FC } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
