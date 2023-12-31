import React, { useCallback, useEffect, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, View, useWindowDimensions } from "react-native"
import { useSetRecoilState } from "recoil"
import { Header } from "../components/header/Header"
import { SingleLineInput } from "../components/atoms/SingleLineInput"
import { Button } from "../components/atoms/Button"
import { Typography } from "../components/atoms/Typography"
import { Spacer } from "../components/atoms/Spacer"
import { atomLinkList } from "../states/atomLinkList"
import { getOpenGraphData } from "../utils/OpenGraphTagUtils"
import { getClipBoardString } from "../utils/ClipBoardUtils"
import { Icon } from "../components/atoms/Icon"
import { LinkItem } from "../components/LinkItem"

export const AddLinkScreen = () => {
  const navigation = useNavigation()
  const safeAreaInset = useSafeAreaInsets()
  const updateList = useSetRecoilState(atomLinkList)
  const [metaData, setMetaData] = useState(null)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { width } = useWindowDimensions()

  const resetData = useCallback(() => {
    setUrl('')
    setMetaData(null)
  }, [])

  const onPressClose = useCallback(() => {
    navigation.goBack()
    resetData()
  }, [])

  const onPressSave = useCallback(() => {
    if (url === '') return

    updateList((prevState) => {
      const list = [{
        title: metaData.title,
        image: metaData.image,
        link: url,
        createdAt: new Date().toISOString()
      }]

      return {
        list: list.concat(prevState.list)
      }
    })

    resetData()
  }, [url, metaData]) 

  const onSubmitEditing = useCallback(async () => {
    setLoading(true)
    const result = await getOpenGraphData(url)
    setMetaData(result)
    setLoading(false)
  }, [url])

  const onGetClipBoardString = useCallback(async () => {
    const result = await getClipBoardString()
    if (result.startsWith('http://') || result.startsWith('https://')) {
      setUrl(result)
      const ogResult = await getOpenGraphData(result)
      setMetaData({
        title: ogResult.title,
        image: ogResult.image,
        description: ogResult.description ?? ''
      })
    }
  }, [])

  useEffect(() => {
    onGetClipBoardString()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='ADD LINK' />
        </Header.Group>
        <Header.Icon iconName='close' onPress={onPressClose} />
      </Header>      
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 32, paddingHorizontal: 24 }}>
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder='https://example.com'
            onSubmitEditing={onSubmitEditing}
          />
          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 8, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => {
              setUrl('')
              setMetaData(null)
            }}>
              <Icon name='close' color='black' size={20} />
            </Button>
          </View>
        </View>
        {loading ? (
          <>
            <Spacer space={20} />
            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray'}}>
              <Spacer space={(width - 48) * 0.5} />
              <Spacer space={50} />
              <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator />
              </View>
            </View>
          </>
        ) : metaData !== null && (
          <>
            <Spacer space={20} />
            <LinkItem image={metaData.image} title={metaData.title} description={metaData.description} />
          </>
        )}
      </View>
      <Button onPress={onPressSave}>
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
