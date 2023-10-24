import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { Header } from '../components/header/Header'
import { Button } from "../components/atoms/Button"
import { Icon } from "../components/atoms/Icon"
import { Spacer } from "../components/atoms/Spacer"
import { Typography } from "../components/atoms/Typography"
import { useRecoilState, useRecoilValue } from "recoil"
import { counterState } from "../states/counter"
import { counterMultipiler } from "../selectors/counterMultiplier"

const CounterTitle = () => {
  const count = useRecoilValue(counterState)
  return (
    <Typography fontSize={20}>
      {`${count}개`}
    </Typography>
  )
}

const CounteMultipiler = () => {
  const result = useRecoilValue(counterMultipiler)

  return (
    <Typography fontSize={20}>
      {`* 5 = ${result}`}
    </Typography>
  )
}

export const CounterScreen = (props) => {
  // const [value, setValue] = useState(0)
  const [count, setCount] = useRecoilState(counterState)

  const onPressMinus = useCallback(() => {
    setCount(value => value - 1)
  }, [])

  const onPressPlus = useCallback(() => {
    setCount(value => value + 1)
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
          <CounterTitle />
          <Spacer horizontal space={20} />
          <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
            <Icon name='add' size={20} color='black'></Icon>
          </Button>
        </View>
        <CounteMultipiler />
      </View>
    </View>
  )
}