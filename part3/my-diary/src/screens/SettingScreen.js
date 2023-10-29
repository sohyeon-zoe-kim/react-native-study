import { useNavigation } from "@react-navigation/native"
import React, { useCallback } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/atoms/Spacer"

export const SettingScreen = () => {
  const navigation = useNavigation()
  const onPRessBack = useCallback(() => {
    navigation.goBack()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPRessBack} />
          <Spacer space={12} horizontal />
          <Header.Title title='SETTING' /> 
        </Header.Group>
      </Header>
    </View>
  )
}