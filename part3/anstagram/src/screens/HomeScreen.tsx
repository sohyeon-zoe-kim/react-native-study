import React from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"

export const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HOME" />
      </Header>
    </View>
  )
}