import { View, ActivityIndicator, StyleProp } from "react-native";
import tw from "twrnc";
import { FC } from "react";
import { Style } from "twrnc/dist/esm/types";

interface LoadingProps {
  size?: React.ComponentProps<typeof ActivityIndicator>["size"];
  style?: Style;
}

const Loading: FC<LoadingProps> = ({ size = "large", style }) => {
  return (
    <View style={tw.style("flex-1 flex justify-center items-center", style)}>
      <ActivityIndicator size={size} />
    </View>
  );
};

export default Loading;
