import React from "react"
import { View } from "react-native"
import { Header } from '../header/Header'

export const HistoryListScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HISTORY'></Header.Title>
      </Header>
    </View>
  )
}