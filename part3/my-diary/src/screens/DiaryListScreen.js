import React, { useCallback } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { useNavigation } from "@react-navigation/native"

export const DiartyListScreen = () => {
  const navigation = useNavigation()
  const onPressSettings = useCallback(() => {
    navigation.navigate('Setting')
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='DIARY LIST' />
        </Header.Group>
        <Header.Icon iconName='settings' onPress={onPressSettings} />
      </Header>
    </View>
  )
}