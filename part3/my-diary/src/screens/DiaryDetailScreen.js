import React, { useCallback, useMemo } from "react"
import { ScrollView, View, useWindowDimensions } from "react-native"
import { Header } from "../components/header/Header"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Spacer } from "../components/atoms/Spacer"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { Typography } from "../components/atoms/Typography"

export const DiaryDetailScreen = () => {
  const { width } = useWindowDimensions()
  const route = useRoute()

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5
    }
  }, [])

  const date = useMemo(() => {
    return new Date(route.params.item.date)
  }, [route.params.item])

  const navigation = useNavigation()
  const onPressBack = useCallback(() => {
    navigation.goBack()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName='arrow-back' onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title='DIARY DETAIL' />
        </Header.Group>
      </Header>
      <ScrollView style={{ flex: 1 }}>
        { route.params.item.photoUrl !== null && (
          <RemoteImage
            url={route.params.item.photoUrl}
            width={photoSize.photoWidth}
            height={photoSize.photoHeight}
          />
        )}
        <Spacer space={20} />
        <View style={{
            flexDirection: 'row',
            paddingVertical: 24,
            paddingHorizontal: 12,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography fontSize={20}>날짜</Typography>
          <Typography fontSize={16}>
            {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}
          </Typography>
        </View>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <Typography fontSize={32}>{route.params.item.title}</Typography>
          <Typography fontSize={24}>{route.params.item.content}</Typography>
        </View>
      </ScrollView>
    </View>
  )
}