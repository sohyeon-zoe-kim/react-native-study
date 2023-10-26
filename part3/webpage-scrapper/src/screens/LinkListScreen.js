import React, { useCallback } from "react"
import { useNavigation } from '@react-navigation/native'
import { View } from "react-native"
import { Header } from '../components/header/Header'
import { Button } from "../components/atoms/Button"
import { Typography } from "../components/atoms/Typography"
import { Spacer } from "../components/atoms/Spacer"

export const LinkListScreen = () => {
  const navigation = useNavigation()

  const onPressButton = useCallback(() => {
    navigation.navigate('LinkDetail')
  }, [])

  const onPressAddButton = useCallback(() => {
    navigation.navigate('AddLink')
  })

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='LINK LIST' />
        </Header.Group>
      </Header>
      <View style={{ flex: 1 }}>
        <Button onPress={onPressButton}>
          <Typography>Link Detail로 이동하기</Typography>
        </Button>
        <Spacer space={12} />
        <Button onPress={onPressAddButton}>
          <Typography>Link 등록하기로 이동하기</Typography>
        </Button>
      </View>
    </View>
  )
}