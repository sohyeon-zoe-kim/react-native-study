import React, { useCallback, useState } from "react"
import { View, useWindowDimensions, ActivityIndicator } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

import { Header } from "../components/header/Header"
import { RemoteImage } from '../components/atoms/RemoteImage'
import { Button } from "../components/atoms/Button"
import { Typography } from "../components/atoms/Typography"
import { Icon } from "../components/atoms/Icon"

export const ImageDetailScreen = (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const [downloading, setDownloading] = useState(false)

  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])

  const onPressDownload = useCallback(async() => {
    setDownloading(true)
    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    )

    try {
      const { uri } = await downloadResumable.downloadAsync();
      const permissionResult = await MediaLibrary.getPermissionsAsync(true)

      if (permissionResult.status === 'denied') {
        setDownloading(false)
        return
      }

      if (permissionResult.status === 'undetermined') {
        const requestResult = await MediaLibrary.requestPermissionsAsync()
        if (requestResult.status === 'denied') {
          setDownloading(false)
          return
        }
      }

      const asset = await MediaLibrary.createAssetAsync(uri)
      MediaLibrary.createAlbumAsync('MyFirstAlbum', asset, false)
    } catch (e) {
      console.error(e);
    }
    setDownloading(false)
  }, [])

  const { width } = useWindowDimensions() 

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Header.Title title='IMAGE DETAIL' />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RemoteImage url={route.params.url} width={width} height={width * 1.5} />
      </View>
      <Button onPress={onPressDownload}>
        <View style={{ paddingBottom: 24, backgroundColor: 'black' }}>
          {downloading ? (
            <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Typography fontSize={18} color='white'>DOWNLOAD</Typography>
              <Icon name='download' size={24} color='white' />
            </View>
          )}
        </View>
      </Button>
    </View>
  )
}