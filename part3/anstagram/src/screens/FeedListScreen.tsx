import React, { useCallback } from "react"
import { FlatList, View } from "react-native"
import { Header } from "../components/header/Header"
import { FeedListItem } from "../components/FeedListItem"
import { Spacer } from "../components/atoms/Spacer"
import { useRootNavigation, useRootRoute } from "../navigations/RootStackNavigation"
import { useDispatch } from "react-redux"
import { TypeFeedDispatch, favoriteFeed } from "../actions/feed"

export const FeedListScreen: React.FC = () => {
  const route = useRootRoute<'FeedList'>()
  const rootNavigation = useRootNavigation<'FeedList'>()
  const dispatch = useDispatch<TypeFeedDispatch>()
  const onPressBack = useCallback(() => {
    rootNavigation.goBack()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="FEED LIST" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <FlatList
        data={route.params.list}
        renderItem={({ item }) => {
          return (
            <FeedListItem
              image={item.imageUrl}
              comment={item.content}
              isLiked={false}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              createdAt={item.createdAt}
              onPressFeed={() => { console.log('onPressFeed') }}
              onPressFavorite={() => {
                dispatch(favoriteFeed(item))
              }}
            />
          )
        }}
        ItemSeparatorComponent={() => (
          <Spacer space={24} />
        )}
      />
    </View>
  )
}