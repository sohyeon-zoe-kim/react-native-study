import { GET_FEED_LIST_SUCCESS, TypeFeedListActions } from "../actions/feed"
import { FeedInfo } from "../types/FeedInfo"

export type TypeFeedListReducer = {
  list: FeedInfo[]
}

const defaultFeedListState: TypeFeedListReducer = {
  list: []
}

export const FeedListReducer = (state: TypeFeedListReducer = defaultFeedListState, action: TypeFeedListActions) => {
  switch (action.type) {
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state
      }
  }

  return {
    ...state
  }
}