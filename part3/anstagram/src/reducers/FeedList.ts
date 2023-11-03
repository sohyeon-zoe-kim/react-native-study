import { CREATED_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, GET_FEED_LIST_SUCCESS, TypeFeedListActions } from "../actions/feed"
import { FeedInfo } from "../types/FeedInfo"

export type TypeFeedListReducer = {
  list: FeedInfo[]
}

const defaultFeedListState: TypeFeedListReducer = {
  list: []
}

export const feedListReducer = (state: TypeFeedListReducer = defaultFeedListState, action: TypeFeedListActions) => {
  switch (action.type) {
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      }
    case CREATED_FEED_SUCCESS:
      return {
        ...state,
        list: state.list.concat([action.item])
      }
    case FAVORITE_FEED_SUCCESS:
      return {
        ...state,
        list: state.list.map(item => {
          if (action.feedId === item.id) {
            return {
              ...item,
              likeHistory: action.action === 'add'
                ? item.likeHistory.concat([action.myId])
                : item.likeHistory.filter(id => id !== action.myId)
            }
          }

          return { ...item }
        })
      }
  }

  return {
    ...state
  }
}