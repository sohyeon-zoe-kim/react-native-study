import React, { useCallback } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { useNavigation } from "@react-navigation/native"
import { Spacer } from "../components/atoms/Spacer"

export const DiaryDetailScreen = () => {
  const navigation = useNavigation()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])  
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title='DIARY DETAIL' />
        </Header.Group>
      </Header>
    </View>
  )
}