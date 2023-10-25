import React from "react"
import { View } from "react-native"
import { Header } from '../header/Header'

export const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HOME'></Header.Title>
      </Header>
    </View>
  )
}