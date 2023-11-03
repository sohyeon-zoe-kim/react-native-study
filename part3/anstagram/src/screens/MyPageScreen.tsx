import React, { useEffect, useMemo } from "react"
import { FlatList, View, useWindowDimensions } from "react-native"
import { Header } from "../components/header/Header"
import { useMyFeedList } from "../selectors/user"
import { FeedInfo } from "../types/FeedInfo"
import { Button } from "../components/atoms/Button"
import { RemoteImage } from "../components/atoms/RemoteImage"
import { useRootNavigation } from "../navigations/RootStackNavigation"
import { useDispatch } from "react-redux"
import { TypeUserInfoDispatch, getMyFeedList } from "../actions/user"

export const MyPageScreen: React.FC = () => {
  const data = useMyFeedList()
  const { width } = useWindowDimensions()
  const dispatch = useDispatch<TypeUserInfoDispatch>()
  const rootNavigation = useRootNavigation()

  const photoSize = useMemo(() => {
    return width / 3
  }, [width])

  useEffect(() => {
    dispatch(getMyFeedList())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="MY PAGE" />
      </Header>
      <FlatList<FeedInfo>
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <Button onPress={() => {
              rootNavigation.navigate('FeedList', { list: data })
            }}>
              <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
            </Button>
          )
        }}
      />
    </View>
  )
}