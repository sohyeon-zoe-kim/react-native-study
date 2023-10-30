import React, { useCallback } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/atoms/Spacer"
import { useNavigation } from "@react-navigation/native"

export const AddPasswordScreen = () => {
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
          <Header.Title title='비밀번호 추가' />
        </Header.Group>
      </Header>
    </View>
  )
}