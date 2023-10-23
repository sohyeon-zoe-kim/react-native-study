import React from "react"
import { View } from "react-native"
import { Typography } from "../components/atoms/Typography"

export const FavoriteImageListScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontSize={20}>
        좋아하는 이미지 리스트 화면
      </Typography>
    </View>
  )
}