import React, { useCallback } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "./atoms/Button";
import { RemoteImage } from "./atoms/RemoteImage";
import { Icon } from "./atoms/Icon";
import { Typography } from "./atoms/Typography";
import { Spacer } from "./atoms/Spacer";
import { DoubleTabButton } from "./atoms/DoubleTabButton";

export const FeedListItem: React.FC<{
  image: string
  isLiked: boolean
  likeCount: number
  writer: string
  comment: string
  onPressFeed: () => void
  onPressFavorite: () => void
}> = (props) => {
  const { width } = useWindowDimensions()
  const onPressDouobleTap = useCallback(() => {
    console.log('onPRessDoubleTap')
    props.onPressFavorite()
  }, [])

  return (
    <View>
      <DoubleTabButton onPressDoubleTab={onPressDouobleTap}>
        <View style={{ width: width, height: width }}>
          <RemoteImage url={props.image} width={width} height={width} />
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Icon name="heart" size={64} color="red" />
          </View>
        </View>
      </DoubleTabButton>
      <Button onPress={props.onPressFavorite}>
        <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Icon
            name={props.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={props.isLiked ? "red" : "black"}
          />
        </View>
      </Button>
      <View style={{ paddingHorizontal: 12 }}>
        <Typography fontSize={16}>{`좋아요 ${props.likeCount}개`}</Typography>
        <Spacer space={4} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Typography fontSize={16}>{props.writer}</Typography>
          <Spacer space={8} horizontal />
          <Typography fontSize={16}>{props.comment}</Typography>
        </View>
      </View>
    </View>
  )
}