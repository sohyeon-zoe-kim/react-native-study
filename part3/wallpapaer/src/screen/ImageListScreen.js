import React from "react"
import { View } from "react-native"
import { Typography } from '../components/atoms/Typography'

export const ImageListScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontSize={20}>
        이미지 리스트 화면
      </Typography>
    </View>
  )
}