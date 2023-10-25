import React, { useState, useCallback } from "react"
import { View, FlatList } from "react-native"
import { Header } from '../components/header/Header'
import { Typography } from "../components/atoms/Typography"
import { LottoNumberView } from "../components/LottoNumberView"
import { useSelector } from "react-redux"

export const HistoryListScreen = (props) => {
  const history = useSelector((state) => state.numbers.history)

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HISTORY'></Header.Title>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={history}
        contentContainerStyle={{
          paddingVertical: 24
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              key={`history-${index}`}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                marginHorizontal: 24,
                height: 120,
                backgroundColor: 'white'
              }}
            >
              <Typography fontSize={16}>{item.date.getFullYear()}. {item.date.getMonth()}. {item.date.getDay()}</Typography>  
              <LottoNumberView numbers={item.numbers} />
            </View>
          )
        }}
      />
    </View>
  )
}