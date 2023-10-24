import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { View } from "react-native"
import { Header } from '../components/header/Header'
import { Button } from "../components/atoms/Button"
import { Icon } from "../components/atoms/Icon"
import { Spacer } from "../components/atoms/Spacer"
import { Typography } from "../components/atoms/Typography"
import { addCount, deleteCount } from "../actions/counter"

export const CounterScreen = (props) => {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.count.count)

  const onPressMinus = useCallback(() => {
    dispatch(deleteCount())
  }, [])

  const onPressPlus = useCallback(() => {
    dispatch(addCount())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='COUNTER'></Header.Title>
      </Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
          <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressMinus}>
            <Icon name='remove' size={20} color='black'></Icon>
          </Button>
          <Spacer horizontal space={20} />
          <Typography fontSize={20}>
            {`${value}개`}
          </Typography>
          <Spacer horizontal space={20} />
          <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
            <Icon name='add' size={20} color='black'></Icon>
          </Button>
        </View>
      </View>
    </View>
  )
}