import React from "react"
import { View } from "react-native"
import { Typography } from "../components/atoms/Typography"

export const ImageDetailScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontSize={20}>
        이미지 상세 화면
      </Typography>
    </View>
  )
}