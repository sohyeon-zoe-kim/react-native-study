import React, { useCallback, useRef } from "react";
import { Animated, View, useWindowDimensions } from "react-native";
import { Button } from "./atoms/Button";
import { RemoteImage } from "./atoms/RemoteImage";
import { Icon } from "./atoms/Icon";
import { Typography } from "./atoms/Typography";
import { Spacer } from "./atoms/Spacer";
import { DoubleTabButton } from "./atoms/DoubleTabButton";
import { getMillisToDateString } from "../utils/DateUtils";

export const FeedListItem: React.FC<{
  image: string
  isLiked: boolean
  likeCount: number
  writer: string
  comment: string
  createdAt: number
  onPressFeed: () => void
  onPressFavorite: () => void
}> = (props) => {
  const { width } = useWindowDimensions()
  const scaleValue = useRef(new Animated.Value(0)).current
  const alphaValue = useRef(new Animated.Value(0)).current

  const onPressDouobleTap = useCallback(() => {
    props.onPressFavorite()

    if (props.isLiked) {
      return
    }

    scaleValue.setValue(0)
    alphaValue.setValue(1)

    Animated.timing(scaleValue, {
      toValue: 2,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      setTimeout(() => {
        alphaValue.setValue(0)
      }, 200)
    })
  }, [scaleValue, alphaValue, props.isLiked])

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
            <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: alphaValue }}>
              <Icon name="heart" size={64} color="red" />
            </Animated.View>
          </View>
        </View>
      </DoubleTabButton>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Button onPress={props.onPressFavorite}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
            <Icon
              name={props.isLiked ? "heart" : "heart-outline"}
              size={20}
              color={props.isLiked ? "red" : "black"}
            />
          </View>
        </Button>
        <Typography fontSize={16} color='gray'>
          {getMillisToDateString(props.createdAt)}
        </Typography>
      </View>
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