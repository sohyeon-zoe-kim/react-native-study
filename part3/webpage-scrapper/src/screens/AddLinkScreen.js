import React, { useCallback, useState } from "react"
import { useNavigation } from '@react-navigation/native'
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { SingleLineInput } from "../components/atoms/SingleLineInput"
import { Button } from "../components/atoms/Button"
import { Typography } from "../components/atoms/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Spacer } from "../components/atoms/Spacer"

export const AddLinkScreen = () => {
  const navigation = useNavigation()
  const safeAreaInset = useSafeAreaInsets()
  const [url, setUrl] = useState('')

  const onPressClose = useCallback(() => {
    navigation.goBack()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='ADD LINK' />
        </Header.Group>
        <Header.Icon iconName='close' onPress={onPressClose} />
      </Header>      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <SingleLineInput
          value={url}
          onChangeText={setUrl}
          placeholder='https://example.com'
        />
      </View>
      <Button>
        <View style={{ backgroundColor: url === '' ? 'gray' : 'black' }}>
          <View style={{ height: 52, alignItems: 'center', justifyContent: 'center'}}>
            <Typography color='white' fontSize={18}>저장하기</Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  )
}