import React, { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"
import { useRecoilState } from 'recoil'
import { stateUserInfo } from "../states/stateUserInfo"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/atoms/Spacer"
import { Button } from "../components/atoms/Button"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { Typography } from "../components/atoms/Typography"
import { Divider } from '../components/atoms/Divider'
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload"
import database from '@react-native-firebase/database'
import { Icon } from "../components/atoms/Icon"

export const SettingScreen = () => {
  const navigation = useNavigation()
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo)
  const runImagePickAndUpload = useImagePickAndUpload(false)

  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])

  const onPressProfile = useCallback(async () => {
    const result = await runImagePickAndUpload()

    if (result.length >= 1) {
      const userDB = `/users/${userInfo.uid}`
      setUserInfo(prevState => {
        return {
          ...prevState,
          profileImage: result[0]
        }
      })

      await database().ref(userDB).update({
        profileImage: result[0]
      })
    }
  }, [userInfo, runImagePickAndUpload])

  const onPressPassword = useCallback(() => {
    navigation.navigate('AddPassword')
  }, [])

  const onPressClearPassword = useCallback(async () => {
    const userDB = `/users/${userInfo.uid}`
    await database().ref(userDB).update({
      password: '',
    })
  },[userInfo])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title='SETTING' /> 
        </Header.Group>
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={onPressProfile}>
              <RemoteImage
                url={userInfo.profileImage}
                width={100}
                height={100}
                style={{ borderRadius: 50}}
              />
          </Button>
          <Spacer space={20} />
          <Typography fontSize={20}>{userInfo.name}</Typography>
        </View>
        <Spacer space={20} />
        <Divider />
        <Spacer space={20} />
        <Button onPress={onPressPassword}>
          <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 24
            }}
          >
            <Typography fontSize={16}>비밀번호 추가</Typography>
            <Icon name='chevron-forward-outline' size={16} />
          </View>
        </Button>
        <Button onPress={onPressClearPassword}>
          <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 24
            }}
          >
            <Typography fontSize={16}>비밀번호 초기화</Typography>
          </View>
        </Button>
      </View>
    </View>
  )
}