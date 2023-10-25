import React, { useEffect, useState } from "react"
import { useRandom } from "../hooks/useRandom"
import { Typography } from "./atoms/Typography"
import { View, Animated } from "react-native"

export const LottoNumberView = (props) => {
  const [viewHeight, setViewHeight] = useState(0)
  const { getNumberBackgroundColor } = useRandom()

  const [animatedValue] = useState(new Animated.Value(0))
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-viewHeight * 0.6, 0]
  })

  useEffect(() => {
    animatedValue.setValue(0)

    Animated.timing(animatedValue, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: false,
    }).start()
  }, [props.numbers])

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
      onLayout={({ nativeEvent }) => {
        setViewHeight(nativeEvent.layout.height)
      }}
    >
      {props.numbers.map((item, index) => {
        return (
          <Animated.View
            key={`lotto-num-${index}`}
            style={{
              backgroundColor: getNumberBackgroundColor(),
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  translateY: translateY
                }
              ]
            }}
          >
            <Typography fontSize={20} color='white'>{item.toString()}</Typography>
          </Animated.View>
        )
      })}
    </View>
  )
}