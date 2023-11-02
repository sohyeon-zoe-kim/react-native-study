import React from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"

export const MyPageScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="MY PAGE" />
      </Header>
    </View>
  )
}