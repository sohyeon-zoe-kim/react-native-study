import React, { useCallback } from "react"
import { useNavigation } from '@react-navigation/native'
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/atoms/Spacer"

export const LinkDetailScreen = () => {
  const navigation = useNavigation()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Spacer horizontal space={12} />
          <Header.Title title='LINK DETAIL' />
        </Header.Group>
      </Header>
    </View>
  )
}