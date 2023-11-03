import React, { useCallback, useMemo, useState } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { useRootNavigation } from "../navigations/RootStackNavigation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "../components/atoms/Button"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { Icon } from "../components/atoms/Icon"
import { MultiLineInput } from "../components/atoms/MultiLineInput"
import { Spacer } from "../components/atoms/Spacer"
import { Typography } from "../components/atoms/Typography"
import * as ImagePicker from 'expo-image-picker'

export const AddFeedScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'AddFeed'>()
  const safeAreaInstes = useSafeAreaInsets()
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState<string>('')

  const canSave = useMemo(() => {
    if (selectedPhoto === null) return false
    if (inputMessage === '') return false

    return true
  }, [selectedPhoto, inputMessage])

  const onPressBack = useCallback(() => {
    rootNavigation.goBack()
  }, [])

  const onPressGetPhoto = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1
    })

    if (result.canceled) return

    setSelectedPhoto(result.assets[0].uri)
  }, [])

  const onPressSave = useCallback(() => {
    if (!canSave) return
  }, [canSave, selectedPhoto, inputMessage])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="ADD FEED" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button onPress={onPressGetPhoto}>
            {selectedPhoto !== null ? (
              <RemoteImage
                url={selectedPhoto}
                width={100}
                height={100}
                style={{ borderRadius: 4 }}
              />
            ) : (
              <View style={{
                width: 100,
                height: 100,
                backgroundColor: 'lightgray',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4
              }}>
                <Icon name="add" color="gray" size={32} />
              </View>
            )}
          </Button>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <MultiLineInput
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={onPressSave}
              placeholder="입력해주세요"
              height={80}
              fontSize={16}
            />
          </View>
        </View>
      </View>
      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: canSave ? 'black' : 'lightgray' }}>
          <View style={{ height: 52, alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={18} color={canSave ? 'white' : "gray"}>저장하기</Typography>
          </View>
          <Spacer space={safeAreaInstes.bottom} />
        </View>
      </Button >
    </View >
  )
}