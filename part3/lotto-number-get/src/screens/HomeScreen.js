import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { Header } from '../components/header/Header'
import { Spacer } from "../components/atoms/Spacer"
import { Button } from '../components/atoms/Button'
import { Typography } from "../components/atoms/Typography"
import { LottoNumberView } from "../components/LottoNumberView"
import { useDispatch, useSelector } from "react-redux"
import { createNewNumbers } from "../actions/lottoNumbers"

export const HomeScreen = (props) => {
  const numbers = useSelector((state) => state.numbers.currentNumbers)

  const dispatch = useDispatch()
  const onPressGetNumber = useCallback(() => {
    dispatch(createNewNumbers())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HOME'></Header.Title>
      </Header>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 12 }}>
        <View
          style={{
            height: 250,
            paddingHorizontal: 24,
            backgroundColor: 'white',
            borderColor: 'gray',
          }}
        >
          {numbers.length === 6 && (
            <LottoNumberView numbers={numbers} />
          )}
        </View>
        <Spacer space={20} />
        <Button onPress={onPressGetNumber}>
          <View style={{ backgroundColor: 'black', paddingVertical: 24, alignItems: 'center' }}>
            <Typography color='white' fontSize={18}>로또 번호 추출하기</Typography>
          </View>
        </Button>
      </View>
    </View>
  )
}