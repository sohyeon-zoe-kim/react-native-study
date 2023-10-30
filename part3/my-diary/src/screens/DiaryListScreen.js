import React, { useCallback, useState } from "react"
import { useRecoilValue } from 'recoil'
import { FlatList, View, useWindowDimensions } from "react-native"
import { Header } from "../components/header/Header"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "../components/atoms/Button"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { Icon } from "../components/atoms/Icon"
import { Spacer } from "../components/atoms/Spacer"
import { Typography } from "../components/atoms/Typography"
import { stateDiaryList } from '../states/stateDiaryList'

export const DiartyListScreen = () => {
  const navigation = useNavigation()
  const safeAreaInset = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const data = useRecoilValue(stateDiaryList)
  
  const onPressSettings = useCallback(() => {
    navigation.navigate('Setting')
  }, [])

  const onPressAdd = useCallback(() => {
    navigation.navigate('AddDiary')
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Title title='DIARY LIST' />
          </Header.Group>
          <Header.Icon iconName='settings' onPress={onPressSettings} />
        </Header>
        <FlatList
          data={data}
          contentContainerStyle={{
            paddingVertical: 14,
            paddingHorizontal: 24,
          }}
          renderItem={({ item }) => {
            return (
              <Button onPress={() => {
                navigation.navigate('DiaryDetail', {item})
              }}>
                <View style={{ paddingVertical: 12}}>
                  {item.photoUrl !== null && (
                    <>
                      <RemoteImage
                        url={item.photoUrl}
                        width={width - 24*2}
                        height={(width - 24*2) * 0.5}
                        style={{ borderRadius: 8 }}
                      />
                      <Spacer space={4} />
                    </>
                  )}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Typography fontSize={18}>{item.title}</Typography>
                      <Spacer space={4} />
                      <Typography fontSize={12}>{item.content}</Typography>
                    </View>
                    <Typography fontSize={12}>{item.updatedAt}</Typography>
                  </View>
                </View>
              </Button>
            )
          }}
        />
      </View>
      <View style={{ position: 'absolute', right: 12, bottom: safeAreaInset.bottom + 24 }}>
        <Button onPress={onPressAdd}>
          <View
            style={{ 
              width: 60,
              height: 60,
              backgroundColor: 'black',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name='add' color='white' size={30} />
          </View>
        </Button>
      </View>
    </View>
  )
}