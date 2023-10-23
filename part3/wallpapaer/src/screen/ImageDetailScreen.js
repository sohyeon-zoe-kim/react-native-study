import React, { useCallback } from "react"
import { View, useWindowDimensions } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Header } from "../components/header/Header"
import { RemoteImage } from '../components/atoms/RemoteImage'

export const ImageDetailScreen = (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])
  const { width } = useWindowDimensions() 

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Header.Title title='IMAGE DETAIL' />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RemoteImage url={route.params.url} width={width} height={width * 1.5} />
      </View>
    </View>
  )
}