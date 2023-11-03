import React, { useEffect } from "react"
import { FlatList, View } from "react-native"
import { Header } from "../components/header/Header"
import { useTotalFeedList } from "../selectors/feed"
import { FeedListItem } from "../components/FeedListItem"
import { useDispatch } from "react-redux"
import { TypeFeedListDispatch, getFeedList } from "../actions/feed"
import { Spacer } from "../components/atoms/Spacer"

export const HomeScreen: React.FC = () => {
  const feedList = useTotalFeedList()
  const dispatch = useDispatch<TypeFeedListDispatch>()

  useEffect(() => {
    dispatch(getFeedList())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="HOME" />
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
            />
          )
        }}
        ItemSeparatorComponent={() => (
          < Spacer space={24} />
        )}
      />
    </View>
  )
}