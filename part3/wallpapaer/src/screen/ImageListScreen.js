import React from "react"
import { View, FlatList } from "react-native"
import { Typography } from '../components/atoms/Typography'
import { Header } from "../components/header/Header"
import { IMAGE_LIST } from '../constants'
import { PhotoListItem } from "../components/PhotoListItem"

export const ImageListScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='IMAGE LIST' />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={IMAGE_LIST}
        renderItem={({item}) => {
          return (
            <PhotoListItem url={item} />
          )
        }}
      />
    </View>
  )
}