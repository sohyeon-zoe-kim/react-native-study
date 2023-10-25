import React from "react"
import { useRandom } from "../hooks/useRandom"
import { Typography } from "./atoms/Typography"
import { View } from "react-native"

export const LottoNumberView = (props) => {
  const { getNumberBackgroundColor } = useRandom()

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {props.numbers.map((item, index) => {
        return (
          <View
            key={`lotto-num-${index}`}
            style={{
              backgroundColor: getNumberBackgroundColor(),
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography fontSize={20} color='white'>{item.toString()}</Typography>
          </View>
        )
      })}
    </View>
  )
}