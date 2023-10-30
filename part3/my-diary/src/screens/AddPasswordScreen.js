import React, { useCallback, useEffect, useState } from "react"
import { useRecoilState } from 'recoil'
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/atoms/Spacer"
import { useNavigation } from "@react-navigation/native"
import { PasswordInputBox } from "../components/PasswordInputBox"
import { stateUserInfo } from '../states/stateUserInfo'
import database from '@react-native-firebase/database'

export const AddPasswordScreen = () => {
  const navigation = useNavigation()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])

  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [isInputFirst, setIsInputFirst] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo)
  const onCompleteInputPassword = useCallback(async () => {
    if (firstInput != secondInput) return

    const userDB = `/users/${userInfo.uid}`
    await database().ref(userDB).update({
      password: firstInput,
    })
    setUserInfo((prevState) => {
      return {
        ...prevState,
        password: firstInput,
      }
    })

    navigation.goBack()
  },[firstInput, secondInput, userInfo])

  useEffect(() => {
    if (firstInput.length < 4) return
    if (secondInput.length < 4) return
    if (firstInput === secondInput) {
      onCompleteInputPassword()
    } else {
      setErrorMessage('비밀번호가 다릅니다.')
      setSecondInput('')
    }
  }, [firstInput, secondInput])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title={userInfo.password !== '' ? '비밀번호 수정' : '비밀번호 추가'} />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <PasswordInputBox
          value={isInputFirst ? firstInput : secondInput}
          onChangeText={(text) => {
            if (isInputFirst) {
              setFirstInput(text)

              if (text.length === 4) {
                setIsInputFirst(false)
              }
            } else {
              setSecondInput(text)
            }
          }}
          errorMessage={errorMessage}
        />
      </View>
    </View>
  )
}