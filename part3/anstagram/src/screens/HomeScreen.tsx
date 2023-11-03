import React, { useCallback, useEffect } from "react"
import { FlatList, View } from "react-native"
import { Header } from "../components/header/Header"
import { useTotalFeedList } from "../selectors/feed"
import { FeedListItem } from "../components/FeedListItem"
import { useDispatch } from "react-redux"
import { TypeFeedDispatch, favoriteFeed, getFeedList } from "../actions/feed"
import { Spacer } from "../components/atoms/Spacer"
import { useRootNavigation } from "../navigations/RootStackNavigation"

export const HomeScreen: React.FC = () => {
  const rootNaviagtion = useRootNavigation()
  const feedList = useTotalFeedList()
  const dispatch = useDispatch<TypeFeedDispatch>()

  const onPressAddFeed = useCallback(() => {
    rootNaviagtion.navigate('AddFeed')
  }, [])

  useEffect(() => {
    dispatch(getFeedList())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HOME" />
        <Header.Icon iconName="add" onPress={onPressAddFeed} />
      </Header>
      <FlatList
        data={feedList}
        renderItem={({ item }) => {
          return (
            <FeedListItem
              image={item.imageUrl}
              comment={item.content}
              isLiked={false}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
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