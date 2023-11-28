import React, { FC } from "react";
import YouTube from "react-youtube";
import { View } from "react-native";
import tw from "twrnc";

interface YouTubeIframeProps {
  videoId: string;
}

const YouTubeIframe: FC<YouTubeIframeProps> = ({ videoId }) => {
  return (
    <View style={tw`flex w-full`}>
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "390",
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        }}
      />
    </View>
  );
};

export default YouTubeIframe;
