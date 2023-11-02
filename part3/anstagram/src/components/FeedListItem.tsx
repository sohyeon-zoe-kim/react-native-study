import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "./atoms/Button";
import { RemoteImage } from "./atoms/RemoteImage";
import { Icon } from "./atoms/Icon";
import { Typography } from "./atoms/Typography";
import { Spacer } from "./atoms/Spacer";

export const FeedListItem: React.FC<{
  image: string
  isLiked: boolean
  likeCount: number
  writer: string
  comment: string
  onPressFeed: () => void
}> = (props) => {
  const { width } = useWindowDimensions()
  return (
    <Button onPress={props.onPressFeed}>
      <View>
        <RemoteImage url={props.image} width={width} height={width} />
        <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Icon
            name={props.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={props.isLiked ? "red" : "black"}
          />
        </View>
        <View style={{ paddingHorizontal: 12, }}>
          <Typography fontSize={16}>{`좋아요 ${props.likeCount}개`}</Typography>
          <Spacer space={4} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Typography fontSize={16}>{props.writer}</Typography>
            <Spacer space={8} horizontal />
            <Typography fontSize={16}>{props.comment}</Typography>
          </View>
        </View>
      </View>
    </Button>
  )
}